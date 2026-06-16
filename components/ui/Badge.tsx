export default function Badge({ children, variant = "default" }: { children: React.ReactNode; variant?: "default"|"success"|"warning"|"info" }) {
  const v = { default: "bg-gray-100 text-gray-700", success: "bg-green-100 text-green-700", warning: "bg-yellow-100 text-yellow-700", info: "bg-blue-100 text-blue-700" };
  return <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${v[variant]}`}>{children}</span>;
}
