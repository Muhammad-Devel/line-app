import { useEffect, useRef, useState } from "react";

interface VerifyCodeProps {
  length?: number;
  onChange: (code: string) => void;
}

export default function VerifyCode({
  length = 4,
  onChange,
}: VerifyCodeProps) {
  const [code, setCode] = useState<string[]>(Array(length).fill(""));
  const inputsRef = useRef<HTMLInputElement[]>([]);

  useEffect(() => {
    inputsRef.current[0]?.focus();
  }, []);

  const handleChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < length - 1) {
      inputsRef.current[index + 1]?.focus();
    }

    if (newCode.every(Boolean)) {
      onChange(newCode.join(""));
      
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace") {
      if (code[index]) {
        const newCode = [...code];
        newCode[index] = "";
        setCode(newCode);
      } else if (index > 0) {
        inputsRef.current[index - 1]?.focus();
      }
    }
  };

  return (
    <div className="flex gap-3 justify-center animate-in slide-in-from-right-5 duration-300">
      {code.map((digit, index) => (
        <input
          key={index}
          ref={(el) => {
            if (el) inputsRef.current[index] = el;
          }}
          value={digit}
          onChange={(e) => handleChange(e.target.value, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          type="text"
          inputMode="numeric"
          maxLength={1}
          className="
            w-14 h-14
            text-center text-xl font-semibold
            rounded-xl border border-gray-300
            focus:border-blue-500 focus:ring-2 focus:ring-blue-100
            transition-all
            active:scale-[0.98]
          "
        />
      ))}
    </div>
  );
}
