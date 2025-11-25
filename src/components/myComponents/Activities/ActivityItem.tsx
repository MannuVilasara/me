interface ActivityItemProps {
  icon: string;
  label: string;
  value: React.ReactNode;
}

export function ActivityItem({ icon, label, value }: ActivityItemProps) {
  return (
    <div className="flex items-center gap-2 text-sm font-mono">
      <span>{icon}</span>
      <span className="font-semibold">{label}:</span>
      <span>{value}</span>
    </div>
  );
}
