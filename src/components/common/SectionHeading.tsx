import React from "react";

interface SectionHeadingProps {
  badge?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center" | "right";
  light?: boolean;
  className?: string;
}

export default function SectionHeading({
  badge,
  title,
  subtitle,
  align = "center",
  light = false,
  className = "",
}: SectionHeadingProps) {
  const alignClasses = {
    left: "text-left items-start",
    center: "text-center items-center mx-auto",
    right: "text-right items-end ml-auto",
  };

  return (
    <div className={`flex flex-col max-w-3xl mb-12 sm:mb-16 ${alignClasses[align]} ${className}`}>
      {badge && (
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest mb-3 bg-[#D99A35]/15 text-[#D99A35] border border-[#D99A35]/30">
          <span className="w-1.5 h-1.5 rounded-full bg-[#D99A35]" />
          {badge}
        </div>
      )}
      <h2
        className={`text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight leading-tight ${
          light ? "text-white" : "text-[#101B35]"
        }`}
      >
        {title}
      </h2>
      <div className={`w-16 h-1 mt-4 mb-4 rounded-full bg-gradient-to-r from-[#D99A35] to-[#F3B95F] ${align === "center" ? "mx-auto" : ""}`} />
      {subtitle && (
        <p
          className={`text-base sm:text-lg leading-relaxed ${
            light ? "text-[#EDE6D8]/80" : "text-[#101B35]/75"
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
