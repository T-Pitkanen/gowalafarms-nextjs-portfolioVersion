import Modal from "react-modal";
import styles from "./modal.module.css";
import Image from "next/image";

const ModalUpdate = ({
  modalIsOpen,
  closeModal,
  product,
  handleUpdate,
  setTitle,
  setDescription,
  setDiscount,
  setPrice,
}) => {
  if (!product) {
    return null;
  }

  return (
    <Modal
      className={styles.modal}
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      ariaHideApp={false}
    >
      <div className={styles.modalHeader}>
        <h3>Edit Product</h3>
        <button onClick={closeModal}>Close</button>
      </div>

      <form className={styles.form} onSubmit={handleUpdate}>
        <label>
          ID:
          <input type="text" name="id" value={product._id} readOnly />
        </label>

        <label>
          Current Image
          <Image src={product.imagePath} alt={product.title} width={100} height={100} />
          <br></br>
          <br></br>
          New Image
          <input
            type="file"
            name="image"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </label>

        <label>
          Title
          <input
            type="text"
            name="title"
            defaultValue={product.title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>

        <label>
          Description
          <input
            type="text"
            name="description"
            defaultValue={product.description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>

        <label>
          Discount
          <input
            type="number"
            name="discount"
            defaultValue={product.discountInPercent}
            onChange={(e) => setDiscount(e.target.value)}
          />
        </label>

        <label>
          Price
          <input
            type="number"
            name="price"
            defaultValue={product.price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </label>

        <button>Update</button>
      </form>
    </Modal>
  );
};

export default ModalUpdate;