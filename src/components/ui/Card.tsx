import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hoverable?: boolean;
  selected?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = "",
  onClick,
  hoverable = false,
  selected = false,
}) => {
  return (
    <div
      onClick={onClick}
      className={`
        bg-white rounded-xl border-2 transition-all duration-200
        ${
          selected
            ? "border-blue-600 ring-2 ring-blue-100 shadow-md"
            : "border-slate-100"
        }
        ${
          hoverable && !selected
            ? "hover:border-blue-300 hover:shadow-lg cursor-pointer"
            : ""
        }
        ${className}
      `}
    >
      {children}
    </div>
  );
};
