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
      <table className="table-auto">
        <thead>
          <tr>
            <th className="text-[#6c7381] text-left">Name</th>
            <th className="text-[#6c7381] text-left">Description</th>
          </tr>
        </thead>
        <tbody>
          {props.quizzes.map((quiz: Quiz) => (
            <tr key={quiz.id}>
              <td>
                <Link href={`/quiz/${quiz.id}`}>
                  <p className="text-white underline">{quiz.name}</p>
                </Link>
              </td>
              <td>{quiz.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
