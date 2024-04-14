
import ArticleServices from '@/components/articleServices/articleServices';
import styles from './page.module.css';
import Hero from '@/components/hero/hero';
import Subscribe from '@/components/subscribe/subscribe';

export default function ServicePage() {

	const heroConfig = {
  
		headline: {
		  text: "Gowala Services",
		  color: "black",
		},
		backgroundImage: "/headers/page_header_01.jpg",
		underline: {
		  text: ` Our services & quality
				`,
		  color: "#5D9913",
		},
	  };

	return (
		<div className={styles.page} >
			<Hero config={heroConfig} />
			<ArticleServices />
			<Subscribe />
		</div>
	);
}
