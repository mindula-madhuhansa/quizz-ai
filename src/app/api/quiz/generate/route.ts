import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";

import saveQuiz from "./saveToDb";

export async function POST(req: NextRequest) {
  const body = await req.formData();
  const document = body.get("pdf");

  try {
    const pdfLoader = new PDFLoader(document as Blob, {
      parsedItemSeparator: " ",
    });
    const docs = await pdfLoader.load();

    const selectedDocuments = docs.filter(
      (doc) => doc.pageContent !== undefined
    );
    const text = selectedDocuments.map((doc) => doc.pageContent);

    const prompt =
      "given the text which is a summary of the document, generate a quiz base on the text. Return json that contains a quiz object with fields: name, description and questions. The questions is an array of objects with fields: questionText, answers. The answers is an array of the objects with fields: answerText, isCorrect.";

    if (!process.env.GEMINI_AI_API_KEY) {
      return NextResponse.json(
        { error: "Gemini AI API key not provided" },
        { status: 500 }
      );
    }

    const genAI = new GoogleGenerativeAI(
      process.env.GEMINI_AI_API_KEY as string
    );

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
    });

    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: [
            {
              text: prompt,
            },
          ],
        },
      ],
    });

    const result = await chat.sendMessage(text.join("\n"));
    const response = await result.response;
    const res = response
      .text()
      .replace("```json", "")
      .replace("```", "")
      .trim();

    const responseJson = JSON.parse(res);

    const { quizzId } = await saveQuiz(responseJson);

    return NextResponse.json({ quizzId }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
