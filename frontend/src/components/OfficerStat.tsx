interface Props {
  title: string;
  value: string | number;
}

export default function OfficerStat({
  title,
  value,
}: Props) {
  return (
    <div className="
      bg-[#0B1220]
      border
      border-blue-900/30
      rounded-2xl
      p-6
    ">
      <h3 className="text-slate-400">
        {title}
      </h3>

      <p className="text-4xl font-bold mt-2">
        {value}
      </p>
    </div>
  );
}