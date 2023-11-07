import Stripe from "stripe";
import * as dotenv from "dotenv";
dotenv.config();

const stripe = new Stripe(process.env.STRIPE_KEY);

export const redirectToStripeGateway = async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: "Sample Product",
            },
            unit_amount: 100000,
          },
          quantity: 1,
        },
      ],

      success_url: "http://localhost:8080/success",
      cancel_url: "http://localhost:8080/error",
    });

    res.redirect(session.url);
  } catch (err) {
    console.log(err);
  }
};
