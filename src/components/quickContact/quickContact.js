
import styles from "./quickContact.module.css";
import { FaPhoneAlt, FaClock } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";



const QuickContact = () => {
  return (
    <div className={styles.container}>
      {" "}
      <div className={styles.contactHeader}>
        <h1>Quick Contact</h1>
        <p>
          Continually productize compelling quality dome packed with all Elated
          Themes ently utilize website and creating pages corporate
        </p>
      </div>
      <div className={styles.info}>
              <div className={styles.phone}>
                <div className={styles.icon}>
                  <FaPhoneAlt />
                </div>
                <div>
                  {" "}
                  <p>+88130-589-745-6987</p>
                  <p>+88130-589-745-6987</p>
                </div>
              </div>
              <div className={styles.time}>
                <div className={styles.icon}>
                  <FaClock />
                </div>
                <div>   <p>Mon - Fri 09-00 - 18-00</p>
                <p>(except public holidays)</p></div>
             
              </div>
              <div className={styles.address}>
                <div className={styles.icon}>
                  <IoLocationSharp />
                </div>
                <div> <p>25/2 Lane2 Vokte Street Building</p>
                <p>Melborn City</p></div>
               
              </div>
            </div>
    </div>
  );
};
export default QuickContact;
