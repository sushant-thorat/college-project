import React, { useState } from "react";
import { MapPin, IndianRupee, Bed, Bath, Ruler, X } from "lucide-react";
import { FaWallet } from "react-icons/fa";
import { SiPhonepe, SiMobx } from "react-icons/si";

const TextInput = ({ type = "text", placeholder, value, onChange }) => (
  <input
    type={type}
    placeholder={placeholder}
    className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
    value={value}
    onChange={onChange}
    required
  />
);

const MyPropertyCard = ({ property }) => {
  const [showPayment, setShowPayment] = useState(false);
  const [method, setMethod] = useState("card");
  const [form, setForm] = useState({});
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const paymentAmount = Math.round(property.price * 0.4);

  const formatCurrency = (amount) => amount.toLocaleString("en-IN");

  const handlePayment = () => {
    setShowPayment(true);
    setMethod("card");
    setForm({});
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (method === "card" && (!form.cardNumber || !form.expiry || !form.cvv)) {
      return setError("Please fill all card details.");
    }

    if (method === "upi" && !form.upiId) {
      return setError("Please enter a valid UPI ID.");
    }

    if (method === "netbanking" && !form.bank) {
      return setError("Please select your bank.");
    }

    if (method === "wallet") {
      if (!form.walletProvider) {
        return setError("Please select a wallet.");
      }
      if (!form.walletId) {
        return setError("Please enter your wallet ID.");
      }
    }

    // ✅ Log the submitted form data
    console.log("Payment Method:", method);
    console.log("Submitted Data:", form);

    const paymentData = {
      user_id: 2, // 🔁 Replace with actual logged-in user ID
      property_id: property.id,
      amount_paid: paymentAmount,
      payment_method: method,
      payment_details: form,
      status: "paid",
    };

    try {
      const response = await fetch("http://localhost:3000/api/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(paymentData),
      });

      const data = await response.json();

      if (data.success) {
        setSuccess("Payment successful 🎉");
        setShowPayment(false);
      } else {
        setError(data.message || "Payment failed");
      }
    } catch (err) {
      setError("Network error during payment");
      console.error("Payment error:", err);
    }

    setSuccess("Payment successful 🎉");
  };

  return (
    <>
      {/* Property Card */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-all hover:shadow-xl flex flex-col">
        <div className="relative">
          <img
            src={property.image}
            alt={property.name}
            className="w-full h-48 object-cover"
          />
          {property.tag && (
            <span className="absolute top-2 left-2 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">
              {property.tag}
            </span>
          )}
        </div>

        <div className="p-4 flex-grow">
          <h2 className="text-lg font-semibold text-gray-900">
            {property.name}
          </h2>
          <p className="text-gray-500 flex items-center gap-1 text-sm">
            <MapPin size={14} /> {property.location}
          </p>
          <p className="text-blue-500 flex items-center gap-1 font-semibold mt-2">
            <IndianRupee size={16} /> ₹{formatCurrency(property.price)}
          </p>
          <div className="flex justify-between mt-3 text-gray-600 text-sm border-t pt-4">
            <span className="flex items-center gap-1">
              <Bed size={14} /> {property.bedrooms} Beds
            </span>
            <span className="flex items-center gap-1">
              <Bath size={14} /> {property.bathrooms} Baths
            </span>
            <span className="flex items-center gap-1">
              <Ruler size={14} /> {property.area} sq.ft
            </span>
          </div>
        </div>

        <div className="p-4 pt-0 flex justify-end">
          <button
            onClick={handlePayment}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 text-sm rounded-lg shadow-md transition-all"
          >
            Pay 40% Now
          </button>
        </div>
      </div>

      {/* Payment Modal */}
      {showPayment && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex justify-center items-center p-4 animate-fadeIn">
          <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-6 relative">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
              onClick={() => setShowPayment(false)}
              aria-label="Close Payment"
            >
              <X size={20} />
            </button>
            <h2 className="text-lg font-bold mb-4">Make Payment</h2>

            <div className="flex gap-2 mb-4 flex-wrap">
              {["card", "upi", "netbanking", "wallet"].map((m) => (
                <button
                  key={m}
                  onClick={() => {
                    setMethod(m);
                    setForm({});
                    setError("");
                    setSuccess("");
                  }}
                  className={`px-3 py-1 rounded-md text-sm font-medium border transition-all ${
                    method === m
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {
                    {
                      card: "Card",
                      upi: "UPI",
                      netbanking: "Net Banking",
                      wallet: "Wallet",
                    }[m]
                  }
                </button>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              {method === "card" && (
                <>
                  <TextInput
                    placeholder="Card Number"
                    value={form.cardNumber || ""}
                    onChange={(e) =>
                      setForm({ ...form, cardNumber: e.target.value })
                    }
                  />
                  <TextInput
                    placeholder="Expiry (MM/YY)"
                    value={form.expiry || ""}
                    onChange={(e) =>
                      setForm({ ...form, expiry: e.target.value })
                    }
                  />
                  <TextInput
                    placeholder="CVV"
                    value={form.cvv || ""}
                    onChange={(e) => setForm({ ...form, cvv: e.target.value })}
                  />
                </>
              )}

              {method === "upi" && (
                <TextInput
                  placeholder="Enter UPI ID"
                  value={form.upiId || ""}
                  onChange={(e) => setForm({ ...form, upiId: e.target.value })}
                />
              )}

              {method === "netbanking" && (
                <select
                  className="w-full border rounded-md px-3 py-2"
                  value={form.bank || ""}
                  onChange={(e) => setForm({ ...form, bank: e.target.value })}
                  required
                >
                  <option value="">Select Bank</option>
                  <option value="HDFC">HDFC</option>
                  <option value="SBI">SBI</option>
                  <option value="ICICI">ICICI</option>
                  <option value="Axis">Axis</option>
                </select>
              )}

              {method === "wallet" && (
                <div className="space-y-3">
                  <p className="text-sm font-medium text-gray-700">
                    Select Wallet
                  </p>
                  <div className="flex justify-between gap-3">
                    {[
                      { name: "Paytm", icon: <FaWallet size={24} /> },
                      {
                        name: "PhonePe",
                        icon: <SiPhonepe size={24} color="#6f42c1" />,
                      },
                      {
                        name: "Mobikwik",
                        icon: <SiMobx size={24} color="#0063f7" />,
                      },
                    ].map((wallet) => (
                      <label
                        key={wallet.name}
                        className={`flex flex-col items-center gap-1 border rounded-lg p-3 w-full cursor-pointer hover:shadow-sm transition-all ${
                          form.walletProvider === wallet.name
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-300"
                        }`}
                      >
                        <input
                          type="radio"
                          name="wallet"
                          value={wallet.name}
                          checked={form.walletProvider === wallet.name}
                          onChange={(e) =>
                            setForm({
                              ...form,
                              walletProvider: e.target.value,
                            })
                          }
                          className="hidden"
                        />
                        {wallet.icon}
                        <span className="text-xs font-medium text-gray-800">
                          {wallet.name}
                        </span>
                      </label>
                    ))}
                  </div>

                  {form.walletProvider && (
                    <TextInput
                      placeholder={`${form.walletProvider} Wallet ID`}
                      value={form.walletId || ""}
                      onChange={(e) =>
                        setForm({ ...form, walletId: e.target.value })
                      }
                    />
                  )}
                </div>
              )}

              {error && <p className="text-red-500 text-sm">{error}</p>}
              {success && <p className="text-green-600 text-sm">{success}</p>}

              <button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 rounded-md transition-all"
              >
                Pay ₹{formatCurrency(paymentAmount)} (40% of ₹
                {formatCurrency(property.price)})
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default MyPropertyCard;
