import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import { BASE_URL, configMessages, model } from "./consts.js";

const app = express();
const PORT = process.env?.PORT ?? 8080;

app.use(express.json());
app.use(cors());

app.post("/translate/worker", async (req, res) => {
  const text = req.body?.text ?? "";
  const fromLanguage = req.body?.fromLanguage ?? "";
  const toLanguage = req.body?.toLanguage ?? "";

  if (!text || !fromLanguage || !toLanguage)
    return res
      .status(400)
      .send(
        "Los parametros `text, fromLanguage y toLanguage` son obligatorios"
      );

  try {
    const response = await fetch(`${process.env?.URL ?? ""}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text,
        source: fromLanguage,
        target: toLanguage,
      }),
    });

    const result = await response.json();
    console.log(result);

    res.json({ text: result.response.translated_text });
  } catch (error) {
    console.log(error);
    res.status(500).send("Ocurrio un error al traducir el texto");
  }
});

const URL = `${BASE_URL}/${process.env?.ACCOUNT_ID}/ai/run/${model}`;

app.post("/translate/api", async (req, res) => {
  const text = req.body?.text ?? "";
  const fromLanguage = req.body?.fromLanguage ?? "";
  const toLanguage = req.body?.toLanguage ?? "";

  if (!text || !fromLanguage || !toLanguage)
    return res
      .status(400)
      .send(
        "Los parametros `text, fromLanguage y toLanguage` son obligatorios"
      );

  try {
    const response = await fetch(`${URL}`, {
      headers: {
        Authorization: `Bearer ${process.env?.CLOUDFLARE_API_TOKEN}`,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        messages: [
          ...configMessages,
          {
            role: "user",
            content: `${text}. {{${fromLanguage}}} [[${toLanguage}]]`,
          },
        ],
      }),
    });

    const data = await response.json();
    console.log(data.result.response);

    // const reader = response.body.getReader();
    // const decoder = new TextDecoder();
    // let result = "";

    // while (true) {
    //   const { done, value } = await reader.read();
    //   if (done) break;
    //   result += decoder.decode(value);
    //   console.log(result);
    // }

    // res.json({ result });
    res.json({ text: data.result.response });
  } catch (error) {
    console.log(error);

    res.status(500).send("Internal error server");
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
