import { cn } from "@/lib/utils";
import { Input } from "../ui/input";
import type { LucideIcon } from "lucide-react";
import React from "react";

type TextFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  className?: string;
  labelIcon?: LucideIcon | React.ReactNode;
  required?: boolean;
};

export default function TextField({
  label,
  className = "",
  labelIcon,
  required = false,
  ...rest
}: TextFieldProps) {
  return (
    <div className={cn("flex flex-col space-y-2", className)}>
      <div className="flex items-center gap-1">
        {labelIcon && (
          <span className="text-zinc-700">
            {typeof labelIcon === "function"
              ? React.createElement(labelIcon, { className: "size-4" })
              : React.isValidElement(labelIcon)
                ? React.cloneElement(labelIcon, {
                    className: "size-4",
                  } as React.SVGProps<SVGSVGElement>)
                : labelIcon}
          </span>
        )}
        {label && <label className="text-sm">{label}</label>}
        {required && <span className="mt-1 text-zinc-800">*</span>}
      </div>
      <Input
        required={required}
        className="h-11 rounded-md border border-zinc-300 bg-zinc-50 focus:border-zinc-500 focus:ring-zinc-500"
        {...rest}
      />
    </div>
  );
}
