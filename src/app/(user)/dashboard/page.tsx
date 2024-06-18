import { eq } from "drizzle-orm";

import { db } from "@/db";
import { auth } from "@/lib/auth";
import { quizzes } from "@/db/schema";
import { getUserMetrics } from "@/actions/getUserMetrics";
import { getHeatMapData } from "@/actions/getHeatMapData";

import { MetricCard } from "./_components/metric-card";
import { QuizzesTable, Quiz } from "./_components/quizzes-table";
import { HeatMapComponent as HeatMap } from "./_components/heat-map";

export default async function Page() {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return <p>User not found</p>;
  }

  const userData = await getUserMetrics();
  const heatMapData = await getHeatMapData();

  const userQuizzes: Quiz[] = await db.query.quizzes.findMany({
    where: eq(quizzes.userId, userId),
  });

  return (
    <div className="mt-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {userData &&
          userData?.length > 0 &&
          userData.map((metric) => (
            <MetricCard
              key={metric.label}
              label={metric.label}
              value={metric.value}
            />
          ))}
      </div>

      {heatMapData && (
        <div>
          <HeatMap data={heatMapData.data} />
        </div>
      )}

      <QuizzesTable quizzes={userQuizzes} />
    </div>
  );
}
