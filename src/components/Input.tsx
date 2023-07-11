import { FC } from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { IconType } from "react-icons";

interface InputProps {
  label?: string;
  id: string;
  type?: string;
  placeholder?: string;
  icon?: IconType;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  disabled?: boolean;
  className?: string;
}

export const Input: FC<InputProps> = ({
  label,
  id,
  type,
  placeholder,
  icon: Icon,
  required,
  register,
  errors,
  disabled,
  className,
}) => {
  return (
    <div className="">
      <label
        htmlFor={id}
        className="text-sm font-semibold text-gray-950 ml-2 leading-6"
      >
        {label}
      </label>
      <div
        className={`mt-1 flex justify-center items-center gap-2 ${className}`}
      >
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          autoComplete={id}
          disabled={disabled}
          {...register(id, { required })}
          className={`form-input w-full px-4 py-3 font-medium rounded-md border-0 
          ring-1 ring-inset ring-[#D5D5E6] placeholder:text-gray-400 
          focus-visible:ring-2 focus-visible:ring-inset 
          focus-visible:ring-[#FFDBB6] focus-visible:shadow-md 
          transition duration-300 sm:text-sm sm:leading-6 
          ${errors[id] && "focus:ring-rose-500"}
          ${disabled && "opacity-50 cursor-default"}`}
        />
        {Icon && <Icon size={25} />}
      </div>
    </div>
  );
};
