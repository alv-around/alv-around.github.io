import { expect, test } from "@playwright/test";

test("home page shows the personal site content and navigation", async ({ page }) => {
  await page.goto("/", { waitUntil: "domcontentloaded" });

  await expect(
    page.getByRole("heading", { name: "Alv-Around" }),
  ).toHaveText("Alv-Around");
  await expect(page.getByRole("link", { name: "Home" })).toHaveAttribute(
    "aria-current",
    "page",
  );
  await expect(page.locator("body")).toContainText("Hi! Am Alvaro");
  await expect(page.locator("body")).toContainText("Rust");
  await expect(page.getByRole("link", { name: "github profile" })).toHaveAttribute(
    "href",
    "https://github.com/alv-around",
  );
});

test("blog list links to a rendered post", async ({ page }) => {
  await page.goto("/blog", { waitUntil: "domcontentloaded" });

  await expect(page.getByRole("link", { name: "Blog" })).toHaveAttribute(
    "aria-current",
    "page",
  );

  const postLink = page.getByRole("link", { name: "Ffmpeg on roids with rust" });
  await expect(postLink).toHaveAttribute("href", "/blog/scalling-your-service");

  await page.goto("/blog/scalling-your-service", { waitUntil: "domcontentloaded" });
  await expect(
    page.getByRole("heading", { name: "Ffmpeg on roids with rust" }),
  ).toHaveText("Ffmpeg on roids with rust");
  await expect(page.locator("body")).toContainText("Creating the http server");
  await expect(page.locator(".markdown-content pre code").first()).toContainText(
    "use axum::body::Body",
  );
});
