'use client';

import React, { useState, ReactNode } from 'react';
import Link from 'next/link';

export interface FAQItem {
  id: string;
  title: string;
  content: ReactNode;
}

interface FAQTabsProps {
  items: FAQItem[];
  defaultActiveId?: string;
}

export const FAQTabs = ({ items, defaultActiveId }: FAQTabsProps) => {
  const [activeId, setActiveId] = useState(defaultActiveId || items[0]?.id || '');

  const activeItem = items.find((item) => item.id === activeId) || items[0];

  return (
    <main className="mx-auto w-full max-w-7xl px-2 py-6 sm:px-6 lg:px-8">
      <section className="w-full rounded-[1.5rem] border border-slate-200 bg-white/90 px-2 shadow-sm sm:p-8">
        <header className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-center gap-4 border-b border-slate-200 pb-3">
          <div className="hidden md:block" />
          <h1 className="text-lg font-bold leading-tight text-slate-900 sm:text-xl text-center">
            Background & Frequently Asked Questions on Phosphorus
          </h1>
          <div className="flex justify-center md:justify-end">
            <Link
              href="/calculator"
              className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 active:scale-[0.98]"
            >
              Go to Calculator
            </Link>
          </div>
        </header>

        <div className="rounded-2xl p-3 text-sm text-slate-900">
          <p className="font-semibold">
            Introduction
          </p>
          <ul className="mt-1 list-none space-y-0.5 text-slate-900">
            <li>The phosphorus problem is a complex issue with many contributing factors and tools available to address it.</li>
            <li>This section covers key concepts regarding lake ecology, management solutions, and this calculator's methodology.</li>
          </ul>      
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-3 items-start">
          
          <nav aria-label="Questions navigation" className="lg:col-span-3 flex flex-col gap-2">
            {items.map((item) => {
              const isActive = item.id === activeId;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveId(item.id)}
                  className={`w-full text-left px-3.5 py-2.5 rounded-xl font-medium text-xs sm:text-sm transition-all duration-150 border ${
                    isActive
                      ? 'bg-white text-slate-900 border-blue-600 shadow-sm font-semibold'
                      : 'bg-white text-slate-700 border-slate-200/80 hover:bg-slate-50 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span>{item.title}</span>
                  </div>
                </button>
              );
            })}
          </nav>

          <article className="lg:col-span-9 bg-white rounded-2xl p-6 sm:p-8 min-h-[350px]">
            {activeItem && (
              <div>
                <h2 className="text-xl font-bold text-slate-900 mb-4 border-b border-slate-200/80 pb-3">
                  {activeItem.title}
                </h2>
                <div className="text-slate-700 text-sm sm:text-base leading-relaxed space-y-4">
                  {activeItem.content}
                </div>
              </div>
            )}
          </article>

        </div>
      </section>
    </main>
  );
};