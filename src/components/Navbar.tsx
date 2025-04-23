"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  return (
    <>
      <nav className={`bg-gradient-to-r from-[#0f172a] to-[#0c1324] text-white py-4 px-6 fixed w-full z-50 transition-all duration-300 ${scrolled ? 'shadow-lg shadow-black/20 py-2' : ''}`}>
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center">
            <Image
              src="/images/logo-icon.png"
              alt="Casarão Imobiliária"
              width={50}
              height={50}
              className="filter brightness-0 invert"
            />
            <span className="ml-2 text-2xl font-bold text-amber-500">CASARÃO</span>
          </Link>

          {/* Menu para desktop */}
          <div className="hidden md:flex space-x-8">
            <Link href="/" className="hover:text-amber-500 text-lg font-medium relative group">
              Início
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link href="/imoveis" className="hover:text-amber-500 text-lg font-medium relative group">
              Imóveis
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link href="/sobre" className="hover:text-amber-500 text-lg font-medium relative group">
              Sobre
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link href="/contato" className="hover:text-amber-500 text-lg font-medium relative group">
              Contato
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </div>

          {/* Botão de menu para mobile */}
          <button
            className="md:hidden text-white focus:outline-none"
            onClick={toggleMenu}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {/* Menu mobile */}
        <div 
          className={`md:hidden bg-[#1a2437] transition-all duration-300 overflow-hidden ${
            isMenuOpen ? 'max-h-64 py-4 opacity-100' : 'max-h-0 py-0 opacity-0'
          }`}
        >
          <div className="flex flex-col space-y-4 px-6">
            <Link 
              href="/" 
              className="hover:text-amber-500 text-lg font-medium block py-2 border-b border-gray-700"
              onClick={() => setIsMenuOpen(false)}
            >
              Início
            </Link>
            <Link 
              href="/imoveis" 
              className="hover:text-amber-500 text-lg font-medium block py-2 border-b border-gray-700"
              onClick={() => setIsMenuOpen(false)}
            >
              Imóveis
            </Link>
            <Link 
              href="/sobre" 
              className="hover:text-amber-500 text-lg font-medium block py-2 border-b border-gray-700"
              onClick={() => setIsMenuOpen(false)}
            >
              Sobre
            </Link>
            <Link 
              href="/contato" 
              className="hover:text-amber-500 text-lg font-medium block py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Contato
            </Link>
          </div>
        </div>
      </nav>
      <div className="h-16"></div>
      <div className="header-divider"></div>
    </>
  );
}
