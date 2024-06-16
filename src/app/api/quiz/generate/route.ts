import { NextRequest, NextResponse } from "next/server";
import { HumanMessage } from "@langchain/core/messages";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { JsonOutputFunctionsParser } from "langchain/output_parsers";

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

    const model = new ChatGoogleGenerativeAI({
      apiKey: process.env.GEMINI_AI_API_KEY,
      model: "gemini-1.5-flash",
    });

    const parser = new JsonOutputFunctionsParser();
    const extractionFunctionSchema = {
      name: "extractor",
      description: "Extracts fields from the output",
      parameters: {
        type: "object",
        properties: {
          quiz: {
            type: "object",
            properties: {
              name: { type: "string" },
              questions: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    questionText: { type: "string" },
                    answers: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          answerText: { type: "string" },
                          isCorrect: { type: "boolean" },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    };

    const runnable = model.bind({}).pipe(parser);

    const message = new HumanMessage({
      content: [
        {
          type: "text",
          text: prompt + "\n" + text.join("\n"),
        },
      ],
    });

    const result = await model.invoke([message]);
    console.log(result);

    return NextResponse.json({ result }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
