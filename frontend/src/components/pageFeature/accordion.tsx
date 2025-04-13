"use client";
import { ReactNode, useState } from "react";

const Accordion: React.FC<{ title: string; children: ReactNode }> = ({
  title,
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-10 border border-gray-200 rounded">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left p-4 bg-gray-100 hover:bg-gray-200 flex justify-between items-center"
      >
        <span className="text-2xl font-semibold">{title}</span>
        <span className="text-2xl">{isOpen ? "−" : "+"}</span>
      </button>
      {isOpen && <div className="p-4 text-sm text-gray-600">{children}</div>}
    </div>
  );
};

export default Accordion;