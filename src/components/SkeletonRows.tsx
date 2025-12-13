export default function SkeletonRow() {
  return (
    <tr className="animate-pulse">
      {Array.from({ length: 5 }).map((_, i) => (
        <td key={i} className="p-3">
          <div className="h-4 bg-neutral-800 rounded" />
        </td>
      ))}
    </tr>
  );
}
