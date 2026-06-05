"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { pricingPlans } from "@/data/pricing";
import { foodMenu } from "@/data/content";
import { faqItems } from "@/data/faq";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};
const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.12 } },
};

export default function PricingPage() {
  const [isYearly, setIsYearly] = useState(false);
  const [activeMeal, setActiveMeal] = useState(1);
  const [openFaq, setOpenFaq] = useState(null);

  const comparisonRows = [
    { label: "Room Type",          starter: "Triple Sharing",       premium: "Double Sharing" },
    { label: "Bathroom",           starter: "Shared",               premium: "Shared (In-suite)" },
    { label: "Meals / Day",        starter: "2 (Breakfast & Dinner OR Lunch & Dinner)", premium: "2 (Breakfast & Dinner OR Lunch & Dinner)" },
    { label: "WiFi",               starter: "Shared 200 Mbps",      premium: "Shared 200 Mbps" },
    { label: "Washing Machine",    starter: "Included",             premium: "Included" },
    { label: "Gym Access",         starter: "✗",                    premium: "✓" },
    { label: "Co-Working",         starter: "Common Area",          premium: "Dedicated Desk" },
    { label: "Parking",            starter: "✗",                    premium: "Subject to Availability" },
    { label: "Housekeeping",       starter: "Daily",                premium: "Daily" },
  ];

  return (
    <div className="bg-background min-h-screen">

      {/* ── Hero ─────────────────────────────────────── */}
      <section className="relative bg-white py-28 overflow-hidden">
        <div className="relative mx-auto max-w-4xl px-4 text-center z-10">
          <motion.div variants={stagger} initial="hidden" animate="show" className="flex flex-col items-center gap-5">
            <motion.span variants={fadeUp} className="inline-flex items-center gap-2 rounded-full border border-royal-blue-light/30 bg-royal-blue/10 px-4 py-1.5 text-xs font-bold tracking-widest uppercase text-royal-blue-lighter">
              💰 Membership Plans
            </motion.span>
            <motion.h1 variants={fadeUp} className="font-display text-4xl sm:text-5xl lg:text-6xl font-normal text-charcoal-darkest tracking-tight">
              Simple, Transparent <span className="text-royal-blue">Pricing</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="text-lg text-charcoal-muted font-light leading-relaxed max-w-xl">
              All-inclusive pricing. No hidden fees. No broker charges. Just pick your plan and move in.
            </motion.p>

            {/* Billing toggle */}
            <motion.div variants={fadeUp} className="flex items-center gap-4 mt-2">
              <span className={`text-sm font-semibold transition-colors ${!isYearly ? "text-charcoal-darkest" : "text-charcoal-muted"}`}>Monthly</span>
              <button
                onClick={() => setIsYearly(!isYearly)}
                className={`relative w-14 h-7 rounded-full transition-colors duration-300 cursor-pointer focus:outline-none ${isYearly ? "bg-royal-blue" : "bg-slate-200"}`}
                role="switch" aria-checked={isYearly}
              >
                <span className={`absolute top-0.5 left-0.5 w-6 h-6 rounded-full bg-white shadow transition-transform duration-300 ${isYearly ? "translate-x-7" : "translate-x-0"}`} />
              </button>
              <span className={`text-sm font-semibold transition-colors flex items-center gap-2 ${isYearly ? "text-charcoal-darkest" : "text-charcoal-muted"}`}>
                Yearly
                <span className="bg-green-50 text-green-700 text-[10px] font-bold px-2.5 py-1 rounded-full border border-green-200">
                  Save 15%
                </span>
              </span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Pricing Cards ─────────────────────────────── */}
      <section className="py-20 bg-surface">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto items-stretch">
            {pricingPlans.map((plan, idx) => {
              const price = isYearly ? plan.yearlyPrice : plan.monthlyPrice;
              const savings = (plan.monthlyPrice - plan.yearlyPrice) * 12;
              return (
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: idx * 0.12 }}
                  className={`relative flex flex-col rounded-3xl border transition-all duration-300 ${
                    plan.popular
                      ? "bg-charcoal-darkest border-charcoal-darkest shadow-md md:scale-105 md:z-10"
                      : "bg-white border-slate-100 shadow-sm hover:shadow-md hover:-translate-y-1"
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 inset-x-0 flex justify-center">
                      <span className="bg-accent-gold text-charcoal-darkest text-[10px] font-bold px-5 py-1.5 rounded-full shadow-lg uppercase tracking-widest">
                        Most Popular
                      </span>
                    </div>
                  )}

                  <div className="p-8 flex flex-col flex-grow">
                    {/* Plan name */}
                    <div className={`text-sm font-bold uppercase tracking-widest mb-1 ${plan.popular ? "text-royal-blue-lighter" : "text-royal-blue"}`}>
                      {plan.name}
                    </div>
                    <p className={`text-xs leading-relaxed mb-6 ${plan.popular ? "text-blue-100" : "text-charcoal-light"}`}>
                      {plan.description}
                    </p>

                    {/* Price */}
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={isYearly ? "yearly" : "monthly"}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.2 }}
                        className="flex items-end gap-1 mb-1"
                      >
                        <span className={`text-lg font-medium mb-1 ${plan.popular ? "text-blue-100" : "text-charcoal-muted"}`}>₹</span>
                        <span className={`text-5xl font-black tracking-tight ${plan.popular ? "text-white" : "text-charcoal-darkest"}`}>
                          {price.toLocaleString("en-IN")}
                        </span>
                        <span className={`text-sm mb-2 ${plan.popular ? "text-blue-200" : "text-charcoal-light"}`}>/mo</span>
                      </motion.div>
                    </AnimatePresence>
                    {isYearly && (
                      <p className={`text-xs font-semibold mb-6 ${plan.popular ? "text-blue-200" : "text-accent-green"}`}>
                        Save ₹{savings.toLocaleString("en-IN")}/year
                      </p>
                    )}
                    {!isYearly && <div className="mb-6" />}

                    <div className={`h-px w-full mb-6 ${plan.popular ? "bg-white/20" : "bg-slate-100"}`} />

                    {/* Features */}
                    <ul className="space-y-3 mb-8 flex-grow">
                      {plan.features.map((f) => (
                        <li key={f} className="flex items-start gap-2.5 text-sm">
                          <svg className={`w-4 h-4 shrink-0 mt-0.5 ${plan.popular ? "text-blue-200" : "text-royal-blue"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                          <span className={plan.popular ? "text-blue-100" : "text-charcoal-medium"}>{f}</span>
                        </li>
                      ))}
                      {plan.notIncluded?.map((f) => (
                        <li key={f} className="flex items-start gap-2.5 text-sm opacity-40">
                          <svg className={`w-4 h-4 shrink-0 mt-0.5 ${plan.popular ? "text-blue-200" : "text-slate-300"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                          <span className={`line-through ${plan.popular ? "text-blue-200" : "text-charcoal-light"}`}>{f}</span>
                        </li>
                      ))}
                    </ul>

                    <Link
                      href="/contact"
                      className={`w-full inline-flex items-center justify-center rounded-full py-3.5 text-sm font-bold tracking-wide transition-all duration-300 ${
                        plan.popular
                          ? "bg-white text-charcoal-darkest hover:bg-surface"
                          : "bg-charcoal-darkest text-white hover:bg-royal-blue shadow-sm"
                      }`}
                    >
                      {plan.cta}
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Comparison Table ──────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}
          >
            <div className="text-center mb-12">
              <span className="text-xs font-bold uppercase tracking-widest text-royal-blue">Compare Plans</span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-charcoal-darkest mt-2">Plan Comparison</h2>
            </div>
            <div className="overflow-x-auto rounded-2xl border border-slate-100 shadow-sm">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-surface border-b border-slate-100">
                    <th className="py-4 px-6 text-left text-xs font-bold text-charcoal-light uppercase tracking-wider w-1/3">Feature</th>
                    <th className="py-4 px-6 text-center text-xs font-bold text-charcoal-darkest uppercase tracking-wider">Hall Sharing</th>
                    <th className="py-4 px-6 text-center text-xs font-bold text-royal-blue uppercase tracking-wider bg-royal-blue-faint">Double Sharing</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {comparisonRows.map((row, i) => (
                    <tr key={i} className="hover:bg-surface transition-colors">
                      <td className="py-4 px-6 font-semibold text-charcoal-darkest">{row.label}</td>
                      <td className="py-4 px-6 text-center text-charcoal-muted">{row.starter}</td>
                      <td className="py-4 px-6 text-center text-royal-blue font-semibold bg-royal-blue-faint/50">{row.premium}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Food Included ─────────────────────────────── */}
      <section className="py-20 bg-surface relative overflow-hidden">
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left */}
            <motion.div
              initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.7 }}
              className="flex flex-col gap-6"
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-accent-gold/30 bg-accent-gold/10 px-4 py-1.5 text-xs font-bold tracking-widest uppercase text-accent-gold w-fit">
                🍽️ Chef Dining Included
              </span>
              <h2 className="font-display text-4xl font-normal text-charcoal-darkest leading-tight">
                Nutritious Food,<br />
                <span className="text-royal-blue">Cooked Daily.</span>
              </h2>
              <p className="text-charcoal-muted leading-relaxed font-light">
                All memberships include chef-cooked meals prepared in our centralized, hygienic hub kitchens. No grocery shopping, cooking, or cleaning required.
              </p>
              {["Weekly rotating menus", "Vegan, Vegetarian & Jain diets", "FSSAI safety-approved ingredients", "Professional chefs on staff"].map((item) => (
                <div key={item} className="flex items-center gap-3 text-sm text-charcoal-darkest">
                  <span className="w-5 h-5 rounded-full bg-accent-gold/20 border border-accent-gold/30 flex items-center justify-center text-accent-gold text-xs font-bold shrink-0">✓</span>
                  {item}
                </div>
              ))}
            </motion.div>

            {/* Right: Meal tabs */}
            <motion.div
              initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1 }}
            >
              <div className="flex border-b border-slate-200 mb-6">
                {foodMenu.map((meal) => (
                  <button
                    key={meal.id}
                    onClick={() => setActiveMeal(meal.id)}
                    className={`flex-1 pb-4 text-xs font-bold uppercase tracking-widest transition-all border-b-2 cursor-pointer ${
                      activeMeal === meal.id
                        ? "border-accent-gold text-accent-gold"
                        : "border-transparent text-slate-500 hover:text-slate-300"
                    }`}
                  >
                    <span className="text-lg block mb-1">{meal.icon}</span>
                    {meal.meal}
                  </button>
                ))}
              </div>

              <AnimatePresence mode="wait">
                {foodMenu.filter((m) => m.id === activeMeal).map((meal) => (
                  <motion.div
                    key={meal.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.25 }}
                    className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-bold text-charcoal-darkest">{meal.meal}</h3>
                      <span className="text-xs font-bold text-royal-blue bg-royal-blue-faint border border-royal-blue/20 px-3 py-1 rounded-full">
                        {meal.time}
                      </span>
                    </div>
                    <p className="text-charcoal-muted text-sm italic leading-relaxed mb-5">"{meal.description}"</p>
                    <div className="grid grid-cols-2 gap-2">
                      {meal.items.map((item) => (
                        <span key={item} className="text-xs text-charcoal-darkest bg-surface border border-slate-100 rounded-xl px-3 py-2 font-medium">
                          {item}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────── */}
      <section className="py-20 bg-white" id="faq">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-royal-blue">FAQs</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-charcoal-darkest mt-2">Common Questions</h2>
          </div>
          <div className="bg-white rounded-3xl border border-slate-100 shadow-premium divide-y divide-slate-100 px-6 md:px-10 py-2">
            {faqItems.map((faq) => {
              const isOpen = openFaq === faq.id;
              return (
                <div key={faq.id}>
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : faq.id)}
                    className="w-full flex items-center justify-between text-left py-5 gap-4 focus:outline-none group"
                  >
                    <span className="font-semibold text-charcoal-darkest group-hover:text-royal-blue transition-colors text-base">{faq.question}</span>
                    <span className={`shrink-0 w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${isOpen ? "border-royal-blue bg-royal-blue text-white rotate-45" : "border-slate-200 text-charcoal-light"}`}>
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                      </svg>
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <p className="pb-5 text-charcoal-muted leading-relaxed text-sm pr-10">{faq.answer}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

    </div>
  );
}
