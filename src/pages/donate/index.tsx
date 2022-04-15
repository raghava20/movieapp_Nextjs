import { ChangeEvent, FormEvent, useEffect, useState } from "react";

const initialState = {
  amount: "",
  others: ""
};
export default function index() {
  const [disabled, setDisabled] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const [user, setUser] = useState<any>("");
  useEffect(() => {
    if (typeof window !== "undefined") {
      let user = JSON.parse(localStorage.getItem("user"));
      setUser(user);
    }
  }, []);

  // let formatter = new Intl.NumberFormat("en-US", {
  //   style: "currency",
  //   currency: "INR",

  //   // These options are needed to round to whole numbers if that's what you want.
  //   minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
  //   //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  // });

  const loadScript = (src: any) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => resolve(true);

      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const displayRazorpay = async (amount: string) => {
    try {
      const res = await loadScript(
        "https://checkout.razorpay.com/v1/checkout.js"
      );
      if (!res) return alert("You are offline...Failed to load Razorpay SDK");
    } catch (e) {
      console.log("error in razorpay", e);
    }
    const result = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/donate`,
      {
        method: "POST",
        body: JSON.stringify({
          name: user.name,
          email: user.email,
          amount: amount
        }),
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

    console.log(result);
    const data = await result.json();
    console.log(data.message);
    window.open(data.message, "_parent");

    // const options = {
    //   key: "rzp_test_8esi5HFkjW0AdE",
    //   currency: "INR",
    //   amount: parseInt(amount) * 100,
    //   name: "Community Donation",
    //   description: "Thanks for Donating!",
    //   handler: async function (response: any) {
    //     alert(`Payment ID: ${response.razorpay_payment_id}`);
    //     alert("Payment Successful.");

    //     console.log(response);
    //   },
    //   prefill: {
    //     name: user.name,
    //     email: user.email,
    //   },
    // };
    // const paymentObject = new window.Razorpay(options);
    // paymentObject.open();
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    console.log(name);
    if (!disabled && name === "others") {
      setFormData({ ...formData, others: "" });
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
    if (formData === initialState) {
      return alert("Please select amount!");
    }
    if (formData.amount !== "on") {
      // send amount
      // window.open("https://rzp.io/l/Fpc5yZf", "_blank");
      displayRazorpay(formData.amount);

      return "success";
    }
    if (parseInt(formData.others) <= 10_001 || formData.others === "") {
      return alert("Enter amount above the mentioned amount!");
    }
    displayRazorpay(formData.others);
    //   send others
  };
  return (
    <>
      <div className="grid place-items-center rounded-md bg-blue-700 w-[40.5rem] h-96 m-auto mt-20 relative md:w-2/4">
        <div>
          <form
            onSubmit={(e) => handleSubmit(e)}
            className="grid rounded-md bg-indigo-900 w-max ml-20 mt-4 p-8 pl-16 absolute -top-16 left-0 text-white md:w-full"
          >
            <p className="text-4xl">Contribute to the community!</p>
            <div className="flex flex-col gap-6 ">
              <p className="text-xl pt-4  text-left">Select an amount</p>
              <div className="grid grid-cols-4 gap-2" onChange={handleChange}>
                <label className="form_label bg-blue-700 border-none border hover:cursor-pointer rounded-sm">
                  <input
                    type="radio"
                    name="amount"
                    className="opacity-0 absolute w-0 h-0 top-0 left-0"
                    value="25"
                    disabled={disabled}
                  />
                  <span className="form_span flex flex-1 py-2 h-full justify-center items-center rounded-sm">
                    ₹25
                  </span>
                </label>
                <label className="form_label bg-blue-700 flex border-none border hover:cursor-pointer rounded-sm">
                  <input
                    type="radio"
                    name="amount"
                    className="opacity-0 absolute w-0 h-0 top-0 left-0"
                    value="100"
                    disabled={disabled}
                  />
                  <span className="form_span flex flex-1 py-2 h-full justify-center items-center rounded-sm">
                    ₹100
                  </span>
                </label>
                <label className="form_label bg-blue-700  border-none  border hover:cursor-pointer rounded-sm">
                  <input
                    type="radio"
                    name="amount"
                    className="opacity-0 absolute w-0 h-0 top-0 left-0"
                    value="500"
                    disabled={disabled}
                  />
                  <span className="form_span flex flex-1 py-2 h-full justify-center items-center rounded-sm">
                    ₹500
                  </span>
                </label>
                <label className="form_label bg-blue-700 flex border-none  border hover:cursor-pointer rounded-sm">
                  <input
                    type="radio"
                    name="amount"
                    className="opacity-0 absolute w-0 h-0 top-0 left-0"
                    value="1000"
                    disabled={disabled}
                  />
                  <span className="form_span flex flex-1 py-2 h-full justify-center items-center rounded-sm">
                    ₹1000
                  </span>
                </label>
                <label className="form_label bg-blue-700 flex border-none  border  hover:cursor-pointer rounded-sm">
                  <input
                    type="radio"
                    name="amount"
                    className="opacity-0 absolute w-0 h-0 top-0 left-0"
                    value="10000"
                    disabled={disabled}
                  />
                  <span className="form_span flex flex-1 py-2 h-full justify-center items-center rounded-sm">
                    ₹10,000
                  </span>
                </label>
                <label className="form_label bg-blue-700 flex border-none  border hover:cursor-pointer rounded-sm">
                  <input
                    type="radio"
                    name="amount"
                    className="opacity-0 absolute w-0 h-0 top-0 left-0"
                    onClick={() => setDisabled(!disabled)}
                  />
                  <span className="form_span flex py-2 flex-1 h-full justify-center items-center rounded-sm">
                    Other
                  </span>
                </label>
              </div>
            </div>
            <div className="mt-5 flex flex-col">
              <input
                type="number"
                placeholder="Min ₹10,001"
                min="10_0001"
                className="focus:outline-none pl-3 text-gray-600 focus:border-b-4 focus:border-blue-500 rounded-sm py-1"
                name="others"
                value={formData.others}
                onChange={handleChange}
                disabled={!disabled}
              />
              <small>Select other to enter amount</small>
            </div>
            <div>
              <button
                type="submit"
                className="shadow-md shadow-blue-500/40 px-4 mt-7 text-md mr-4 text-blue-700 py-2 bg-slate-100 border-none rounded-md hover:text-white hover:bg-blue-700"
              >
                Donate ₹
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
