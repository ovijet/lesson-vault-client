// import { auth } from "@/lib/auth";
// import { headers } from "next/headers";
// import { redirect } from "next/navigation";

// const Layout = async ({ children }) => {
//   const session = await auth.api.getSession({
//     headers: await headers(),
//   });

//   // Login না থাকলে
//   if (!session) {
//     redirect("/login");
//   }

//   // Admin না হলে
//   if (session.role?.trim() !== "user") {
//     redirect("/unauthorized");
//   }

//   return <>{children}</>;
// };

// export default Layout;


import React from 'react';

const layout = () => {
    return (
        <div>
            xxxxxx
        </div>
    );
};

export default layout;