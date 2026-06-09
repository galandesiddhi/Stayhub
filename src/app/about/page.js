import Link from "next/link";
import Image from "next/image";
import { BreadcrumbSchema } from "@/components/seo/SchemaMarkup";

export const metadata = {
  title: "About Us | SOL Stay",
  description: "Learn about SOL Stay's mission to redefine co-living for modern professionals, creators, and builders.",
};

export default function AboutPage() {
  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen py-20">
      <BreadcrumbSchema items={[
        { name: "Home", url: "https://solstay.in" },
        { name: "About", url: "https://solstay.in/about" }
      ]} />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col gap-4">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/10 px-4 py-1.5 text-sm font-semibold text-blue-500 border border-blue-500/20 w-fit mx-auto">
            🚀 Our Mission
          </span>
          <h1 className="font-display text-4xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            Redefining Co-Living for <span className="gradient-text">Modern Builders</span>
          </h1>
          <p className="text-lg text-slate-500 dark:text-slate-400 font-light leading-relaxed">
            SOL Stay was born out of a simple frustration: why does renting a premium living space have to be so difficult, inflexible, and isolated?
          </p>
        </div>

        {/* Content Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <div className="relative aspect-[4/3] rounded-[32px] overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 animate-fadeIn">
            <Image
              src="/common area.png"
              alt="Team collaborating at SOL Stay"
              fill
              className="object-cover"
              sizes="(max-w-768px) 100vw, 50vw"
            />
          </div>
          <div className="flex flex-col gap-6 animate-fadeIn">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              The SOL Stay Story
            </h2>
            <p className="text-slate-600 dark:text-slate-400 font-light leading-relaxed">
              Founded in 2024, SOL Stay is a venture-backed premium co-living network designing zero-friction shared living spaces for modern creators, builders, and professionals. 
            </p>
            <p className="text-slate-600 dark:text-slate-400 font-light leading-relaxed">
              We eliminate the traditional friction of renting—heavy brokerage fees, long lock-in periods, dealing with multiple utility vendors, and poor quality infrastructure. Instead, we offer a seamless membership model where everything from high-speed fiber internet to chef-prepared meals is included.
            </p>
            <Link
              href="/contact"
              className="inline-flex w-fit items-center justify-center rounded-xl bg-blue-600 px-6 py-3 text-xs font-bold tracking-widest uppercase text-white shadow-lg shadow-blue-600/20 hover:bg-blue-500 transition-colors"
            >
              Join Our Community
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
