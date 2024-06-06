import React from "react";
import ContactForm from "@/components/ContactForm";
import { motion } from "framer-motion";

export default function Contact() {
  return (
    <motion.div
      key="contact"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <ContactForm />
    </motion.div>
  );
}
