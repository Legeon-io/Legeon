import Stripe from "stripe";
import * as dotenv from "dotenv";
import { getServiceInfo } from "../../common.js";
import paymentModel from "../../models/payment.js";
dotenv.config();

const stripe = new Stripe(process.env.STRIPE_KEY);

// POST -> api/payment
export const redirectToStripeGateway = async (req, res) => {
  try {
    const { serviceId, serviceType } = req.body;
    const response = await getServiceInfo(serviceId, serviceType);
    req.session.data = req.body;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      invoice_creation: {
        enabled: true,
      },

      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: response.serviceTitle,
              // will work after server getting deployed
              images: ["http://localhost:8080/logo.png"],
              description: "- Powered by Legeon",
            },

            unit_amount: response.price * 100,
          },
          quantity: 1,
        },
      ],

      success_url:
        "http://localhost:8080/api/payment/success?session_id={CHECKOUT_SESSION_ID}",
      cancel_url: "http://localhost:8080/error",
    });

    res.status(200).json(session.url);
    // res.redirect(session.url);
  } catch (error) {
    console.log(error);
    res.status(500).json({ errorMessage: "Internal server error" });
  }
};

// GET -> api/payment/success
export const getStripeInfo = async (req, res) => {
  try {
    const { data } = req.session;
    const session = await stripe.checkout.sessions.retrieve(
      req.query.session_id
    );
    if (session) {
      const response = await paymentModel.create({
        orderId: data.orderId,
        paymentIntent: session.payment_intent,
      });
      if (response)
        res.status(200).json({ message: "Order Placed Successfully" });
      else res.status(400).json({ error: "Something Went Wrong in Order" });
    }
    res.send(session.payment_intent);
  } catch (error) {
    console.log(error);
    res.status(500).json({ errorMessage: "Internal server error" });
  }
};
