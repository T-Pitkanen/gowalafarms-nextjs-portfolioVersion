"use client";

import Image from "next/image";
import styles from "./carousel.module.css";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";

import { register } from "swiper/element/bundle";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { BiSolidRightArrow } from "react-icons/bi";
import { BiSolidLeftArrow } from "react-icons/bi";

const SwiperControlPanel = ({
  nextSlide,
  previousSlide,
 
}) => {
  return (
    <div className={styles.controlPanel}>
      <div className={styles.controlBtn}>
        <button onClick={() => previousSlide()}>
          <BiSolidLeftArrow />
        </button>
        <button onClick={() => nextSlide()}>
          <BiSolidRightArrow />
        </button>
      </div>
    </div>
  );
};

const Slide = ({ image }) => {
  return (
    <div className={styles.slideContent}>
      <div className={styles.slideTitle}>
        <h1>Gowala Farms</h1>
        <h2>{image.overlay.title}</h2>
      </div>

      <button className={`${styles.slideButton} ${styles.slideLink}`}>
        <Link href={image.overlay.buttonLink}> {image.overlay.buttonName}{" "}</Link>
      </button>

      <Image
        className={styles.swiperImage}
        src={image.path}
        alt={image.name}
        width={500}
        height={500}
      />
    </div>
  );
};

const Carousel = () => {
  const swiperRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [images, setImages] = useState([
    {
      _id: 1,
      path: "/banner/01.jpg",
      name: "About",
      overlay: {
        title: "Read About Us",
        buttonName: "Read More",
        buttonLink: "/about",
      },
    },
    {
      _id: 2,
      path: "/banner/02.jpg",
      name: "Shop",
      overlay: {
        title: "Our Shop",
        buttonName: "Shop Now",
        buttonLink: "/shop",
      },
    },
    {
      _id: 3,
      path: "/banner/03.jpg",
      name: "Services",
      overlay: {
        title: "Our Services",
        buttonName: "Check Out",
        buttonLink: "/services",
      },
    },
    {
      _id: 4,
      path: "/banner/04.jpg",
      name: "Contact",
      overlay: {
        title: "Got any questions?",
        buttonName: "Contact Us",
        buttonLink: "/contact",
      },
    },
  ]);


  // Register swiper
  useEffect(() => {
    register();
  }, []);

  // Listen for event
  useEffect(() => {
    swiperRef.current.addEventListener("swiperslidechange", (e) => {
      const [swiper] = e.detail;
      setCurrentIndex(swiper.activeIndex);
    });
  }, []);

  const nextSlide = () => {
    swiperRef.current.swiper.slideNext();
  };

  const previousSlide = () => {
    swiperRef.current.swiper.slidePrev(1000);
  };

  const slideTo = (index) => {
    swiperRef.current.swiper.slideTo(index, 1000);
  };

  return (
    <div className={styles.slider}>
    
      <swiper-container
        slides-per-view="1"
        keyboard="true"
        ref={swiperRef}
        rewind="true"
        speed="1000"
        scrollbar="true"
      >
        {images.map((image) => {
          return (
            <swiper-slide key={image._id}>
              <Slide image={image} />
            </swiper-slide>
          );
        })}
      </swiper-container>
      <SwiperControlPanel
        nextSlide={nextSlide}
        previousSlide={previousSlide}
        currentIndex={currentIndex}
        images={images}
        slideTo={slideTo}
      />
    </div>
  );
};

export default Carousel;
