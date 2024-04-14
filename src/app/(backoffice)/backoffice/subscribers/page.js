import styles from "./page.module.css";
import Subscribers from "@/components/backoffice/subscribers/subscribers";

export default function SubscribersPage() {
  return (
    <div className={styles.page}>

      <Subscribers />
      <form></form>
    </div>
  );
}
