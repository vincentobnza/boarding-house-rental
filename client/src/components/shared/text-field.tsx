import { cn } from "@/lib/utils";
import { Input } from "../ui/input";

type TextFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  className?: string;
};

export default function TextField({
  label,
  className = "",
  ...rest
}: TextFieldProps) {
  return (
    <div className={cn("flex flex-col space-y-2", className)}>
      {label && <label className="text-sm">{label}</label>}
      <Input
        className="h-11 rounded-md border border-zinc-200 focus:border-zinc-500 focus:ring-zinc-500"
        {...rest}
      />
    </div>
  );
}
