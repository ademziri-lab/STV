export function SpecsTable({
  specs,
}: {
  specs: { label: string; value: string }[]
}) {
  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200">
      <table className="w-full text-left text-sm">
        <caption className="sr-only">Caractéristiques techniques</caption>
        <tbody className="divide-y divide-slate-200">
          {specs.map((spec, i) => (
            <tr key={`${i}-${spec.label}`} className={i % 2 === 0 ? 'bg-white' : 'bg-surface'}>
              <th scope="row" className="w-1/2 px-4 py-3 font-medium text-ink">
                {spec.label}
              </th>
              <td className="px-4 py-3 text-slate-700">{spec.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}