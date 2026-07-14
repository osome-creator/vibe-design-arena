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
                className={`bg-gray-50 px-3.5 py-2.5 font-semibold text-gray-600 border-b-2 border-gray-200 whitespace-nowrap ${
                  col.align === "right" || col.align === undefined ? "text-right" : "text-left"
                }`}
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
              className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                rowClassName ? rowClassName(row, i) : ""
              }`}
            >
              {columns.map((col, j) => (
                <td
                  key={col.key}
                  className={`px-3.5 py-2.5 tabular-nums ${
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
