interface Column {
  key: string;
  label: string;
  align?: "left" | "right";
}

interface DataTableProps {
  columns: Column[];
  rows: Record<string, React.ReactNode>[];
  rowClassName?: (row: Record<string, React.ReactNode>, index: number) => string;
}

export default function DataTable({ columns, rows, rowClassName }: DataTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                className="px-3.5 py-3 font-semibold text-muted border-b-2 border-border whitespace-nowrap bg-[#fdf8f2]"
                style={{ textAlign: col.align === "left" ? "left" : col.align ?? "right" }}
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={i}
              className={`border-b border-border hover:bg-[#fdf8f2] transition-colors ${
                rowClassName ? rowClassName(row, i) : ""
              }`}
            >
              {columns.map((col, j) => (
                <td
                  key={col.key}
                  className={`px-3.5 py-3 tabular-nums ${
                    j === 0 ? "text-left font-semibold text-heading" : "text-right text-foreground"
                  }`}
                >
                  {row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
