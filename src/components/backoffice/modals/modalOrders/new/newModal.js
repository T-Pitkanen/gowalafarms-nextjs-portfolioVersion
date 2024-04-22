import Modal from "react-modal";
import { useState } from "react";
import styles from "./newModal.module.css";
import productsData from "../../../../../data/products.json";
import Select from "react-select";

const ModalNew = ({
  modalIsOpen,
  closeModal,
  email,
  handleCreate,
  setEmail,
}) => {
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const productOptions = productsData.map((product) => ({
    value: product.id,
    label: product.title,
  }));

  const handleAddProduct = () => {
    setSelectedProducts([
      ...selectedProducts,
      { product: selectedProduct, quantity },
    ]);
    setSelectedProduct(null);
    setQuantity(1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
  
    // Reset the fields
    setSelectedProducts([]);
    setSelectedProduct(null);
    setQuantity(1);
  
    closeModal();
  };

  const handleRemoveProduct = (index) => {
    setSelectedProducts(selectedProducts.filter((_, i) => i !== index));
  };



  return (
    <Modal
      className={styles.modal}
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      ariaHideApp={false}
    >
      <div className={styles.modalContainer}>
      <div className={styles.modalHeader}>
        <h3>Create Order</h3>
        <button onClick={closeModal}>Close</button>
      </div>

      <form className={styles.form} onSubmit={handleSubmit}>
        <label>
          Email
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>

        {selectedProducts.map((item, index) => (
          <div key={index} className={styles.addedProduct}>
            <p>Product: {item.product.label}</p>
            <p>Quantity: {item.quantity}</p>
            <button onClick={() => handleRemoveProduct(index)}>Remove</button>
          </div>
        ))}

        <label>
          Product Search
          <Select
            options={productOptions}
            value={selectedProduct}
            onChange={setSelectedProduct}
            styles={{
              option: (provided) => ({
                ...provided,
                color: "black",
                backgroundColor: "white",
              }),
              singleValue: (provided) => ({
                ...provided,
                color: "black",
              }),
            }}
          />
        </label>

        <label>
          Quantity
          <input
            type="number"
            name="quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            min="1"
          />
        </label>

        <div className={styles.buttons}>
          {" "}
          <button type="button" onClick={handleAddProduct}>
            Add Product
          </button>
          <button>Create Order</button>
        </div>
      </form>
      </div>
    </Modal>
  );
};

export default ModalNew;
