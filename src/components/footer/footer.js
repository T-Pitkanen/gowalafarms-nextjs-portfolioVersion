import Link from "next/link";
import styles from "./footer.module.css";
import { FaPhoneAlt, FaClock } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import { robotoFont } from "@/utils/fonts";

import Image from "next/image";

const Footer = () => {
  return (
    <>
      <div className={`${styles.footer} ${robotoFont.className}`}>
        <div className={styles.footerBody}>
          <div className={styles.logo}>
            <Image src="/logo.png" alt="logo" width={100} height={100} />
          </div>
          <div className={styles.footerMid}>
            {" "}
            <div className={styles.footerText}>
              <p>
                Continually productize compelling quality dome packed with all
                Elated Themes ently utilize website and creating pages corporate
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
        </div>
      </div>
      <div className={styles.copyright}>
        <p>
          © 2024 <span>Gowala</span>. All Rights Reserved By <span>LabArtisian</span> & <span>Viborg Media
          College</span>
        </p>
      </div>
    </>
  );
};

export default Footer;
