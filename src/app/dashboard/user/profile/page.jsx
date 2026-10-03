'use client';

import React, { useState, useEffect, useCallback } from 'react';
import {
  FiEdit2,
  FiSave,
  FiX,
  FiMail,
  FiLoader,
  FiBookOpen,
  FiAward,
  FiUser
} from 'react-icons/fi';
import { FaCrown, FaGraduationCap } from 'react-icons/fa6';
import { authClient } from '@/lib/auth-client';
import toast, { Toaster } from 'react-hot-toast';
import { motion } from 'framer-motion';

const UserProfile = () => {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;
  
  const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:5000';

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.name || '');
  const [photoURL, setPhotoURL] = useState(user?.image || '');
  const [userLessons, setUserLessons] = useState([]);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (!user) return;
    setName(user.name || '');
    setPhotoURL(user.image || '');
  }, [user?.name, user?.image]);

  const fetchUserLessons = useCallback(async () => {
    if (!user?.email) return;
    try {
      const res = await fetch(`${serverUrl}/my-lessons/${user.email}`);
      if (res.ok) {
        const data = await res.json();
        setUserLessons(Array.isArray(data) ? data : []);
      }
    } catch (err) {
      console.error(err);
    }
  }, [user?.email, serverUrl]);

  useEffect(() => {
    fetchUserLessons();
  }, [fetchUserLessons]);

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
      toast.error('Profile update failed');
    } finally {
      setIsUpdating(false);
    }
  };

  if (isPending) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <FiLoader className="text-emerald-600 animate-spin" size={36} />
      </div>
    );
  }

  return (
    <div className="font-sans text-slate-800 space-y-8">
      <Toaster position="top-center" />

      {/* Main Profile Header Card */}
      <section className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-xs relative overflow-hidden">
        
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 relative z-10">
          
          {/* Avatar Ring Container */}
          <div className="relative">
            <div className="w-32 h-32 md:w-36 md:h-36 rounded-full overflow-hidden border-4 border-white ring-4 ring-emerald-500/20 flex items-center justify-center bg-slate-100 shadow-md">
              {photoURL ? (
                <img
                  src={photoURL}
                  alt={name || user?.name}
                  className="w-full h-full object-cover"
                  onError={() => setPhotoURL('')}
                />
              ) : (
                <span className="text-4xl font-black text-emerald-700">
                  {(name || user?.name || 'U').charAt(0).toUpperCase()}
                </span>
              )}
            </div>

            {(user?.plan === 'premium' || user?.plan === 'pro') && (
              <div className="absolute bottom-1 right-1 bg-amber-500 text-slate-950 p-2 rounded-full shadow-md border-2 border-white" title="Premium Member">
                <FaCrown className="w-4 h-4" />
              </div>
            )}
          </div>

          {/* User Info & Edit Form */}
          <div className="flex-1 text-center md:text-left w-full">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
              <span className="text-[10px] font-black uppercase tracking-widest bg-emerald-100/80 text-emerald-800 px-3 py-1 rounded-full border border-emerald-200">
                Learner Author
              </span>

              {user?.role === "admin" && (
                <span className="text-[10px] font-black uppercase tracking-widest bg-rose-100 text-rose-800 px-3 py-1 rounded-full border border-rose-200">
                  Administrator
                </span>
              )}
            </div>

            {isEditing ? (
              <div className="space-y-3 max-w-md mx-auto md:mx-0">
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 mb-1">Display Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 p-3 rounded-xl text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-500 mb-1">Avatar Image URL</label>
                  <input
                    type="text"
                    value={photoURL}
                    onChange={e => setPhotoURL(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 p-3 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                    placeholder="https://example.com/photo.jpg"
                  />
                </div>

                <div className="flex gap-2 justify-center md:justify-start pt-2">
                  <button
                    onClick={handleUpdateProfile}
                    disabled={isUpdating}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md transition cursor-pointer"
                  >
                    {isUpdating ? <FiLoader className="animate-spin" /> : <FiSave />} Save Changes
                  </button>

                  <button
                    onClick={() => {
                      setIsEditing(false);
                      setName(user?.name || '');
                      setPhotoURL(user?.image || '');
                    }}
                    className="bg-slate-100 hover:bg-slate-200 text-slate-600 px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition cursor-pointer"
                  >
                    <FiX /> Cancel
                  </button>
                </div>
              </div>
            ) : (
              <>
                <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                  {name || user?.name || "User Profile"}
                </h1>
                
                <div className="flex items-center justify-center md:justify-start gap-2 text-slate-500 text-sm mt-1 font-medium">
                  <FiMail className="w-4 h-4 text-emerald-600" />
                  <span>{user?.email}</span>
                </div>
              </>
            )}

            <hr className="my-6 border-slate-100" />

            {/* Stats Counter Grid */}
            <div className="grid grid-cols-3 gap-4 max-w-lg text-left">
              <div>
                <div className="text-2xl sm:text-3xl font-black text-slate-900">{userLessons.length}</div>
                <div className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider mt-0.5">
                  Lessons Created
                </div>
              </div>
              
              <div className="border-l border-slate-200 pl-4 sm:pl-6">
                <div className="text-2xl sm:text-3xl font-black text-slate-900">{userLessons.length * 15}</div>
                <div className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider mt-0.5">
                  Impact Points
                </div>
              </div>

              <div className="border-l border-slate-200 pl-4 sm:pl-6 flex flex-col justify-center">
                {(user?.plan === 'premium' || user?.plan === 'pro') ? (
                  <div className="flex items-center gap-1.5 text-amber-600 font-bold text-xs">
                    <FaCrown className="w-4 h-4" />
                    <span>PRO MEMBER</span>
                  </div>
                ) : (
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                    FREE MEMBER
                  </span>
                )}
              </div>
            </div>

          </div>

          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50 text-slate-700 font-bold text-xs py-2.5 px-5 rounded-2xl transition-all flex items-center gap-2 cursor-pointer shadow-xs"
            >
              <FiEdit2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Edit Profile</span>
            </button>
          )}

        </div>
      </section>

      {/* Published Works Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <FiBookOpen className="text-emerald-600" /> Published Works & Insights ({userLessons.length})
          </h2>
        </div>

        {userLessons.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {userLessons.map((lesson) => (
              <motion.div
                key={lesson._id}
                whileHover={{ y: -4 }}
                className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs flex flex-col justify-between h-full hover:border-emerald-300 transition-all"
              >
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="bg-emerald-50 text-emerald-800 text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider border border-emerald-100">
                      {lesson.category || 'General'}
                    </span>
                    
                    <span className={`text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider ${
                      lesson.accessLevel === 'premium' 
                        ? 'bg-amber-100 text-amber-800 border border-amber-200' 
                        : 'bg-slate-100 text-slate-600'
                    }`}>
                      {lesson.accessLevel || 'Free'}
                    </span>
                  </div>

                  {lesson.image && (
                    <div className="w-full h-40 rounded-2xl overflow-hidden mb-4 bg-slate-100">
                      <img src={lesson.image} alt={lesson.title} className="w-full h-full object-cover" />
                    </div>
                  )}

                  <h3 className="text-lg font-bold text-slate-900 line-clamp-2">
                    {lesson.title}
                  </h3>

                  <p className="text-slate-500 text-xs mt-2 line-clamp-2 leading-relaxed">
                    {lesson.description}
                  </p>
                </div>

                <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-400">
                  <span>❤️ {lesson.likes || 0} Likes</span>
                  <span>💬 {lesson.comments || 0} Comments</span>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="py-12 text-center bg-white border border-slate-200/80 rounded-3xl text-slate-400 text-sm font-medium">
            No published entries found in your profile repository.
          </div>
        )}
      </div>

    </div>
  );
};

export default UserProfile;