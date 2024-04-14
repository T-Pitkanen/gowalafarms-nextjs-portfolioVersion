import styles from './page.module.css';
import Orders from '@/components/backoffice/orders/orders';

export default function ReviewsPage() {
	return (
		<div className={styles.page}>
			<h1>Edit Orders</h1>

			<Orders />
		</div>
	);
}
