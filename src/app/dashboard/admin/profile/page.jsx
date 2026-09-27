'use client';

import React, { useState, useEffect } from 'react';
import {
  FiEdit2,
  FiSave,
  FiX,
  FiMail,
  FiLoader,
  FiBookOpen,
  FiShield,
  FiArrowRight,
} from 'react-icons/fi';
import { FaCrown, FaShieldAlt } from 'react-icons/fa';
import { authClient } from '@/lib/auth-client';
import toast, { Toaster } from 'react-hot-toast';
import { motion } from 'framer-motion';

const CrownIcon = ({ className = "w-5 h-5", fill = "currentColor" }) => (
  <svg className={className} viewBox="0 0 24 24" fill={fill} xmlns="http://www.w3.org/2000/svg">
    <path d="M2 4L5 12L12 6L19 12L22 4L17 18H7L2 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const LeafIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 22C2 22 8 22 12 18C16 14 19 8 22 2C22 2 16 5 12 9C8 13 2 19 2 22Z" />
    <path d="M12 9L2 2" />
  </svg>
);

const UserProfile = () => {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;
  
  const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:5000';

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('');
  const [photoURL, setPhotoURL] = useState('');
  const [userLessons, setUserLessons] = useState([]);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (!user) return;

    setName(user.name || '');
    setPhotoURL(user.image || '');

    fetch(`${serverUrl}/my-lessons/${user.email}`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load lessons');
        return res.json();
      })
      .then((data) => setUserLessons(data))
      .catch((err) => {
        console.error(err);
        toast.error('Could not load your archive');
      });
  }, [user, serverUrl]);

  const handleUpdateProfile = async () => {
    if (!name.trim()) {
      toast.error("Name cannot be empty");
      return;
    }

    setIsUpdating(true);
    try {
      const res = await fetch(`${serverUrl}/admin/profile/update/${user.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, image: photoURL }),
      });

      if (res.ok) {
        toast.success('Profile updated successfully');
        setIsEditing(false);
      } else {
        throw new Error('Update failed');
      }
    } catch (err) {
      console.error(err);
      toast.error('Archive sync failed');
    } finally {
      setIsUpdating(false);
    }
  };

  if (isPending) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8 font-sans">
      <Toaster position="top-center" />
      
      <div className="max-w-6xl mx-auto">
        
        {/* --- PROFILE HEADER CARD (Admin Hub স্টাইল গ্রাডিয়েন্ট ও ডিজাইন) --- */}
        <section className="bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 rounded-3xl p-8 sm:p-10 text-white shadow-xl relative overflow-hidden border border-emerald-900/50 mb-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col md:flex-row items-center md:items-start gap-8 relative z-10">
            
            {/* অ্যাভাটার এবং ক্রাউন ব্যাজ */}
            <div className="relative">
              <div className="w-36 h-36 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-emerald-500/30 ring-4 ring-slate-900 flex items-center justify-center bg-slate-800 shadow-xl">
                {photoURL ? (
                  <img
                    src={photoURL}
                    alt={name || user?.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      setPhotoURL('');
                    }}
                  />
                ) : (
                  <span className="text-4xl font-serif text-emerald-400 font-bold">
                    {(name || user?.name || 'A').slice(0, 1).toUpperCase()}
                  </span>
                )}
              </div>
              
              {user?.plan === 'premium' && (
                <div className="absolute bottom-1 right-2 bg-amber-500 border-2 border-slate-900 p-2 rounded-full text-slate-950 shadow-md">
                  <FaCrown className="w-4 h-4" />
                </div>
              )}
            </div>

            {/* ইউজার ইনফো এবং এডিট ফর্ম */}
            <div className="flex-grow text-center md:text-left mt-2 w-full md:w-auto">
              <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold px-3 py-1 rounded-full inline-flex items-center gap-1 mb-3">
                {/* <FiActivity /> THE AUTHOR PROFILE */}
              </span>

              {isEditing ? (
                <div className="space-y-3 max-w-sm mx-auto md:mx-0 mt-3">
                  <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 p-2.5 rounded-xl outline-none focus:border-emerald-500 text-sm font-serif text-white"
                    placeholder="Update Name"
                  />
                  <input
                    type="text"
                    value={photoURL}
                    onChange={e => setPhotoURL(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 p-2.5 rounded-xl outline-none focus:border-emerald-500 text-sm text-white"
                    placeholder="Photo URL"
                  />
                  <div className="flex gap-2 justify-center md:justify-start">
                    <button
                      onClick={handleUpdateProfile}
                      disabled={isUpdating}
                      className="bg-emerald-500 text-slate-950 px-4 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1 hover:bg-emerald-400 transition-all cursor-pointer"
                    >
                      {isUpdating ? <FiLoader className="animate-spin" /> : <FiSave />} Save
                    </button>
                    <button
                      onClick={() => {
                        setIsEditing(false);
                        setName(user?.name || '');
                        setPhotoURL(user?.image || '');
                      }}
                      className="border border-slate-700 text-slate-300 px-4 py-1.5 rounded-xl text-xs font-bold hover:bg-white/10 flex items-center gap-1 cursor-pointer"
                    >
                      <FiX /> Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                    {name || user?.name}
                  </h1>
                  
                  <div className="flex items-center justify-center md:justify-start gap-2 text-slate-300 text-sm mt-2 font-medium">
                    <FiMail className="w-4 h-4 text-emerald-400" />
                    <span>{user?.email}</span>
                  </div>
                </>
              )}

              {/* ডিভাইডার লাইন */}
              <div className="border-t border-emerald-900/50 my-6 w-full"></div>

              {/* স্ট্যাটস এরিয়া (কার্ড স্টাইল স্ট্যাটস) */}
              <div className="grid grid-cols-3 gap-4 max-w-xl text-left">
                <div className="bg-white/5 border border-white/10 p-4 rounded-2xl">
                  <div className="text-2xl sm:text-3xl font-black text-white">{userLessons.length}</div>
                  <div className="text-[10px] font-extrabold text-emerald-400 uppercase tracking-wider mt-1">
                    Lessons Created
                  </div>
                </div>
                
                <div className="bg-white/5 border border-white/10 p-4 rounded-2xl">
                  <div className="text-2xl sm:text-3xl font-black text-white">0</div>
                  <div className="text-[10px] font-extrabold text-emerald-400 uppercase tracking-wider mt-1">
                    Wisdom Saved
                  </div>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-2xl flex flex-col justify-center">
                  {user?.plan === 'premium' ? (
                    <div className="flex items-center gap-1.5 text-amber-400">
                      <FaCrown className="w-4 h-4" />
                      <span className="text-[10px] font-black uppercase tracking-wider">
                        Pro Member
                      </span>
                    </div>
                  ) : (
                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                      Free Member
                    </span>
                  )}
                </div>
              </div>

            </div>

            {/* ডান পাশের এডিট বাটন */}
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="md:absolute md:top-10 md:right-10 bg-white/10 hover:bg-white/20 text-white font-bold text-xs py-2.5 px-5 rounded-2xl border border-white/20 transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <FiEdit2 className="w-3.5 h-3.5" />
                <span>Edit Profile</span>
              </button>
            )}

          </div>
        </section>

        {/* --- SECTION TITLE --- */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center text-xl shadow-xs">
            <FiBookOpen />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              Published Works
            </h2>
            <p className="text-xs text-slate-500">Your created lessons archive</p>
          </div>
        </div>

        {/* --- LESSONS GRID --- */}
        {userLessons.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {userLessons.map((lesson) => (
              <motion.div
                key={lesson._id}
                whileHover={{ y: -4 }}
                className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs hover:shadow-xl hover:border-emerald-300 transition-all flex flex-col justify-between h-full group"
              >
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="bg-emerald-50 text-emerald-700 border border-emerald-100 text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                      {lesson.category || 'General'}
                    </span>
                    
                    <span className={`text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider ${
                      lesson.accessLevel === 'Premium' 
                        ? 'bg-purple-100 text-purple-800' 
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {lesson.accessLevel || 'Free'}
                    </span>
                  </div>

                  {lesson.image && (
                    <div className="w-full h-40 rounded-2xl overflow-hidden mb-4 bg-slate-100 border border-slate-100">
                      <img src={lesson.image} alt={lesson.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                  )}

                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-600 transition-colors line-clamp-2">
                    {lesson.title}
                  </h3>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400 font-semibold">
                  <span>Updated Archive</span>
                  <span className="text-emerald-600 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    View <FiArrowRight />
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="py-16 text-center bg-white border border-slate-200/80 rounded-3xl text-slate-400 font-medium text-sm">
            No published entries found in your archive.
          </div>
        )}
        
      </div>
    </div>
  );
};

export default UserProfile;