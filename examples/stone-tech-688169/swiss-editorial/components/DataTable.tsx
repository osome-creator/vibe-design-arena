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
      <table className="swiss-table">
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.key}>{col.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className={rowClassName ? rowClassName(row, i) : ""}>
              {columns.map((col, j) => (
                <td key={col.key}>{row[col.key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
