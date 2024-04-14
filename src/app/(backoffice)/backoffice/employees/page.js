"use client";
import styles from "./page.module.css";
import Employees from "@/components/backoffice/employees/employees";

export default function EmployeesPage() {
  return (
    <div className={styles.page}>
      <h1>Edit Employees</h1>
      <Employees />
    </div>
  );
}
