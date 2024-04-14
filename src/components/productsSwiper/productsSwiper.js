"use client";

import Image from "next/image";
import styles from "./productsSwiper.module.css";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";

import { register } from "swiper/element/bundle";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import Products from "../products/products";

const Slide = ({ product }) => {
  return (
    <div className={styles.slideContent}>
      <Image
        className={styles.swiperImage}
        src={product.imagePath}
        alt={product.title}
        width={800}
        height={800}
      />
     
   
        <div className={styles.slideTitle}>
          <span>${product.price}</span>
        </div>
        <button className={`${styles.slideButton} ${styles.slideLink}`}>
          <Link href={`/product/${product._id}`}> View Product </Link>
        </button>
   
    </div>
  );
};

const ProductsSwiper = () => {
  const swiperRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [products, setProducts] = useState([]);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch("http://localhost:3000/api/products");
      const data = await response.json();
      setProducts(data);
    };

    fetchProducts();
  }, []);

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
        pagination="true"
        ref={swiperRef}
        rewind="true"
        speed="1000"
        // scrollbar="true"
      >
        {products.map((product) => {
          return (
            <swiper-slide key={product._id}>
              <Slide product={product} />
            </swiper-slide>
          );
        })}
      </swiper-container>
    </div>
  );
};

export default ProductsSwiper;
