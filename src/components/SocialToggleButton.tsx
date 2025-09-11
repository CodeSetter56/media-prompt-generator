import React from "react";

interface ButtonProps {
  icon: React.ElementType;
  label: string;
  activeColor: string;
  isToggled: boolean;
  onToggle: () => void;
}

export function SocialToggleButton({
  icon: Icon,
  label,
  activeColor,
  isToggled,
  onToggle,
}: ButtonProps) {
  const buttonClass = `
    h-12 w-12 p-2 rounded-md
    ${isToggled ? "bg-base-100" : ""}
  `;

  return (
    <button
      type="button"
      onClick={onToggle}
      className={buttonClass.trim()}
      aria-label={label}
    >
      <Icon
        className="h-full w-full"
        color={isToggled ? activeColor : "gray"}
      />
    </button>
  );
}
