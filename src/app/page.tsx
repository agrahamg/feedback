"use client";

import { useEffect, useState } from "react";
import {type DepartmentData, getData} from "@/api/chartData";
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

  const sortValue = "ticketCount";

  let sortedData = data;

  if (sortOrder === "asc") {
    sortedData = [...data].sort((a, b) => a[sortValue] - b[sortValue]);
  } else if (sortOrder === "desc") {
    sortedData = [...data].sort((a, b) => b[sortValue] - a[sortValue]);
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

      <BarChart data={sortedData} width={"500px"} height={"250px"} />
    </>
  );
}

function BarChart({
  data,
  width,
  height,
}: {
  data: Data[];
  width: string;
  height: string;
}) {
  const maxItemHeight = Math.max(...data.map((datum) => datum.ticketCount));

  return (
    <div
      className="flex items-end gap-2 border-2 border-black"
      style={{ width, height }}
    >
      {data.map((datum) => (
        <div
          className="w-full"
          key={datum.id}
          style={{
            backgroundColor: datum.colour,
            height: `${(datum.ticketCount / maxItemHeight) * 100}%`,
          }}
          title={`${datum.name} (${datum.ticketCount})`}
        ></div>
      ))}
    </div>
  );
}
