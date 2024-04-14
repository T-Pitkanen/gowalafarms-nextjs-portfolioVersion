"use client";
import Image from "next/image";
import styles from "./partners.module.css";
import Link from "next/link";

import { register } from "swiper/element/bundle";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useEffect, useState, useRef } from "react";

const Partners = () => {
  const [partners, setPartners] = useState([]);

  const swiperRef = useRef(null);

  const [windowDimensions, setWindowDimensions] = useState({});

  useEffect(() => {
    const getPartners = async () => {
      const response = await fetch("http://localhost:3000/api/sponsors");
      const data = await response.json();

      setPartners(data);
      swiperRef.current.swiper.update();
    };

    getPartners();
  }, []);


  // Handle window resize
  useEffect(() => {
    const getWindowDimensions = () => {
      const { innerWidth, innerHeight } = window;
      return { innerWidth, innerHeight };
    };

    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [windowDimensions]);

  useEffect(() => {
    register();

    window.dispatchEvent(new Event("resize"));
  }, []);

  useEffect(() => {
    let swiperParams = swiperRef.current.swiper.params;

    if (windowDimensions.innerWidth < 768) {
      swiperParams.slidesPerView = 2;
    } else if (
      windowDimensions.innerWidth > 768 &&
      windowDimensions.innerWidth < 1024
    ) {
      swiperParams.slidesPerView = 3;
    } else if (windowDimensions.innerWidth > 1024) {
      swiperParams.slidesPerView = 5;
    }

    swiperRef.current.swiper.update();
  }, [windowDimensions]);

  return (
    <div className={`${styles.container} `}>
      <div className={`${styles.slider}`}>
        <swiper-container
          slides-per-view={2}
          loop
          autoplay
          slides-per-group={1}
          ref={swiperRef}
        >
          {partners.map((partner) => {
            return (
              <swiper-slide key={partner._id}>
                <div className={styles.partner} >
                  <Link  href={partner.link}>
                  <Image
                    className={styles.partnerImg}
                    src={partner.imagePath}
                    alt="partners"
                    width={500}
                    height={500}
                  />
                  </Link>
                </div>
              </swiper-slide>
            );
          })}
        </swiper-container>
      </div>
    </div>
  );
};
export default Partners;
