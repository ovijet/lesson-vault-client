import React from "react";

const PublicPage = async ({ params }) => {
  const { id } = await params;

  console.log("ID:", id);

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/addLesson/${id}`,
    {
      cache: "no-store",
    }
  );

  const data = await res.json();

  console.log(data);

  return (
    <div>
      <h1>{data.title}</h1>
      <p>{data.description}</p>
    </div>
  );
};

export default PublicPage;