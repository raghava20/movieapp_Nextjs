import { NextApiRequest, NextApiResponse } from "next";
import Razorpay from "razorpay";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const { method, body } = req;

  switch (method) {
    case "POST":
      try {
        const razorpayInstance = new Razorpay({
          key_id: "rzp_test_8esi5HFkjW0AdE",
          key_secret: "GW2U5KHXjE5NryfKsY7pxqd3"
        });
        const { name, email, amount } = body;
        const receipt = (Math.random() * 0xffffff * 10000000000)
          .toString(16)
          .slice(0, 6);
        const callbackURL = "http://localhost:3000/donate";
        const invoiceOptions = {
          type: "invoice",
          description: "Invoice for test donation",
          customer: {
            name: name,
            email: email
          },
          line_items: [
            {
              name: "Donation",
              description: "Community Donation",
              amount: amount * 100
            }
          ],
          date: Math.round(Date.now() / 1000),
          receipt: receipt,
          callback_method: "get",
          callback_url: callbackURL
        };
        let url;
        await razorpayInstance.invoices.create(
          invoiceOptions,
          (error, invoice) => {
            if (error) {
              console.log("error", error);
            } else {
              url = invoice.short_url;
            }
            //   const paymentURL = invoice.short_url.toString();
          }
        );
        url = url.toString();
        console.log("before", url);
        return res.status(201).json({ message: url });
      } catch (error) {
        return console.warn("error", error);
      }

    default:
      return res.status(400).json({ message: "method not allowed" });
  }
}