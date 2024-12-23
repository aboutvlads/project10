import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface NavDropdownProps {
  label: string;
  items?: Array<{
    href: string;
    label: string;
  }>;
}

export default function NavDropdown({ label, items = [] }: NavDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative group">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 py-2"
      >
        <span className="text-sm font-medium text-[#1B1B1B] group-hover:text-black">
          {label}
        </span>
        <ChevronDown className="w-4 h-4 text-[#1B1B1B] group-hover:text-black" />
      </button>

      {items.length > 0 && (
        <div 
          className={`
            absolute top-full left-0 w-48 bg-white rounded-lg shadow-lg py-2
            transform transition-all duration-200 origin-top
            ${isOpen ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0'}
          `}
        >
          {items.map((item, index) => (
            <a
              key={index}
              href={item.href}
              className="block px-4 py-2 text-sm text-[#1B1B1B] hover:bg-[#F8F8F8]"
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}