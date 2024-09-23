import { SUPPORTED_LANGUAGES } from "../constants";
import { FromLanguage, Language } from "../types";

const URL = `http://localhost:8080/translate/api`;

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

  const fromCode =
    fromLanguage === "auto" ? "auto" : SUPPORTED_LANGUAGES[fromLanguage];
  const toCode = SUPPORTED_LANGUAGES[toLanguage];

  const response = await fetch(`${URL}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      text,
      fromLanguage: fromCode,
      toLanguage: toCode,
    }),
  });

  const result = await response.json();

  console.log(result.text);

  return result.text;
}
