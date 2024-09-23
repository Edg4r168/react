import { SUPPORTED_LANGUAGES } from "../constants";
import { FromLanguage, Language } from "../types.d";
import { ollama } from "ollama-ai-provider";
import { generateText } from "ai";

const messages = [
  {
    role: "user",
    content:
      "The quick brown fox jumps over the lazy dog. {{English}} [[Español]]",
  },
  {
    role: "assistant",
    content: "El rápido zorro marrón salta sobre el perro perezoso.",
  },
  {
    role: "user",
    content: "Bonjour, comment ça va? {{auto}} [[English]]",
  },
  {
    role: "assistant",
    content: "Hello, how are you?",
  },
];
const model = ollama("llama3.1");

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

  const result = await generateText({
    messages: [
      {
        role: "system",
        content:
          "Eres un traductor experto que puede traducir textos de un idioma a otro con precisión y claridad. A continuación, se te proporcionará un texto en un idioma específico que se representará de esta forma {{Idioma del texto original}}, y tu tarea es traducir ese texto al idioma de destino indicado que se representará de esta forma [[Idioma al que se traducirá el texto]]. Asegúrate de mantener el significado y el tono del texto original. " +
          "Si el idioma de origen se especifica como {{auto}}, debes detectar automáticamente el idioma antes de realizar la traducción. Asegúrate de mantener el significado y el tono del texto original.",
      },
      {
        role: "user",
        content:
          "The quick brown fox jumps over the lazy dog. {{English}} [[Español]]",
      },
      {
        role: "assistant",
        content: "El rápido zorro marrón salta sobre el perro perezoso.",
      },
      {
        role: "user",
        content: "Bonjour, comment ça va? {{auto}} [[English]]",
      },
      {
        role: "assistant",
        content: "Hello, how are you?",
      },
      {
        role: "user",
        content: `${text}. {{${fromCode}}} [[${toCode}]]`,
      },
    ],
    model: model,
  });

  console.log(result.text);

  return "Traduccion completa";
}
