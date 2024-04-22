"use client";
import styles from "./page.module.css";
import Faqs from "@/components/backoffice/faq/faq";

export default function FaqPage() {
  return (
    <div className={styles.page}>
      <h1>Edit F.A.Qs</h1>
      <Faqs />
    </div>
  );
}
