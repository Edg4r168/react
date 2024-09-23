// @ts-check
import { test, expect } from "@playwright/test";
const LOCALHOST_URL = "http://localhost:5173/";
const CAT_PREFIX_IMAGE_URL = "https://cataas.com";

test("app shows random fact and image", async ({ page }) => {
  await page.goto(LOCALHOST_URL);

  const paragraph = await page.getByRole("paragraph");
  const image = await page.getByRole("img");

  const textContent = await paragraph.textContent();
  const imageUrl = await image.getAttribute("src");

  expect(textContent?.length).toBeGreaterThan(0);
  expect(imageUrl?.startsWith(CAT_PREFIX_IMAGE_URL)).toBeTruthy();
});

test("refresh fact and image", async ({ page }) => {
  await page.goto(LOCALHOST_URL);

  // Guardar el estado inicial del texto y la imagen
  const paragraph = page.getByRole("paragraph");
  const image = page.getByRole("img");
  const initialTextContent = await paragraph.textContent();
  const initialImageUrl = await image.getAttribute("src");

  const button = await page.$("button");
  await button?.click();

  // Esperar un breve tiempo para que la página se actualice
  await page.waitForTimeout(2000);

  // Obtener el nuevo texto y la nueva imagen después de hacer clic en el botón
  const newParagraph = page.getByRole("paragraph");
  const newImage = page.getByRole("img");
  const newTextContent = await newParagraph.textContent();
  const newImageUrl = await newImage.getAttribute("src");

  // Verificar que el nuevo texto y la nueva imagen sean diferentes al estado inicial
  expect(newTextContent).not.toEqual(initialTextContent);
  expect(newImageUrl).not.toEqual(initialImageUrl);
});
