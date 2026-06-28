"use client";

import { useEffect, useMemo, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast, Toaster } from "react-hot-toast";
import ReportTable from "@/app/components/ReportTable";
import InvestigationModal from "@/app/components/InvestigationModal";
import ConfirmationModal from "@/app/components/ConfirmationModal";


export default function ReportedLessonsPage() {
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();

  const [reports, setReports] = useState([]);
  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);

  const [selected, setSelected] = useState(null);

  const [confirm, setConfirm] = useState({
    open: false,
    type: "",
    lesson: null,
  });

  useEffect(() => {
    if (!isPending && !session) {
      router.replace("/signin");
    }
  }, [session, isPending]);

  const fetchReports = async () => {
    try {
      setLoading(true);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/admin/reported-lessons`
      );

      const data = await res.json();
      
      // ✅ সেফটি চেক: যদি ডেটা অ্যারে হয় তবেই সেটে বসবে, নয়তো খালি অ্যারে হবে
      if (Array.isArray(data)) {
        setReports(data);
      } else {
        setReports([]);
      }
    } catch (err) {
      console.error("Fetch Error:", err);
      toast.error("Unable to load reports");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  // ২. সার্চ ফিল্টারিং আপডেট 
  const filtered = useMemo(() => {
    // reports অ্যারে না হলে ক্র্যাশ এড়াতে সেফ গার্ড
    if (!Array.isArray(reports)) return [];
    
    return reports.filter((item) => {
      const currentTitle = item.lessonTitle || item.title || "";
      return currentTitle.toLowerCase().includes(search.toLowerCase());
    });
  }, [reports, search]);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <Toaster position="top-center"/>

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between gap-5 mb-8">
        <div>
          <h1 className="text-4xl font-bold text-gray-800">
            Reported Lessons
          </h1>
          <p className="text-gray-500 mt-2">
            Review community reports and moderate content.
          </p>
        </div>

        <input
          value={search}
          onChange={(e)=>setSearch(e.target.value)}
          placeholder="Search lesson..."
          className="w-full md:w-80 border rounded-xl px-4 py-3 bg-white outline-none"
        />
      </div>

      {/* ✅ ৩. টেবিল এবং মডালগুলোর কমেন্ট পুরোপুরি তুলে দেওয়া হলো */}
      <ReportTable
        reports={filtered}
        loading={loading}
        onView={setSelected}
        onAction={setConfirm}
      />

      <InvestigationModal
        report={selected}
        onClose={()=>setSelected(null)}
      />

      <ConfirmationModal
        modal={confirm}
        setModal={setConfirm}
        refresh={fetchReports}
      />
    </div>
  );
}