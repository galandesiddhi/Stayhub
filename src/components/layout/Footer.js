import Link from "next/link";
import { siteConfig, navLinks } from "@/data/navigation";

export default function Footer() {
  return (
    <footer className="bg-charcoal-darkest text-slate-400 border-t border-white/5">
      {/* Royal Blue accent line */}
      <div className="h-1 bg-gradient-to-r from-royal-blue-dark via-royal-blue to-royal-blue-medium" />

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-6">

          {/* Brand — col span 2 */}
          <div className="flex flex-col gap-5 lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 w-fit">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-royal-blue text-white font-black text-lg shadow-lg shadow-royal-blue/30">
                S
              </span>
              <span className="font-display text-xl font-bold tracking-tight text-white">
                Stay<span className="text-royal-blue-light">Hub</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed max-w-xs font-light">
              Premium co-living spaces designed for modern professionals and students across Lohegaon, Dhanori, Viman Nagar, and Kharadi.
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-4 mt-1">
              {[
                {
                  label: "Instagram", href: siteConfig.socials.instagram,
                  path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z",
                },
                {
                  label: "Twitter", href: siteConfig.socials.twitter,
                  path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
                },
                {
                  label: "LinkedIn", href: siteConfig.socials.linkedin,
                  path: "M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z",
                },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-white/5 hover:bg-royal-blue border border-white/8 hover:border-royal-blue flex items-center justify-center text-slate-400 hover:text-white transition-all duration-200"
                  aria-label={social.label}
                >
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d={social.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-bold text-white text-xs tracking-widest uppercase mb-5">Explore</h3>
            <ul className="space-y-3.5 text-sm">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="hover:text-royal-blue-light transition-colors duration-200">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Locations */}
          <div>
            <h3 className="font-bold text-white text-xs tracking-widest uppercase mb-5">Locations</h3>
            <ul className="space-y-3.5 text-sm">
              {["Lohegaon", "Dhanori", "Viman Nagar", "Kharadi"].map((loc, i) => (
                <li key={loc}>
                  <Link href="/contact" className="hover:text-royal-blue-light transition-colors duration-200 flex items-center gap-2">
                    {loc}
                    {i === 3 && (
                      <span className="text-[9px] text-royal-blue-light font-bold border border-royal-blue-light/30 bg-royal-blue/10 px-1.5 py-0.5 rounded-full uppercase">
                        Soon
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-bold text-white text-xs tracking-widest uppercase mb-5">Support</h3>
            <ul className="space-y-3.5 text-sm">
              <li><Link href="/pricing#faq" className="hover:text-royal-blue-light transition-colors">Help & FAQs</Link></li>
              <li><Link href="/contact" className="hover:text-royal-blue-light transition-colors">Book a Tour</Link></li>
              <li>
                <a href={`mailto:${siteConfig.email}`} className="hover:text-royal-blue-light transition-colors break-all">
                  {siteConfig.email}
                </a>
              </li>
              <li>
                <a href={`tel:${siteConfig.phone.replace(/\s+/g, "")}`} className="hover:text-royal-blue-light transition-colors">
                  {siteConfig.phone}
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-bold text-white text-xs tracking-widest uppercase mb-5">Company</h3>
            <ul className="space-y-3.5 text-sm">
              <li><Link href="/about" className="hover:text-royal-blue-light transition-colors">About Us</Link></li>
              <li>
                <span className="flex items-center gap-2 cursor-default">
                  Careers
                  <span className="bg-royal-blue/20 text-royal-blue-lighter text-[9px] font-bold px-1.5 py-0.5 rounded-full border border-royal-blue/20">Hiring</span>
                </span>
              </li>
              <li><span className="text-slate-600 cursor-not-allowed">Press Kit</span></li>
              <li><span className="text-slate-600 cursor-not-allowed">Investors</span></li>
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="mt-14 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-5 text-xs text-slate-600">
          <div className="text-center md:text-left">
            <p className="text-slate-500">
              © {new Date().getFullYear()} {siteConfig.name} Technologies Pvt Ltd. All rights reserved.
            </p>
            <p className="text-slate-700 mt-0.5">Made with ❤️ in India · Pune, Maharashtra</p>
          </div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-slate-300 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Tenant Agreement</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
