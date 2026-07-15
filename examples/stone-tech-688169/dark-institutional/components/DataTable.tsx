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
                className="bg-[#161b22] px-3.5 py-2.5 font-semibold text-[#58a6ff] uppercase tracking-wider border-b border-[#21262d] whitespace-nowrap text-xs"
                style={{
                  textAlign: col.align === "left" ? "left" : "right",
                }}
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
              className={`border-b border-[#21262d] hover:bg-[#1c2333] transition-colors ${
                rowClassName ? rowClassName(row, i) : ""
              }`}
            >
              {columns.map((col, j) => (
                <td
                  key={col.key}
                  className={`px-3.5 py-2.5 tabular-nums text-[#e6edf3] ${
                    j === 0 ? "text-left font-medium" : "text-right"
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
