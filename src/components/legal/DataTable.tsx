type DataTableProps = {
    columns: [string, string, string];
    rows: [string, string, string][];
};

/** Three-column table from tablet up; on phones each row becomes a card with labelled fields. */
export function DataTable({ columns, rows }: DataTableProps) {
    return (
        <>
            <table className="hidden w-full border-separate border-spacing-0 overflow-hidden rounded-md border border-line-subtle text-left md:table">
                <thead className="bg-surface font-mono text-xs leading-[1.2] font-medium tracking-[0.1em] text-fg-subtle uppercase">
                    <tr>
                        {columns.map((column, index) => (
                            <th key={column} scope="col" className={`border-b border-line-subtle px-4 py-3.5 font-medium ${index === 0 ? 'w-[200px]' : ''}`}>
                                {column}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="text-sm">
                    {rows.map(([first, ...rest], rowIndex) => (
                        <tr key={rowIndex}>
                            <th scope="row" className={`px-4 py-3.5 align-top leading-[1.2] font-medium ${rowIndex < rows.length - 1 ? 'border-b border-line-subtle' : ''}`}>
                                {first}
                            </th>
                            {rest.map((cell, cellIndex) => (
                                <td key={cellIndex} className={`px-4 py-3.5 align-top leading-[1.5] text-fg-muted ${rowIndex < rows.length - 1 ? 'border-b border-line-subtle' : ''}`}>
                                    {cell}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>

            <ul className="flex flex-col gap-3 md:hidden">
                {rows.map((row, rowIndex) => (
                    <li key={rowIndex}>
                        <dl className="flex flex-col gap-3 rounded-md border border-line-subtle bg-surface p-4">
                            {row.map((cell, cellIndex) => (
                                <div key={cellIndex} className="flex flex-col gap-1">
                                    <dt className="font-mono text-xs leading-[1.2] font-medium tracking-[0.1em] text-fg-subtle uppercase">{columns[cellIndex]}</dt>
                                    <dd className={`text-sm ${cellIndex === 0 ? 'leading-[1.2] font-medium' : 'leading-[1.5] text-fg-muted'}`}>{cell}</dd>
                                </div>
                            ))}
                        </dl>
                    </li>
                ))}
            </ul>
        </>
    );
}
