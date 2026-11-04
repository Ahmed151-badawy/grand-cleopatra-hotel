import React from "react";
import Link from "next/link";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline" | "white" | "ghost";
  size?: "sm" | "md" | "lg";
  href?: string;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  className?: string;
  fullWidth?: boolean;
}

export default function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  icon,
  iconPosition = "right",
  className = "",
  fullWidth = false,
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-semibold transition-all duration-300 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer";

  const sizeStyles = {
    sm: "px-4 py-2 text-xs uppercase tracking-wider",
    md: "px-6 py-3 text-sm tracking-wide",
    lg: "px-8 py-4 text-base tracking-wide shadow-md",
  };

  const variantStyles = {
    primary:
      "bg-gradient-to-r from-[#D99A35] to-[#B67C21] text-white hover:from-[#E6AD4B] hover:to-[#C68A2F] shadow-sm hover:shadow-lg focus:ring-[#D99A35] hover:-translate-y-0.5",
    secondary:
      "bg-[#101B35] text-white hover:bg-[#1A2A4E] focus:ring-[#101B35] hover:-translate-y-0.5 shadow-sm",
    outline:
      "border-2 border-[#D99A35] text-[#D99A35] hover:bg-[#D99A35] hover:text-white focus:ring-[#D99A35]",
    white:
      "bg-white text-[#101B35] hover:bg-[#F8F5EF] shadow-md hover:shadow-lg focus:ring-white hover:-translate-y-0.5",
    ghost:
      "text-[#101B35] hover:bg-[#D99A35]/10 hover:text-[#D99A35] focus:ring-[#D99A35]",
  };

  const combinedClasses = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${
    fullWidth ? "w-full" : ""
  } ${className}`;

  const content = (
    <>
      {icon && iconPosition === "left" && <span className="mr-2">{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === "right" && <span className="ml-2">{icon}</span>}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={combinedClasses}>
        {content}
      </Link>
    );
  }

  return (
    <button className={combinedClasses} {...props}>
      {content}
    </button>
  );
}

