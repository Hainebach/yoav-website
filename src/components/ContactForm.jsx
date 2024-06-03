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
    <form onSubmit={onSubmit}>
      <label>
        <span>Name</span>
        <input type="text" name="name" required />
      </label>
      <label>
        <span>Email</span>
        <input type="email" name="email" required />
      </label>
      <label>
        <span>Message</span>
        <textarea name="message" required />
      </label>
      <button disabled={loading} type="submit">
        Send message!
      </button>
      {successMessage && <p>{successMessage}</p>}
    </form>
  );
}
