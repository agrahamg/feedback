"use client";

import { useState } from "react";
import { getData } from "@/api/chartData";
import { BarChart } from "@/components/barChart";
import { useLoadOnMount } from "@/hooks/useLoadOnMount";

export default function Home() {
  const [sortOrder, setSortOrder] = useState("");

  const { data, isLoading, error } = useLoadOnMount(getData, []);

  if (isLoading) return "loading...";
  if (error) return "error";

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
