import Checkout from '@/components/checkout/checkout';
import styles from './page.module.css';

export default function CheckOutPage() {
	return (
		<div className={styles.page} >
			<Checkout />
		</div>
	);
}
