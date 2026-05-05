+++
title = "Ffmpeg on roids with rust"
description = "
Concurrent and cpu intensive applications are hard to get right! here is my attempt to it..
"
+++

It takes some time to wrap your head about concurrency. Luckily, the widespread
adoption of `async`/`await` syntax has simplified this process. However, things
start to get messy when your async task need to do cpu intensive computations.

<br/>

So I set myself to replicate this scenario, by taking one of the most used media
transformation tool, `ffmpeg`, and create a microservice able to perform to an
arbitrary number of requests send over the network in a timely and reliable
manner. To my surprise this was much easier that I expected, and to find out the
reason why you will have to read further. The code show below can be found here:
[https://github.com/alv-around/ffmpeg_processor](https://github.com/alv-around/ffmpeg_processor).

## Creating the http server

We start by creating a simple http server with axum and async support with
tokio. The http server receive a request with a video in the request. The server
should then, store the video temporarily, run ffmpeg on the video and returned
the transformed media back to the client.

```rust
use axum::body::Body;
use axum::extract::Path;
use axum::http::header;
use axum::response::IntoResponse;
use axum::{
    Router,
    routing::{get, post},
};
use futures::StreamExt;
use tokio::fs::{self, File};
use tokio::io::AsyncWriteExt;
use tower_http::trace::TraceLayer;
use tracing::instrument;

#[tokio::main]
async fn main() {

    let app = Router::new()
        .route("/about", get(|| async { "this is an experiment" }))
        .route("/{video_id}", post(register_video))

    let listener = tokio::net::TcpListener::bind("0.0.0.0:3000").await.unwrap();
    tracing::info!("listening on {}", listener.local_addr().unwrap());
    let _server = axum::serve(listener, app).await;
}

#[instrument]
async fn register_video(
    Path(id): Path<String>,
    body: Body,
) -> Result<impl IntoResponse, &'static str> {
    let mut video = body.into_data_stream();
    let path = format!("tmp/test_file_{}.mp4", id);
    let output = format!("tmp/output_{}.mp4", id);
    let mut file = File::create(&path)
        .await
        .map_err(|_| "error creating file")?;

    while let Some(frame) = video.next().await {
        let chunk = frame.map_err(|_| "error reading file")?;
        file.write_all(&chunk)
            .await
            .map_err(|_| "error backing file")?;
    }

    tracing::debug!("file stored in path: {}", path);
    
    // TODO: run ffmpeg here

    match fs::read(output).await {
        Ok(bytes) => Ok(([(header::CONTENT_TYPE, "video/mp4")], bytes)),
        Err(_) => Err("error reading the output file"),
    }
}
```

## Easy ffmpeg

At first I though of integrate ffmpeg through Foreign Function Iterfaces (FFI).
Ffmpeg is written in C, and FFI is the way bind code written into another
language in your project. Rust provide a straightforward method to do FFI, and
there are lost of tutorials online to integrate C code in your rust base.

<br/>

However, after a quick online search I found the `ez-ffmpeg` crate which provide
a direct integration with ffmpeg in pure rust. Moreover, `ez-ffmpeg` provides an
async feature flag, meaning we can use ez-ffmpeg in our async route without
worrying that one task will block other tasks in our runtime. With the feature
`async` activated the ez-ffmpeg function looks like:

```rust
use ez_ffmpeg::{FfmpegContext, FfmpegScheduler};

pub async fn run_ffmpeg(input_path: String, output_path: String) -> Result<(), &'static str> {
    // 1. Build the FFmpeg context
    let context = FfmpegContext::builder()
        .input(input_path)
        .output(output_path)
        .build()
        .map_err(|_| "error initializing ffmpeg")?;

    FfmpegScheduler::new(context)
        .start()
        .map_err(|_| "error processing video")?
        .await
        .map_err(|_| "error processing video")?;

    Ok(())
}
```

Afterwards, we just need to call and await `run_ffmpeg` from the
`register_video` function in `main.rs` and that's it!

The only drawback from using `ez-ffmpeg` is that we need to make sure that
`libx264` is installed as a system dependency in order for it to compile.
Fortunately for a nix user like my self, this can be easily solved by adding
`ffmpeg` as a build input.

## Testing

The only thing missing is putting the system to trial, by sending many requests
at the same time. I created a harness test and with default values, the harness
send 1000 requests each with a 6 second video. On my local machine, the
`ffmpeg_processor` takes _6-8 seconds to process all the videos with a 99.5%
success rate!_ For the amount of effort put, this is an astounishing result.

## Future Work

That's it! In this demo we've sketched how high-throughput system can look like
using Rust and Nix. But there are many performance improvements that I left out
for the sake of this demo. For example, In the current implementation, axum
automatically starts as many worker core in the running system and each worker
runs a single-threaded ffmpeg instance. However we could easily reduce the
threads used by axum and create an create additional multi-threaded ffmpeg
workers to process the videos.

<br/>

We could also improve how videos get transport by using object storages instead
of sending them over http request, or using gRPCs for the communication between
client and server. But that, in another post :)

<br/>
<br/>
