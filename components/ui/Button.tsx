"use client";
interface BtnProps extends React.ButtonHTMLAttributes<HTMLButtonElement> { variant?: "primary"|"outline"|"ghost"|"danger"; size?: "sm"|"md"|"lg"; loading?: boolean; }
export default function Button({ children, variant = "primary", size = "md", loading, disabled, className = "", ...props }: BtnProps) {
  const v = { primary: "bg-primary text-white hover:bg-primary-dark", outline: "border-2 border-primary text-primary hover:bg-primary hover:text-white", ghost: "text-gray-600 hover:bg-gray-100", danger: "bg-red-500 text-white hover:bg-red-600" };
  const s = { sm: "px-3 py-1.5 text-sm", md: "px-5 py-2.5 text-sm", lg: "px-8 py-3 text-base" };
  return <button className={`inline-flex items-center justify-center font-medium rounded-lg transition-colors disabled:opacity-50 ${v[variant]} ${s[size]} ${className}`} disabled={disabled || loading} {...props}>{loading && <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>}{children}</button>;
}
