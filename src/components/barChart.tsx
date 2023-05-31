"use client";

type Data = {
  id: string;
  color: string;
  title?: string;
  value: number;
};

export function BarChart({
  data,
  sortOrder,
}: {
  data: Data[];
  sortOrder: "asc" | "desc" | string;
}) {
  const sortedData = [...data];

  if (sortOrder === "asc") {
    sortedData.sort((a, b) => a.value - b.value);
  } else if (sortOrder === "desc") {
    sortedData.sort((a, b) => b.value - a.value);
  }

  const maxItemHeight = Math.max(...data.map((datum) => datum.value));

  return (
    <div className="flex h-full w-full items-end gap-2 border-2 border-black">
      {sortedData.map((datum) => (
        <div
          className="w-full"
          key={datum.id}
          style={{
            backgroundColor: datum.color,
            height: `${(datum.value / maxItemHeight) * 100}%`,
          }}
          title={datum.title}
        ></div>
      ))}
    </div>
  );
}
