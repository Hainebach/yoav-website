import React, { useState } from "react";

export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();

    if (loading) {
      return;
    }

    const form = event.target;
    const formValues = Object.fromEntries(new FormData(form).entries());

    setLoading(true);
    setSuccessMessage("");

    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "content-Type": "application/json" },
        body: JSON.stringify(formValues),
      }).then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      });

      setLoading(false);
      setSuccessMessage("thank you for contacting me!");
      form.reset();
    } catch (error) {
      console.error(error);
      alert("an error occured while sending your message...");
      setLoading(false);
    }
  };
  return (
    <div className="flex items-start justify-center min-h-screen">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-lg  p-8 rounded shadow-md"
      >
        <h2 className="font-bold mb-6 text-center">contact me</h2>
        <label className="block mb-4">
          {/* <span className="block text-gray-700">Name</span> */}
          <input
            type="text"
            name="name"
            placeholder="name"
            required
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring ring-gray-200"
          />
        </label>
        <label className="block mb-4">
          {/* <span className="block text-gray-700">Email</span> */}
          <input
            type="email"
            name="email"
            placeholder="your email"
            required
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring ring-gray-200"
          />
        </label>
        <label className="block mb-6">
          {/* <span className="block text-gray-700">Message</span> */}
          <textarea
            name="message"
            placeholder="message"
            rows={6}
            required
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring ring-gray-200"
          />
        </label>
        <button
          disabled={loading}
          type="submit"
          className="w-full py-2 px-4 bg-gray-400 text-white font-bold rounded-md shadow-md hover:bg-gray-900 focus:outline-none focus:ring focus:ring-indigo-200"
        >
          Send message!
        </button>
        {successMessage && (
          <p className="mt-4 text-green-600 text-center">{successMessage}</p>
        )}
      </form>
    </div>
  );
}
