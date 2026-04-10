export default function Table({ columns, data, renderActions }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left border-collapse">
        <thead className="bg-gray-100">
          <tr>
            {columns.map((col) => (
              <th key={col.key} className="p-3">
                {col.label}
              </th>
            ))}
            {renderActions && <th className="p-3"></th>}
          </tr>
        </thead>

        <tbody>
          {data?.map((item) => (
            <tr key={item.id} className="border-t">
              {columns.map((col) => (
                <td key={col.key} className="p-3">
                  {col.render ? col.render(item) : item[col.key]}
                </td>
              ))}

              {renderActions && (
                <td className="p-3 flex justify-end gap-4">
                  {renderActions(item)}
                </td>
              )}
            </tr>
          ))}

          {data.length === 0 && (
            <tr>
              <td
                colSpan={columns.length + (renderActions ? 1 : 0)}
                className="text-center p-4 text-gray-400"
              >
                Nenhum registro encontrado
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
