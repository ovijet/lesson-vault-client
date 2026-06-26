'use client';

import React, { useState, useEffect } from 'react';
import {
  FiEdit2,
  FiSave,
  FiX,
  FiMail,
  FiLoader,
} from 'react-icons/fi';
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
      <div className="min-h-screen bg-[#2A4D38] flex items-center justify-center">
        <FiLoader className="text-white animate-spin" size={40} />
      </div>
    );
  }

  return (
    <div className="min-h-screen text-[#1E3326] p-4 md:p-12 font-sans selection:bg-[#2A4D38] selection:text-white">
      <Toaster position="top-center" />
      
      <div className="max-w-6xl mx-auto">
        
        {/* --- PROFILE HEADER CARD ({66806E26-8106-4445-B90A-F2B4322CB305}_2.jpg এর মতো বড় রাউন্ডেড হোয়াইট বক্স) --- */}
        <section className="bg-white rounded-[35px] p-8 md:p-12 mb-12 shadow-xl relative">
          
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8 relative z-10">
            
            {/* ছবির মতো বড় ডাবল বর্ডার ক্রাউন ব্যাজসহ অ্যাভাটার */}
            <div className="relative">
              <div className="w-36 h-36 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-white ring-4 ring-[#ECEBE9] flex items-center justify-center bg-[#F7F6F4] shadow-md">
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
                  <span className="text-4xl font-serif text-[#2A4D38] font-bold">
                    {(name || user?.name || 'A').slice(0, 1).toUpperCase()}
                  </span>
                )}
              </div>
              {/* গ্রিন সার্কেল ক্রাউন ব্যাজ (ছবির মতো হুবহু প্লেসমেন্ট) */}
              {user?.plan === 'premium' && (
                <div className="absolute bottom-1 right-2 bg-[#2A4D38] border-2 border-white p-2 rounded-full text-white shadow-md">
                  <CrownIcon className="w-4 h-4" fill="currentColor" />
                </div>
              )}
            </div>

            {/* ইউজার ইনফো এবং এডিট ফর্ম */}
            <div className="flex-grow text-center md:text-left mt-2 w-full md:w-auto">
              <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-[#A3B2A4] block mb-1">
                THE AUTHOR
              </span>

              {isEditing ? (
                <div className="space-y-3 max-w-sm mx-auto md:mx-0">
                  <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="w-full bg-[#F4F6F4] border border-[#E1E5E1] p-2.5 rounded-xl outline-none focus:border-[#2A4D38] text-sm font-serif text-[#1E3326]"
                    placeholder="Update Name"
                  />
                  <input
                    type="text"
                    value={photoURL}
                    onChange={e => setPhotoURL(e.target.value)}
                    className="w-full bg-[#F4F6F4] border border-[#E1E5E1] p-2.5 rounded-xl outline-none focus:border-[#2A4D38] text-sm text-[#1E3326]"
                    placeholder="Photo URL"
                  />
                  <div className="flex gap-2 justify-center md:justify-start">
                    <button
                      onClick={handleUpdateProfile}
                      disabled={isUpdating}
                      className="bg-[#2A4D38] text-white px-4 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1 hover:bg-[#1E3326] transition-all"
                    >
                      {isUpdating ? <FiLoader className="animate-spin" /> : <FiSave />} Save
                    </button>
                    <button
                      onClick={() => {
                        setIsEditing(false);
                        setName(user?.name || '');
                        setPhotoURL(user?.image || '');
                      }}
                      className="border border-[#E1E5E1] text-[#7A8A7D] px-4 py-1.5 rounded-full text-xs font-semibold hover:bg-gray-50 flex items-center gap-1"
                    >
                      <FiX /> Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#1E3326] tracking-tight">
                    {name || user?.name}
                  </h1>
                  
                  <div className="flex items-center justify-center md:justify-start gap-2 text-[#7A8A7D] text-sm mt-2 font-medium">
                    <FiMail className="w-4 h-4" />
                    <span>{user?.email}</span>
                  </div>
                </>
              )}

              {/* ডিভাইডার লাইন */}
              <div className="border-t border-[#F0EFEF] my-6 w-full"></div>

              {/* স্ট্যাটস এরিয়া (৩ কলাম গ্রিড কাউন্টারসহ) */}
              <div className="grid grid-cols-3 gap-4 max-w-xl text-left md:mx-0">
                <div>
                  <div className="text-3xl font-serif font-bold text-[#1E3326]">{userLessons.length}</div>
                  <div className="text-[9px] font-mono font-bold text-[#A3B2A4] uppercase tracking-wider mt-0.5">
                    LESSONS CREATED
                  </div>
                </div>
                
                <div className="border-l border-[#ECEBE9] pl-6">
                  <div className="text-3xl font-serif font-bold text-[#1E3326]">0</div>
                  <div className="text-[9px] font-mono font-bold text-[#A3B2A4] uppercase tracking-wider mt-0.5">
                    WISDOM SAVED
                  </div>
                </div>

                <div className="border-l border-[#ECEBE9] pl-6 flex flex-col justify-center">
                  {user?.plan === 'premium' ? (
                    <div className="flex items-center gap-1.5 text-[#2A4D38]">
                      <CrownIcon className="w-5 h-5 text-[#8BA493]" fill="currentColor" />
                      <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-[#8BA493] mt-1">
                        PREMIUM MEMBER
                      </span>
                    </div>
                  ) : (
                    <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-[#A3B2A4]">
                      FREE MEMBER
                    </span>
                  )}
                </div>
              </div>

            </div>

            {/* ছবির মতো ডান পাশের মিনিমালিস্ট "Edit Profile" বাটন */}
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="md:absolute md:top-12 md:right-12 border border-[#E1E5E1] hover:border-[#2A4D38] hover:bg-[#F4F6F4] text-[#55665A] font-semibold text-xs py-2.5 px-5 rounded-full transition-all flex items-center gap-1.5"
              >
                <FiEdit2 className="w-3 h-3" />
                <span>Edit Profile</span>
              </button>
            )}

          </div>
        </section>

        {/* --- SECTION TITLE (ছবির মতো পাতার আইকনসহ ডার্ক গ্রিন হেডিং) --- */}
        <div className="flex items-center gap-2 mb-8 text-white">
          <div className="bg-[#1E3326] p-2 rounded-lg text-[#A6C0AF]">
            <LeafIcon className="w-4 h-4" />
          </div>
          <h2 className="text-3xl font-serif font-bold tracking-tight text-green-900">
            Published Works
          </h2>
        </div>

        {/* --- LESSONS GRID (কার্ডের ডিজাইন ট্যাগসহ) --- */}
        {userLessons.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {userLessons.map((lesson) => (
              <motion.div
                key={lesson._id}
                whileHover={{ y: -6 }}
                className="bg-white rounded-[28px] p-6 shadow-md flex flex-col justify-between h-full group transition-all"
              >
                <div>
                  {/* ব্যাজ রো (যেমন ছবিতে আছে: CAREER / FREE) */}
                  <div className="flex justify-between items-center mb-4">
                    <span className="bg-[#E4ECE7] text-[#2A4D38] text-[10px] font-mono font-bold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1">
                      ✦ {lesson.category || 'General'}
                    </span>
                    
                    <span className={`text-[10px] font-mono font-bold px-3 py-1 rounded-full uppercase tracking-wider ${
                      lesson.accessLevel === 'Premium' 
                        ? 'bg-[#E3A834] text-white' 
                        : 'bg-[#E4ECE7] text-[#2A4D38]'
                    }`}>
                      {lesson.accessLevel || 'Free'}
                    </span>
                  </div>

                  {/* লেসন ইমেজ (অপশনাল থাম্বনেইল) */}
                  {lesson.image && (
                    <div className="w-full h-40 rounded-2xl overflow-hidden mb-4 bg-gray-100">
                      <img src={lesson.image} alt={lesson.title} className="w-full h-full object-cover" />
                    </div>
                  )}

                  {/* টাইটেল */}
                  <h3 className="text-xl font-serif font-bold text-[#1E3326] group-hover:text-[#2A4D38] transition-colors line-clamp-2">
                    {lesson.title}
                  </h3>
                </div>

                <p className="text-xs font-mono text-[#7A8A7D] mt-4 flex items-center gap-1">
                  Updated Archive
                </p>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="py-16 text-center border-2 border-dashed border-[#4B7059] rounded-[28px] text-[#A6C0AF] font-mono text-sm uppercase tracking-widest">
            No published entries found in your archive.
          </div>
        )}
        
      </div>
    </div>
  );
};

export default UserProfile;