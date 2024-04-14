import styles from './page.module.css';
import Products from '@/components/backoffice/products/products';


export default function ProductsPage() {

    return (
        <div className={styles.page}>

            <h1>Edit Products</h1>
            
            <Products />


        </div>
    )
    
}