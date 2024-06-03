import { NextApiRequest, NextApiResponse } from "next";
import Mailgun from "mailgun.js";
import FormData from "form-data";

const CONTACT_FORM_FROM_EMAIL = process.env.CONTACT_FORM_FROM_EMAIL;
const CONTACT_FORM_TO_EMAIL = process.env.CONTACT_FORM_TO_EMAIL;
const MAILGUN_DOMAIN = process.env.MAILGUN_DOMAIN;
const MAILGUN_API_KEY = process.env.MAILGUN_API_KEY;

const mailgun = new Mailgun(FormData);
const mg = mailgun.client({
  username: "api",
  key: MAILGUN_API_KEY,

  url: "https://api.eu.mailgun.net",
});

export default async function contact(req, res) {
  if (req.method !== "POST") {
    return res.status(404).end();
  }

  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res
      .status(400)
      .json({ status: "error", message: "All fields are required." });
  }
  const text = ["From: " + name + "<" + email + ">", message].join("\n");

  try {
    await mg.messages().send({
      subject: "New contact from submission",
      from: CONTACT_FORM_FROM_EMAIL,
      to: CONTACT_FORM_TO_EMAIL,
      text,
      "h:Reply-To": email,
    });
    res.status(200).json({ status: "ok" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
}
