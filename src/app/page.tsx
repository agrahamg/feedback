"use client";

import { useEffect, useState } from "react";

type Data = {
  id: string;
  name: string;
  ticketCount: number;
  colour: string;
};

const chartData = [
  { id: "dep-1", name: "Legal", ticketCount: 32, colour: "#3F888F" },
  { id: "dep-2", name: "Sales", ticketCount: 20, colour: "#FFA420" },
  { id: "dep-3", name: "Engineering", ticketCount: 60, colour: "#287233" },
  { id: "dep-4", name: "Manufacturing", ticketCount: 5, colour: "#4E5452" },
  { id: "dep-5", name: "Maintenance", ticketCount: 14, colour: "#642424" },
  {
    id: "dep-6",
    name: "Human Resourcing",
    ticketCount: 35,
    colour: "#1D1E33",
  },
  { id: "dep-7", name: "Events", ticketCount: 43, colour: "#E1CC4F" },
] as const;

const getData = () =>
  new Promise((resolve) => {
    setTimeout(resolve, 500, chartData);
  });

export default function Home() {
  const [data, setData] = useState<Data[]>([]);
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
