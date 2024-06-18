import Link from "next/link";
import { InferSelectModel } from "drizzle-orm";

import { quizzes } from "@/db/schema";

export type Quiz = InferSelectModel<typeof quizzes>;

type Props = {
  quizzes: Quiz[];
};

export const QuizzesTable = (props: Props) => {
  return (
    <div className="rounded-md overflow-hidden p-10 border">
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="text-[#6c7381] text-left p-4 border-b border-r border-gray-300">
              Name
            </th>
            <th className="text-[#6c7381] text-left p-4 border-b border-gray-300">
              Description
            </th>
          </tr>
        </thead>
        <tbody>
          {props.quizzes.map((quiz: Quiz) => (
            <tr key={quiz.id}>
              <td className="p-4 border-b border-r border-gray-300">
                <Link href={`/quiz/${quiz.id}`}>
                  <p className="text-blue-600 underline">{quiz.name}</p>
                </Link>
              </td>
              <td className="p-4 border-b border-gray-300">
                {quiz.description}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
