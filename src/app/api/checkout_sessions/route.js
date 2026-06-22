import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { stripe } from "@/lib/stripe";
import { auth } from "@/lib/auth";

const PRICE_ID = "price_1TkTj9P5UpbKatjUJyWBRcfw";

export async function POST() {
  try {
    const headersList = await headers();
    const origin = headersList.get("origin");

    const userSession = await auth.api.getSession({
      headers: headersList,
    });

    const user = userSession?.user;

    // User login check
    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      customer_email: user.email,

      line_items: [
        {
          price: PRICE_ID,
          quantity: 1,
        },
      ],

      metadata: {
        priceId: PRICE_ID,
        userId: user.id,
        userEmail: user.email,
      },

      mode: "subscription",

      success_url: `${origin}/pricing/success?session_id={CHECKOUT_SESSION_ID}`,

      cancel_url: `${origin}/pricing`,
    });

    return NextResponse.redirect(session.url, 303);
  } catch (err) {
    console.error("Stripe Checkout Error:", err);

    return NextResponse.json(
      {
        error: err.message || "Something went wrong",
      },
      {
        status: err.statusCode || 500,
      }
    );
  }
}