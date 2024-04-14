'use client'
import Link from "next/link";
import styles from "./thankyou.module.css";

const ThankYou = () => {

    const handleBackToMain = () => {
       
        localStorage.clear();
    
        window.location.href = '/';
      };
      
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        {" "}
        <h1>Thank You!</h1>
        <p>Your order has been placed successfully.</p>
        <button  onClick={handleBackToMain}>
          {" "}
          <Link href="/"> Back to Mainpage </Link>
        </button>
      </div>
    </div>
  );
};

export default ThankYou;
