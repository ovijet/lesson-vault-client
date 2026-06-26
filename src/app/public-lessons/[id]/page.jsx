import Comments from "@/app/components/comment";
import LikeLove from "@/app/components/LinkLove";
import PublicDetailsPage from "@/app/components/PublicDetailsPage";
import React from "react";

const PublicPage = async ({ params }) => {
  const { id } = await params;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/addLesson/${id}`,
    {
      cache: "no-store",
    },
  );

  const data = await res.json();

  return (
    <div>
      <PublicDetailsPage data={data} />
      <LikeLove lessonId={id} lessonData={data} />

      <Comments lessonId={id}/>
    </div>
  );
};

export default PublicPage;
