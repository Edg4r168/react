import { FromLanguage, Language } from "../types";

const URL = `http://localhost:8080/translate/worker`;

export async function translate({
  fromLanguage,
  toLanguage,
  text,
}: {
  fromLanguage: FromLanguage;
  toLanguage: Language;
  text: string;
}) {
  if (fromLanguage === toLanguage) return text;

  const response = await fetch(`${URL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      text,
      fromLanguage,
      toLanguage,
    }),
  });
  const result = await response.json();

  console.log(result.text);

  return result.text;
}
