/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, BookOpen, User, Calendar, Clock, ChevronLeft, HelpCircle } from 'lucide-react';
import { AdvicePost, AccessibilityConfig } from '../types';
import { blogData } from '../data/veterinaryData';

interface AdviceBlogSectionProps {
  accessConfig: AccessibilityConfig;
}

export default function AdviceBlogSection({ accessConfig }: AdviceBlogSectionProps) {
  const [activeCategory, setActiveCategory] = useState<'all' | 'nutrition' | 'safety' | 'wellness'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPost, setSelectedPost] = useState<AdvicePost | null>(null);

  // Filters post lists based on search string and active category
  const filteredPosts = blogData.filter((post) => {
    const matchesCategory = activeCategory === 'all' || post.category === activeCategory;
    const matchesQuery = 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      post.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesQuery;
  });

  const categories = [
    { id: 'all', label: 'All Articles' },
    { id: 'safety', label: 'Safety & Toxicoses' },
    { id: 'nutrition', label: 'Nutrition & Diets' },
    { id: 'wellness', label: 'Feline & Canine Habits' },
  ] as const;

  return (
    <section 
      id="advice-blog-section" 
      className="py-20 px-6 max-w-7xl mx-auto"
      aria-labelledby="blog-title"
    >
      <AnimatePresence mode="wait">
        {!selectedPost ? (
          // General Knowledge Base Directory
          <motion.div
            key="directory"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-12"
          >
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className={`text-xs font-semibold tracking-widest uppercase py-1 px-3.5 rounded-full ${
                accessConfig.highContrast
                  ? 'bg-black text-white border border-white'
                  : 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300'
              }`}>
                Patient Advice & Guidance
              </span>
              <h2 
                id="blog-title" 
                className={`font-sans font-extrabold tracking-tight mt-4 transition-all ${
                  accessConfig.highContrast ? 'text-white text-5xl font-black' : 'text-slate-900 dark:text-white text-4xl sm:text-5xl'
                }`}
                style={{ fontSize: `${1.1 * accessConfig.fontSizeMultiplier}em` }}
              >
                Clinician's Advice & Care Staging
              </h2>
              <p className={`mt-4 text-base ${accessConfig.highContrast ? 'text-slate-200' : 'text-slate-500 dark:text-slate-400'}`}>
                Explore helpful articles written directly by our veterinary clinical directors to support safe, 
                nourishing, and stress-free pet ownership in urban Philadelphia.
              </p>
            </div>

            {/* Quick search and categories filter bar */}
            <div className="flex flex-col md:flex-row items-center gap-4 justify-between max-w-5xl mx-auto">
              {/* Category Pills */}
              <div 
                className="flex flex-wrap gap-1.5 order-2 md:order-1"
                role="tablist"
                aria-label="Filter patient advice articles"
              >
                {categories.map((cat) => {
                  const isActive = activeCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => setActiveCategory(cat.id)}
                      className={`px-3.5 py-1.5 rounded-full font-bold text-xs transition-all ${
                        isActive
                          ? accessConfig.highContrast
                            ? 'bg-white text-black font-extrabold ring-2 ring-white'
                            : 'bg-emerald-600 text-white'
                          : accessConfig.highContrast
                          ? 'border border-slate-700 text-white bg-transparent hover:border-white'
                          : 'bg-slate-50 hover:bg-slate-100 dark:bg-slate-900/60 dark:hover:bg-slate-900 text-slate-500 dark:text-slate-400'
                      }`}
                    >
                      {cat.label}
                    </button>
                  );
                })}
              </div>

              {/* Accessible Search Input */}
              <div className="relative w-full md:w-80 order-1 md:order-2">
                <label htmlFor="advice-search-input" className="sr-only">Search help articles by topic or keywords</label>
                <div className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none text-slate-400">
                  <Search className="w-4 h-4" />
                </div>
                <input
                  id="advice-search-input"
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search articles, food hazards..."
                  className={`w-full py-2 pl-10 pr-4 text-xs font-semibold rounded-full outline-none transition-all ${
                    accessConfig.highContrast
                      ? 'bg-black text-white border-2 border-white focus:ring-2 focus:ring-white'
                      : 'bg-slate-50 focus:bg-white dark:bg-slate-900/60 dark:focus:bg-slate-900 border border-slate-100 dark:border-slate-800 focus:ring-2 focus:ring-emerald-500/20'
                  }`}
                  aria-label="Search advice and blog articles"
                />
              </div>
            </div>

            {/* Articles Directory Container */}
            {filteredPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {filteredPosts.map((post) => (
                  <motion.article
                    key={post.id}
                    layout
                    whileHover={{ y: -4 }}
                    onClick={() => {
                      setSelectedPost(post);
                      // Scroll to top of section for comfort reading
                      document.getElementById('advice-blog-section')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className={`cursor-pointer group rounded-2xl border overflow-hidden p-0 flex flex-col justify-between transition-all duration-300 ${
                      accessConfig.highContrast
                        ? 'bg-slate-950 text-white border-2 border-white'
                        : 'bg-white dark:bg-slate-900/40 border-slate-100 dark:border-slate-800/60 hover:border-emerald-500/15'
                    }`}
                    aria-label={`Article: ${post.title}. Read time: ${post.readTime}`}
                  >
                    <div>
                      {/* Image Preview with overlay on hover */}
                      <div className="h-44 w-full overflow-hidden relative">
                        <img
                          src={post.imageUrl}
                          alt={post.title}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
                        />
                        <div className="absolute top-3 left-3 px-2 py-0.5 rounded text-3xs font-bold tracking-wider bg-slate-900/90 text-emerald-400 backdrop-blur-md uppercase">
                          {post.category}
                        </div>
                      </div>

                      {/* Header metrics */}
                      <div className="p-5 pb-0">
                        <div className="flex items-center gap-3.5 mb-2 text-3xs font-semibold text-slate-400">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {post.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {post.readTime}
                          </span>
                        </div>

                        <h3 className="font-sans font-extrabold text-base leading-snug group-hover:text-emerald-500 transition-colors mb-2">
                          {post.title}
                        </h3>

                        <p className={`text-2xs sm:text-xs leading-relaxed line-clamp-3 mb-4 ${
                          accessConfig.highContrast ? 'text-slate-300' : 'text-slate-500 dark:text-slate-400'
                        }`}>
                          {post.summary}
                        </p>
                      </div>
                    </div>

                    <div className="p-5 pt-0 mt-auto">
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {post.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="text-4xs font-bold py-0.5 px-2.5 rounded-full bg-slate-100 text-slate-500 dark:bg-slate-850 dark:text-slate-400 uppercase tracking-wilder"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400 group-hover:gap-2.5 transition-all">
                        <span>Read Chapter</span>
                        <BookOpen className="w-4 h-4 shrink-0" />
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <HelpCircle className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <p className="text-sm font-semibold text-slate-400">No matching help chapters found. Try another diagnostic word.</p>
              </div>
            )}
          </motion.div>
        ) : (
          // Immersive Distraction-Free Article Reading Mode
          <motion.div
            key="chapter-reader"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className={`max-w-4xl mx-auto rounded-3xl overflow-hidden shadow-xl border ${
              accessConfig.highContrast
                ? 'bg-black text-white border-2 border-white'
                : 'bg-white dark:bg-slate-900 border-slate-150/40 dark:border-slate-800'
            }`}
          >
            {/* Header / Return Controller */}
            <div className="p-4 sm:p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <button
                onClick={() => setSelectedPost(null)}
                className="flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-emerald-500 transition-colors"
                aria-label="Return to index directory of advice posts"
              >
                <ChevronLeft className="w-4.5 h-4.5" />
                Directory List
              </button>
              <span className="text-2xs font-bold text-slate-400 uppercase tracking-widest font-mono">Clinician Chapter</span>
            </div>

            {/* Immersive Image Header banner */}
            <div className="h-64 sm:h-96 w-full relative">
              <img
                src={selectedPost.imageUrl}
                alt={selectedPost.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover brightness-[0.85]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 sm:left-10 pr-6">
                <span className="px-2.5 py-0.5 rounded text-3xs font-extrabold tracking-widest bg-emerald-600 text-white uppercase block mb-2 w-max">
                  {selectedPost.category}
                </span>
                <h1 className="font-sans font-black text-xl sm:text-3xl text-white leading-tight tracking-tight drop-shadow-sm">
                  {selectedPost.title}
                </h1>
              </div>
            </div>

            {/* Authoring & Publishing Logs */}
            <div className="p-6 sm:p-10 pb-0 flex flex-wrap gap-4 sm:gap-6 items-center border-b border-slate-100 dark:border-slate-800 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-emerald-500 font-bold font-sans">
                  {selectedPost.author.split(' ').map((n) => n[0]).join('')}
                </div>
                <span className="font-bold text-slate-700 dark:text-slate-300">{selectedPost.author}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4.5 h-4.5 text-slate-400" />
                <span>{selectedPost.date}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4.5 h-4.5 text-slate-400" />
                <span>{selectedPost.readTime} Reading Span</span>
              </div>
            </div>

            {/* Structured Paragraph Content */}
            <div className="p-6 sm:p-10 space-y-6 sm:space-y-8">
              {selectedPost.content.map((paragraph, idx) => (
                <p
                  key={idx}
                  className={`text-sm sm:text-base leading-relaxed text-justify ${
                    accessConfig.highContrast ? 'text-slate-100' : 'text-slate-650 dark:text-slate-350'
                  }`}
                  style={{ textIndent: idx > 0 ? '1em' : '0em' }}
                >
                  {paragraph}
                </p>
              ))}

              {/* Tag and back to directory block */}
              <div className="pt-6 sm:pt-8 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row gap-4 items-center justify-between">
                <div className="flex flex-wrap gap-1.5">
                  {selectedPost.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-3xs font-semibold py-1 px-3 rounded-full bg-slate-50 border border-slate-100 text-slate-500 dark:bg-slate-850 dark:border-slate-800 dark:text-slate-400"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => {
                    setSelectedPost(null);
                    document.getElementById('advice-blog-section')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={`px-5 py-2 rounded-full font-bold text-xs transition-all ${
                    accessConfig.highContrast
                      ? 'bg-white text-black ring-2 ring-white'
                      : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                  }`}
                  aria-label="Return to general directories"
                >
                  Back to Directory
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
