'use client';

import React, { useState, useEffect } from 'react';
import { authClient } from '@/lib/auth-client';
import { FiHeart, FiTrash2, FiArrowRight, FiCalendar, FiLoader } from 'react-icons/fi';
import toast, { Toaster } from 'react-hot-toast';

const SavedCollection = () => {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;
  const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:5000';

  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // ফিল্টারের জন্য স্টেট
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedTone, setSelectedTone] = useState('All Tones');

  // ডাটাবেজ থেকে ফেভারিট ডাটা তুলে আনা (আগের GET route অনুযায়ী)
  const fetchFavorites = async () => {
    if (!user?.email) return;
    try {
      const res = await fetch(`${serverUrl}/my-favorites/${user.email}`);
      const data = await res.json();
      setFavorites(data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load collection");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchFavorites();
    }
  }, [user]);

  // ট্র্যাশ বা ডিলিট বাটনে ক্লিক করলে রিমুভ করার ফাংশন (POST route অনুযায়ী)
  const handleRemoveFavorite = async (lessonId) => {
    try {
      const res = await fetch(`${serverUrl}/add-to-favorites`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userEmail: user.email,
          lessonId: lessonId,
        }),
      });

      if (res.ok) {
        toast.success("Removed from collection");
        // ডিলিট করার পর লিস্ট রিফ্রেশ করা
        fetchFavorites();
      }
    } catch (error) {
      toast.error("Could not remove item");
    }
  };

  if (isPending || isLoading) {
    return (
      <div className="min-h-screen bg-[#EAEFEA] flex items-center justify-center">
        <FiLoader className="text-[#2A4D38] animate-spin" size={40} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#EAEFEA] text-[#1E3326] p-6 md:p-12 font-sans">
      <Toaster position="top-center" />
      
      <div className="max-w-6xl mx-auto">
        
        {/* --- HEADER SECTION ({1B0A56D4-CC84-40F7-A16C-D76D105F4DE6}.jpg এর মতো) --- */}
        <header className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-[#E2ECE2] p-2.5 rounded-xl text-[#2A4D38]">
              <FiHeart className="w-6 h-6 fill-current text-[#2A4D38]" />
            </div>
            <h1 className="text-4xl font-serif font-bold text-[#1E3326]">Saved Collection</h1>
          </div>
          <p className="text-sm text-[#55665A] font-medium">
            Your personal index of wisdom. You have bookmarked <span className="font-bold text-[#1E3326]">{favorites.length}</span> entries.
          </p>
        </header>

        {/* --- FILTER DROPDOWNS --- */}
        <div className="flex flex-wrap gap-4 mb-8">
          <select 
            value={selectedCategory} 
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-white border border-[#D1DDD1] text-sm text-[#1E3326] font-medium py-2.5 px-4 rounded-xl outline-none shadow-sm cursor-pointer min-w-[160px]"
          >
            <option>All Categories</option>
            <option>Career</option>
            <option>Personal Growth</option>
          </select>

          <select 
            value={selectedTone} 
            onChange={(e) => setSelectedTone(e.target.value)}
            className="bg-white border border-[#D1DDD1] text-sm text-[#1E3326] font-medium py-2.5 px-4 rounded-xl outline-none shadow-sm cursor-pointer min-w-[140px]"
          >
            <option>All Tones</option>
            <option>Professional</option>
            <option>Casual</option>
          </select>
        </div>

        {/* --- TABLE CONTAINER BOX --- */}
        {favorites.length > 0 ? (
          <div className="bg-white rounded-[32px] shadow-sm border border-[#E2ECE2] overflow-hidden">
            
            {/* টেবিল হেডার রো */}
            <div className="grid grid-cols-12 bg-[#FBFDFB] px-8 py-4 border-b border-[#F0EFEF] text-[11px] font-bold text-[#A3B2A4] tracking-wider uppercase">
              <div className="col-span-5">Wisdom Context</div>
              <div className="col-span-3">Author</div>
              <div className="col-span-2">Saved Date</div>
              <div className="col-span-2 text-right pr-4">Actions</div>
            </div>

            {/* টেবিল বডি ডাটা লিস্ট */}
            <div className="divide-y divide-[#F0EFEF]">
              {favorites.map((lesson) => (
                <div key={lesson._id} className="grid grid-cols-12 px-8 py-5 items-center hover:bg-[#F9FBF9] transition-colors">
                  
                  {/* ১. WISDOM CONTEXT (লেসনের ছবি ও টাইটেল) */}
                  <div className="col-span-5 flex items-center gap-4">
                    <div className="w-20 h-14 bg-gray-100 border border-gray-200/60 rounded-xl overflow-hidden flex-shrink-0">
                      <img 
                        src={lesson.image || 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=200'} 
                        alt={lesson.title} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold font-mono text-[#A3B2A4] uppercase tracking-wide block">
                        LESSON
                      </span>
                      <h3 className="text-base font-serif font-bold text-[#1E3326] line-clamp-1 mt-0.5">
                        {lesson.title}
                      </h3>
                    </div>
                  </div>

                  {/* ২. AUTHOR INFO */}
                  <div className="col-span-3 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-[#ECEBE9] overflow-hidden border border-gray-100 shadow-sm flex items-center justify-center">
                      <img 
                        src={user?.image || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100'} 
                        alt="author" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-[#1E3326] leading-tight">{user?.name || 'Admin'}</div>
                      <div className="text-xs text-[#7A8A7D]">{user?.email || 'admin@gmail.com'}</div>
                    </div>
                  </div>

                  {/* ৩. SAVED DATE (ছবিতে যেমন সুন্দর বক্সে আছে) */}
                  <div className="col-span-2">
                    <div className="inline-flex items-center gap-1.5 bg-white border border-[#E2ECE2] rounded-xl px-3 py-1.5 shadow-sm text-xs font-semibold text-[#55665A]">
                      <FiCalendar className="text-gray-300" />
                      <span>
                        {lesson.createdAt ? new Date(lesson.createdAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        }) : 'Jun 27, 2026'}
                      </span>
                    </div>
                  </div>

                  {/* ৪. ACTIONS (ডান পাশের রাউন্ডেড গোল বাটনসমূহ) */}
                  <div className="col-span-2 flex items-center justify-end gap-2 pr-2">
                    {/* ডিটেইলসে যাওয়ার বাটন */}
                    <button className="w-9 h-9 flex items-center justify-center rounded-full bg-[#1E3326] text-white hover:bg-[#2A4D38] shadow-sm transition-all">
                      <FiArrowRight className="w-4 h-4" />
                    </button>

                    {/* ডিলিট বাটন */}
                    <button 
                      onClick={() => handleRemoveFavorite(lesson._id)}
                      className="w-9 h-9 flex items-center justify-center rounded-full bg-white border border-[#E2ECE2] text-[#7A8A7D] hover:text-red-500 hover:border-red-200 shadow-sm transition-all"
                    >
                      <FiTrash2 className="w-4 h-4" />
                    </button>
                  </div>

                </div>
              ))}
            </div>

          </div>
        ) : (
          /* কালেকশন খালি থাকলে যা দেখাবে */
          <div className="py-20 text-center bg-white rounded-[32px] border-2 border-dashed border-[#C2D1C2] text-[#7A8A7D] font-mono text-sm uppercase tracking-widest">
            Your collection index is empty.
          </div>
        )}

      </div>
    </div>
  );
};

export default SavedCollection;