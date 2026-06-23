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

  const postLink = page.locator('a[href^="/blog/"]').first();
  await expect(postLink).toBeVisible();

  const postTitle = await postLink.textContent();
  const postHref = await postLink.getAttribute("href");

  expect(postTitle?.trim()).toBeTruthy();
  expect(postHref).toMatch(/^\/blog\/[a-z0-9-]+$/);

  await page.goto(postHref!, { waitUntil: "domcontentloaded" });
  await expect(page.getByRole("heading", { name: postTitle!.trim() })).toBeVisible();
  await expect(page.locator(".markdown-content")).not.toBeEmpty();
});
