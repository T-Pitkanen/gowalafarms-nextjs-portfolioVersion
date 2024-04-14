// import styles from './layout.module.css';
import Navigation from '@/components/navigation/navigation';
import Footer from '@/components/footer/footer';
import styles from './layout.module.css';

export default function siteLayout({ children }) {
	return (
		<div className={styles.layout}>
			<Navigation></Navigation>
			{children}
			<Footer></Footer>
		</div>
	);
}
