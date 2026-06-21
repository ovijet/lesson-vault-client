"use client";

import { Button,Link } from "@heroui/react";

export default function PricingPage() {

  const handleUpgrade = async () => {
    const res = await fetch(
      "/api/create-checkout-session",
      {
        method: "POST",
      }
    );

    const data = await res.json();

    if (data.url) {
      window.location.href = data.url;
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-16 px-4">

      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold">
          Upgrade to Premium ⭐
        </h1>

        <p className="mt-4 text-gray-500">
          One Time Payment • Lifetime Access
        </p>

        <h2 className="text-6xl font-bold mt-6">
          ৳1500
        </h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border rounded-xl">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-4 text-left">
                Features
              </th>
              <th className="p-4">
                Free
              </th>
              <th className="p-4">
                Premium
              </th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td className="p-4">
                Number of Lessons
              </td>
              <td>5</td>
              <td>Unlimited</td>
            </tr>

            <tr>
              <td className="p-4">
                Premium Lesson Creation
              </td>
              <td>❌</td>
              <td>✅</td>
            </tr>

            <tr>
              <td className="p-4">
                Ad Free Experience
              </td>
              <td>❌</td>
              <td>✅</td>
            </tr>

            <tr>
              <td className="p-4">
                Priority Listing
              </td>
              <td>❌</td>
              <td>✅</td>
            </tr>

            <tr>
              <td className="p-4">
                Premium Content Access
              </td>
              <td>❌</td>
              <td>✅</td>
            </tr>

            <tr>
              <td className="p-4">
                Verified Badge
              </td>
              <td>❌</td>
              <td>✅</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="text-center mt-10 ">
        <form action="/api/checkout_sessions" method="POST">
      <section>
        <button type="submit" role="link" className="bg-red-500 p-2 text-white rounded-full">
          Checkout
        </button>
      </section>
    </form>
      </div>

    </div>
  );
}