"use client";

import Tooltip from "@uiw/react-tooltip";
import HeatMap from "@uiw/react-heat-map";

import { convertDate } from "@/lib/utils";
import { date } from "drizzle-orm/mysql-core";

type Props = {
  data: {
    createdAt: Date;
    count: number;
  }[];
};

const panelColors = {
  0: "#4b515c",
  8: "#7BC96F",
  4: "#C6E48B",
  12: "#239A3B",
  32: "#196127",
};

export const HeatMapComponent = (props: Props) => {
  const formattedDates = props.data.map((item) => ({
    date: convertDate(item.createdAt),
    count: item.count,
  }));

  console.log(formattedDates);

  return (
    <HeatMap
      value={formattedDates}
      width="100%"
      style={{
        backgroundColor: "#020817",
        color: "#888",
      }}
      startDate={new Date("2024/01/01")}
      panelColors={panelColors}
      rectRender={(props, data) => {
        return (
          <Tooltip
            placement="top"
            content={`count: ${data.count || 0}`}
          >
            <rect {...props} />
          </Tooltip>
        );
      }}
    />
  );
};
