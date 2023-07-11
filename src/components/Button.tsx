import { FC, ReactNode } from "react";
import { IconType } from "react-icons";

interface ButtonProps {
  type?: "button" | "submit" | "reset" | undefined;
  onClick?: () => void;
  disabled?: boolean;
  icon?: IconType;
  iconSize?: number;
  children: ReactNode;
  fullWidth?: boolean;
  primary?: boolean;
  danger?: boolean;
  deepBlue?: boolean;
  lightBlue?: boolean;
  skyBlue?: boolean;
  deepGreen?: boolean;
  className?: string;
}

export const Button: FC<ButtonProps> = ({
  type,
  onClick,
  disabled,
  icon: Icon,
  iconSize,
  children,
  fullWidth,
  primary,
  danger,
  deepBlue,
  lightBlue,
  skyBlue,
  deepGreen,
  className,
}) => {
  return (
    // ${
    //     !primary &&
    //     !danger &&
    //     "bg-sky-500 hover:bg-sky-600 focus-visible:outline-sky-600"
    //   }
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={`flex justify-center items-center gap-2 px-4 py-2 
      text-sm font-medium rounded-md tracking-tight focus-visible:outline 
      focus-visible:outline-2 focus-visible:outline-offset-2
      ${className} 
      ${disabled && "opacity-50 cursor-default"} 
      ${fullWidth && "w-full"} 
      ${primary && "text-white bg-gradient-topBottomBlue"} 
      ${
        danger && "bg-rose-500 hover:bg-rose-600 focus-visible:outline-rose-600"
      } 
      ${deepBlue && "bg-[#0C0E3B]"}
      ${lightBlue && "bg-gradient-blue"}
      ${
        !primary &&
        !deepBlue &&
        !lightBlue &&
        !skyBlue &&
        !deepGreen &&
        "bg-gradient-lightblue"
      }
      ${skyBlue && "bg-gradient-leftRightBlue"}
      ${deepGreen && "bg-[#1D9F51]"}
      ${!skyBlue ? "text-white" : "text-black"}
      `}
    >
      {Icon && <Icon size={iconSize} />}
      {children}
    </button>
  );
};
