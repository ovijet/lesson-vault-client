export default function LessonCard({ lesson }) {
  return (
    <div className="p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition">
      <h2 className="text-white font-semibold">
        {lesson.title}
      </h2>

      <p className="text-xs text-slate-400">
        {lesson.category} • {lesson.lessonType || "Motivational"}
      </p>

      <div className="flex gap-4 mt-2 text-slate-400 text-sm">
        <span>❤️ {lesson.likes || 0}</span>
        <span>💬 {lesson.comments || 0}</span>
      </div>
    </div>
  );
}