import React from 'react';
import { Facebook, Twitter, Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white py-6 border-t border-[#E5E5E5]">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center">
          <a href="/" className="mb-6">
            <img 
              src="https://cdn.prod.website-files.com/675c4bb1a6111f64bc92535b/6761b9efff880e7c7e83b085_tripwingz..svg"
              alt="Tripwingz"
              className="h-8"
            />
          </a>
          
          <div className="flex flex-col sm:flex-row items-center justify-between w-full">
            <div className="mb-4 sm:mb-0">
              <div className="text-sm text-[#757575]">
                © Tripwingz. All Rights Reserved.
              </div>
            </div>
            
            <div className="flex gap-4">
              <a 
                href="https://www.facebook.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-8 h-8 flex items-center justify-center rounded-full bg-[#F8F8F8] hover:bg-[#FFE978] transition-colors"
              >
                <Facebook className="w-4 h-4 text-[#1B1B1B]" />
              </a>
              <a 
                href="https://twitter.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-8 h-8 flex items-center justify-center rounded-full bg-[#F8F8F8] hover:bg-[#FFE978] transition-colors"
              >
                <Twitter className="w-4 h-4 text-[#1B1B1B]" />
              </a>
              <a 
                href="https://www.instagram.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-8 h-8 flex items-center justify-center rounded-full bg-[#F8F8F8] hover:bg-[#FFE978] transition-colors"
              >
                <Instagram className="w-4 h-4 text-[#1B1B1B]" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}