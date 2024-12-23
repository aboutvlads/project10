import React from 'react';

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  isActive?: boolean;
}

export default function NavLink({ href, children, isActive }: NavLinkProps) {
  return (
    <a 
      href={href} 
      className="relative group"
    >
      <div className="clip">
        <div className="button-text-wrap">
          <p className="nav-item-title text-sm font-medium text-[#1B1B1B] transition-colors group-hover:text-black">
            {children}
          </p>
        </div>
        <div className="button-text-wrap bottom-text-wrapper">
          <p className="nav-item-title text-sm font-medium text-[#1B1B1B]">
            {children}
          </p>
        </div>
      </div>
    </a>
  );
}