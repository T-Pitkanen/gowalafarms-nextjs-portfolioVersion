import Link from 'next/link';
import styles from './allProducts.module.css';

const ShopButton = () => {
  return (
    <Link href="/shop">
      
        <button className={styles.button}>See All Products</button>
     
    </Link>
  );
};

export default ShopButton;