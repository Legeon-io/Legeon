
const instance = new Razorpay({
    key_id: RAZOR_PAY_KEY_ID,
    key_secret: RAZOR_PAY_KEY_SECRET,
  });
  
  app.post("/checkout", async (req, res) => {
    const options = {
      amount: Number(req.body.serviceAmount * 100),
      currency: "INR",
    };
    const order = await instance.orders.create(options);
  
    res.status(200).json({
      success: true,
      order,
    });
  });
  
  app.get("/get-api-key", (req, res) => {
    res.status(200).json({ key: RAZOR_PAY_KEY_ID });
  });
  
  app.post("/payment-verification", (req, res) => {
    try {
      const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
        req.body;
      console.log(req.body);
      if (!razorpay_payment_id || !razorpay_order_id || !razorpay_signature) {
        throw new Error("Missing required fields in the request body");
      }
  
      const generated_signature = crypto
        .createHmac("sha256", RAZOR_PAY_KEY_SECRET)
        .update(`${razorpay_order_id}|${razorpay_payment_id}`)
        .digest("hex");
  
      if (generated_signature === razorpay_signature) {
        return ResponseSender(res, 200, { success: true });
      } else {
        throw new Error("Invalid Razorpay signature");
      }
    } catch (error) {
      console.error("Error in payment verification:", error.message);
      return ResponseSender(res, 400, { success: false });
    }
  });
  
  app.post("/refund", async (req, res) => {
    try {
      const { paymentId, amount } = req.body;
  
      const response = await axios.post(
        `https://api.razorpay.com/v1/payments/${paymentId}/refund`,
        { amount },
        {
          auth: {
            username: RAZOR_PAY_KEY_ID,
            password: RAZOR_PAY_KEY_SECRET,
          },
        }
      );
  
      res.json(response.data);
    } catch (error) {
      console.error(error.response ? error.response.data : error.message);
      res.status(500).send("Internal Server Error");
    }
  });
  
  app.post("/payout", async (req, res) => {
    try {
      const details = {
        account_number: "2323230000392305",
        fund_account_id: "fa_NCGKE9CK3F81sL",
        amount: 50000,
        currency: "INR",
        mode: "IMPS",
        purpose: "payout",
        queue_if_low_balance: true,
        reference_id: "Acme Transaction ID 12345",
        narration: "Acme Corp Fund Transfer",
        notes: {
          notes_key_1: "Tea, Earl Grey, Hot",
          notes_key_2: "Tea, Earl Grey… decaf.",
        },
      };
  
      const response = await axios.post(
        `https://api.razorpay.com/v1/payouts`,
        details,
        {
          auth: {
            username: RAZOR_PAY_KEY_ID,
            password: RAZOR_PAY_KEY_SECRET,
          },
        }
      );
  
      res.json(response.data);
    } catch (error) {
      console.error(error.response ? error.response.data : error.message);
      res.status(500).send("Internal Server Error");
    }
  });
  