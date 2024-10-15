   // app/api/create-checkout-session/route.js
   import { NextResponse } from 'next/server';
   import Stripe from 'stripe';

   const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

   export async function POST(req) {
       const { email } = await req.json(); // Assuming you collect the user's email

       try {
           // Create a Checkout Session for a subscription
           const session = await stripe.checkout.sessions.create({
               payment_method_types: ['card'],
               mode: 'subscription',
               line_items: [
                   {
                       price: 'price_1Q9ySSDED9NwxNfRfIREvneO', // Replace with your price ID from Stripe
                       quantity: 1,
                   },
               ],
               success_url: `${req.headers.get('origin')}/success`,
               cancel_url: `${req.headers.get('origin')}/cancel`,
               customer_email: email, // Optional: pre-fill the email for the customer
           });

           return NextResponse.json({ id: session.id });
       } catch (error) {
           return NextResponse.json({ message: error.message }, { status: 500 });
       }
   }