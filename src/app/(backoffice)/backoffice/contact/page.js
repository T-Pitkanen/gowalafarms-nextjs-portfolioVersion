"use client";
import styles from "./page.module.css";
import Contact from "@/components/backoffice/contact/contact";

export default function ContactPage() {
  return (
    <div className={styles.page}>
      <h1>Messages</h1>
      <Contact />
    </div>
  );
}
