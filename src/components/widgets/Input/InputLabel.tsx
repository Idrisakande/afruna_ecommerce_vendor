import { ChangeEvent, useCallback, useMemo, useRef, useState } from "react";
import { IInputLabel } from "@/interfaces/inputs.interfaces";

export function InputLabel({
  headerTitle,
  getValue,
  placeholder,
  type,
}: IInputLabel) {
  const [input, setInput] = useState<string | number | undefined>();
  const inputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => setInput(e.target.value),
    []
  );
  const inputRef = useRef<HTMLInputElement>(null);
  useMemo(() => getValue(input), [getValue, input]);
  return (
    <fieldset>
      <h3 className="my-2">{headerTitle}</h3>
      <input
        ref={inputRef}
        onChange={inputChange}
        value={inputRef.current?.value}
        type={type}
        placeholder={placeholder}
        className="w-full border-[1px] border-slate-300 p-3 rounded-md"
      />
    </fieldset>
  );
}
