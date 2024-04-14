import Link from 'next/link';
import styles from './navigation.module.css';
const Navigation = () => {
	return (
		<div className={styles.container}>
			<Link href="/">Back to the Frontend</Link> |
			<Link href="/backoffice/sponsors">Edit Sponsors</Link> |
			<Link href="/backoffice/FAQ">Edit FAQ</Link> |
			<Link href="/backoffice/subscribers">Edit Subscribers</Link> |
			<Link href="/backoffice/orders">Edit Orders</Link> |
			<Link href="/backoffice/employees">Edit Employees</Link> |
			<Link href="/backoffice/products">Edit Products</Link> |
			<Link href="/backoffice/contact">Edit Contacts</Link> |
			{/* <Link href="/backoffice/single">Single</Link>| */}
			{/* <Link href="/backoffice/mulitple">Mulitple</Link> */}
		</div>
	);
};
export default Navigation;
