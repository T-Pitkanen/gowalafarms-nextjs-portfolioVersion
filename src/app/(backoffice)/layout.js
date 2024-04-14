import styles from './layout.module.css';
import Navigation from '@/components/backoffice/navigation/navigation';

export const metadata = {
    title: 'Gowala Farms - BACKOFFICE',
    description: 'Backoffice for gowalafarms.dk',
}
  
export default function backofficeLayout({ children }) {
	return (
		<div className={styles.layout}>
			<Navigation></Navigation>
			{children}
		</div>
	);
}