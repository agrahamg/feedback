"use client";

import { useEffect, useState } from "react";
import { type DepartmentData, getData } from "@/api/chartData";
import { BarChart } from "@/components/barChart";

export default function Home() {
  const [data, setData] = useState<DepartmentData[]>([]);
  const [sortOrder, setSortOrder] = useState("");

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    getData()
      .then((data) => setData(data))
      .catch(console.log)
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return "loading...";
  }

  return (
    <>
      <select
        value={sortOrder}
        onChange={(e) => setSortOrder(e.currentTarget.value)}
      >
        <option value="default"></option>
        <option value="asc">ascending</option>
        <option value="desc">descending</option>
      </select>

      <div style={{ width: "500px", height: "250px" }}>
        <BarChart
          data={data.map((datum) => ({
            ...datum,
            title: `${datum.name} (${datum.ticketCount})`,
            value: datum.ticketCount,
            color: datum.colour,
          }))}
          sortOrder={sortOrder}
        />
      </div>
    </>
  );
}
