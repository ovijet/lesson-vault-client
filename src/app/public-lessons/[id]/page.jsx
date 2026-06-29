import Comments from "@/app/components/comment";
import LikeLove from "@/app/components/LinkLove";
import PublicDetailsPage from "@/app/components/PublicDetailsPage";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import React from "react";

const PublicPage = async ({ params }) => {
  const { id } = await params;


  // const token = await auth.api.getToken({
  //   headers:await headers()
  // })

  // console.log(token,'tokennssssssssssss');

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/addLesson/${id}`,
    {
      headers:{
        authorization:'loginin'
      }

    },
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
