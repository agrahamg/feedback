import { test, expect, type Page } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test.describe("section", () => {
  test("first test", async ({ page }) => {});
});
