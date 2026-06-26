"use client";

import { useEffect } from "react";
import { authClient } from "@/lib/auth-client";

export default function SuccessPage({ customerEmail }) {
  const { data: session } = authClient.useSession();

  useEffect(() => {
    const updatePremium = async () => {
      if (!session?.user?.email) return;

      try {
        await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/subscription`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: session.user.email,
            }),
          }
        );

        // session update দেখতে page reload
        // window.location.reload();
      } catch (err) {
        console.log(err);
      }
    };

    updatePremium();
  }, [session]);

  return (
    <section id="success">
      <h2 className="text-3xl font-bold text-green-600">
        Payment Successful 🎉
      </h2>

      <p>
        We appreciate your business! A confirmation email will be sent to{" "}
        {customerEmail}. If you have any questions, please email{" "}
        <a href="mailto:orders@example.com">
          orders@example.com
        </a>.
      </p>
    </section>
  );
}