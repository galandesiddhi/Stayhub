"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks, siteConfig } from "@/data/navigation";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${scrolled
        ? "bg-white/95 backdrop-blur-md border-b border-slate-100"
        : "bg-white/50 backdrop-blur-sm border-b border-transparent"
        }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-3 group">
              <span className="font-display text-2xl font-normal tracking-tight text-charcoal-darkest">
                SOL<span className="text-royal-blue">Stay</span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`text-sm font-semibold tracking-wide transition-colors relative py-1.5 ${isActive
                    ? "text-royal-blue"
                    : "text-charcoal-muted hover:text-charcoal-darkest"
                    }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 h-0.5 w-full bg-royal-blue" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Call to Action Button */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full bg-charcoal-darkest px-6 py-3 text-xs font-bold tracking-widest uppercase text-white hover:bg-royal-blue hover:-translate-y-0.5 transition-all duration-300 cursor-pointer shadow-sm"
            >
              Book a Tour
            </Link>
          </div>

          {/* Mobile hamburger menu toggle */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center rounded-xl p-2.5 text-secondary-slate hover:bg-secondary-slate/10 hover:text-primary-navy transition-colors"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open menu</span>
              {isOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav Drawer */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-[400px] opacity-100 border-b border-secondary-slate/10 bg-white" : "max-h-0 opacity-0 pointer-events-none"
          }`}
        id="mobile-menu"
      >
        <div className="space-y-1.5 px-4 py-4">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`block rounded-xl px-4 py-3 text-sm font-bold tracking-wide transition-colors ${isActive
                  ? "text-royal-blue border-b border-royal-blue"
                  : "text-charcoal-muted hover:text-charcoal-darkest"
                  }`}
              >
                {link.label}
              </Link>
            );
          })}
          <div className="pt-4 border-t border-secondary-slate/10 mt-4 pb-2">
            <Link
              href="/contact"
              onClick={() => setIsOpen(false)}
              className="block w-full text-center rounded-full bg-charcoal-darkest px-4 py-4 text-sm font-bold uppercase tracking-wider text-white hover:bg-royal-blue transition-colors cursor-pointer shadow-sm"
            >
              Schedule Tour
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
