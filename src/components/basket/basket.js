import { useBasket } from '@/context/basket';
import styles from './basket.module.css';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Basket = () => {
	//useBasket hook to get the current state of basket
	const { basket, changeProductAmount, removeFromBasket } = useBasket();

	//State variable with a setter function. The initial value is an empty array.
	const [basketItems, setBasketItems] = useState([]);

	useEffect(() => {
		//fetching the products based on IDs. IDs are obtained from the basket.
		const getProductByRange = async () => {
			let idRange = basket.map((item) => item.id);

			//if there is any IDS in the basket, fetch the products
			if (idRange.length > 0) {
				let products = await fetch(`api/products?range=${idRange}`);
				products = await products.json();

				//fetched products are being mapped over. Finds the product in the basket and adds the amount to the product.
				products.map((product) => {
					let basketAmount = basket.find((item) => item.id === product._id);

					if (basketAmount) {
						product.amount = basketAmount.amount;
					}
				});

				//updates the basketItems state.
				setBasketItems(products);
			}
		};

		getProductByRange();
	}, [basket]);

	//finds the item in the basket and changes the new amount of the product. delta = change in amount
	const handleAmountChange = (id, delta) => {
		const item = basket.find((item) => item.id === id);
		if (item) {
			const newAmount = item.amount + delta;
			if (newAmount > 0) {
				changeProductAmount(id, newAmount);
			}
		}
	};


	//takes an ID, removes the item with that ID from the basket. Also updates the basketItems state.
	const handleRemove = (id) => {
		removeFromBasket(id);
		setBasketItems(basketItems.filter((item) => item._id !== id));
	};

	return (
		<div className={styles.container}>
			{basketItems.map((basketItem) => {
				return (
					<div key={basketItem._id} className={styles.item}>
						<Image
							src={basketItem.imagePath}
							alt={basketItem.title}
							width={50}
							height={50}
							className={styles.image}
						/>
						<span className={styles.title}>{basketItem.title}</span>
						<button
							className={styles.decreaseBtn}
							onClick={() => handleAmountChange(basketItem._id, -1)}
						>
							-
						</button>
						<span className={styles.amount}>{basketItem.amount}</span>
						<button
							className={styles.addBtn}
							onClick={() => handleAmountChange(basketItem._id, 1)}
						>
							+
						</button>
						<span className={styles.total}>
							<span>$</span>
							{(basketItem.amount * basketItem.price).toFixed(2)}
						</span>
						<button
							className={styles.removeBtn}
							onClick={() => handleRemove(basketItem._id)}
						>
							Remove
						</button>
					</div>
				);
			})}
			<div className={styles.totalPrice}>
				Total: $
				{basketItems
					.reduce((total, item) => total + item.price * item.amount, 0)
					.toFixed(2)}
			</div>
			<div className={styles.checkout}>
				
				<button>
					<Link href="/checkout">Checkout</Link>
				</button>
			</div>
		</div>
	);
};

export default Basket;
