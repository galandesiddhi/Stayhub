"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { galleryImages, galleryCategories } from "@/data/gallery";

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.07 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

const locations = [
  "StayHub Koramangala Premier",
  "StayHub Indiranagar Club House",
  "StayHub HSR Residency",
  "StayHub Whitefield Elite",
];
const getLocation = (id) => locations[id % locations.length];

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const filtered =
    activeCategory === "all"
      ? galleryImages
      : galleryImages.filter((img) => img.category === activeCategory);

  const handleClose = useCallback(() => setLightboxIndex(null), []);
  const handlePrev = useCallback(
    () => setLightboxIndex((i) => (i === 0 ? filtered.length - 1 : i - 1)),
    [filtered.length]
  );
  const handleNext = useCallback(
    () => setLightboxIndex((i) => (i === filtered.length - 1 ? 0 : i + 1)),
    [filtered.length]
  );

  useEffect(() => {
    const onKey = (e) => {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") handleClose();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxIndex, handleClose, handlePrev, handleNext]);

  // Prevent body scroll when lightbox is open
  useEffect(() => {
    if (lightboxIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [lightboxIndex]);

  return (
    <div className="bg-background min-h-screen">

      {/* ── Hero ─────────────────────────────────────── */}
      <section className="relative bg-white py-28 overflow-hidden">
        <div className="relative mx-auto max-w-4xl px-4 text-center z-10">
          <motion.div variants={stagger} initial="hidden" animate="show" className="flex flex-col items-center gap-5">
            <motion.span variants={fadeUp} className="inline-flex items-center gap-2 rounded-full border border-royal-blue-light/30 bg-royal-blue/10 px-4 py-1.5 text-xs font-bold tracking-widest uppercase text-royal-blue-lighter">
              📸 Curated Living Spaces
            </motion.span>
            <motion.h1 variants={fadeUp} className="font-display text-4xl sm:text-5xl lg:text-6xl font-normal text-charcoal-darkest tracking-tight">
              Explore the <span className="text-royal-blue">StayHub Aesthetic</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="text-lg text-charcoal-muted font-light max-w-xl leading-relaxed">
              Beautiful spaces lead to beautiful work. Browse real photos of our bedrooms, co-working suites, kitchens, and rooftop lounges.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ── Category Filter ───────────────────────────── */}
      <section className="bg-white border-b border-slate-100 sticky top-20 z-30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-2 py-4">
            {galleryCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => { setActiveCategory(cat.id); setLightboxIndex(null); }}
                className={`rounded-full px-5 py-2 text-xs font-bold uppercase tracking-widest transition-all duration-200 cursor-pointer border ${
                  activeCategory === cat.id
                    ? "bg-royal-blue text-white border-royal-blue shadow-lg shadow-royal-blue/20"
                    : "bg-white text-charcoal-muted border-slate-200 hover:border-royal-blue hover:text-royal-blue"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Gallery Grid ──────────────────────────────── */}
      <section className="py-12 bg-surface">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            layout
            variants={stagger}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((img, index) => (
                <motion.div
                  layout
                  key={img.id}
                  variants={fadeUp}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.92 }}
                  transition={{ duration: 0.3 }}
                  whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                  onClick={() => setLightboxIndex(index)}
                  className={`group relative rounded-2xl overflow-hidden bg-slate-200 border border-slate-100 shadow-sm cursor-pointer ${
                    index % 5 === 0 ? "aspect-[4/3]" : index % 3 === 0 ? "aspect-[3/4]" : "aspect-[4/3]"
                  }`}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-107"
                  />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-charcoal-darkest/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                    <div className="translate-y-3 group-hover:translate-y-0 transition-transform duration-300">
                      <span className={`inline-flex text-[9px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full mb-2 ${
                        img.category === "rooms" ? "bg-royal-blue/20 text-royal-blue-lighter border border-royal-blue-light/30"
                        : img.category === "exterior" ? "bg-green-500/20 text-green-300 border border-green-400/30"
                        : "bg-white/20 text-white border border-white/20"
                      }`}>
                        {img.category}
                      </span>
                      <h4 className="text-sm font-bold text-white leading-snug">{img.alt}</h4>
                      <p className="text-[10px] text-slate-300 mt-1 flex items-center gap-1">
                        📍 {getLocation(img.id)}
                      </p>
                    </div>
                    {/* Expand icon */}
                    <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-300">
                      <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                      </svg>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────── */}
      <section className="py-16 px-4 bg-white">
        <motion.div
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-3xl text-center"
        >
          <h2 className="font-display text-3xl font-bold text-charcoal-darkest mb-4">
            Want to See It in Person?
          </h2>
          <p className="text-charcoal-light mb-8">Photos don't do justice. Come walk through our spaces.</p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center h-13 rounded-full bg-charcoal-darkest px-8 py-3.5 text-sm font-bold text-white hover:bg-royal-blue transition-all shadow-sm"
          >
            Schedule a Visit →
          </Link>
        </motion.div>
      </section>

      {/* ── Lightbox ─────────────────────────────────── */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal-darkest/97 backdrop-blur-md p-4 select-none"
            onClick={handleClose}
          >
            {/* Image container */}
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="relative max-w-5xl w-full max-h-[80vh] aspect-[4/3] rounded-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={filtered[lightboxIndex].src}
                alt={filtered[lightboxIndex].alt}
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
            </motion.div>

            {/* Close */}
            <button
              onClick={handleClose}
              className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
              aria-label="Close"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Prev */}
            <button
              onClick={(e) => { e.stopPropagation(); handlePrev(); }}
              className="absolute left-4 w-11 h-11 rounded-full bg-white/10 hover:bg-royal-blue border border-white/20 hover:border-royal-blue flex items-center justify-center text-white transition-all cursor-pointer"
              aria-label="Previous"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Next */}
            <button
              onClick={(e) => { e.stopPropagation(); handleNext(); }}
              className="absolute right-4 w-11 h-11 rounded-full bg-white/10 hover:bg-royal-blue border border-white/20 hover:border-royal-blue flex items-center justify-center text-white transition-all cursor-pointer"
              aria-label="Next"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Info bar */}
            <div className="absolute bottom-5 inset-x-0 text-center text-white">
              <p className="font-semibold text-base">{filtered[lightboxIndex].alt}</p>
              <p className="text-xs text-slate-400 mt-1">📍 {getLocation(filtered[lightboxIndex].id)}</p>
              <p className="text-[10px] text-slate-600 uppercase tracking-widest mt-1">
                {lightboxIndex + 1} / {filtered.length}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
