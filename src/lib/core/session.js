import { headers } from "next/headers";
import { auth } from "../auth";
import { redirect } from "next/navigation";

export const getUser = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return session?.user || null;
};

export const requireRole = async (role) => {
  const user = await getUser();

  if (!user) {
    redirect("/login");
  }

  const userRole = user?.role?.trim();

  console.log(userRole, "uuuuuuuu");

  if (userRole !== role) {
    redirect("/unauthorized");
  }

  return user;
};