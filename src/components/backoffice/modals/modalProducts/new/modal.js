import Modal from "react-modal";
import styles from "./modal.module.css";

const ModalNew = ({
  modalIsOpen,
  closeModal,
  image,
  title,
  description,
  discount,
  price,
  handleCreate,
  setImage,
  setTitle,
  setDescription,
  setDiscount,
  setPrice,
}) => {




  return (
    <Modal
      className={styles.modal}
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      ariaHideApp={false}
    >
      <div className={styles.modalHeader}>
        <h3>Create Product</h3>
        <button onClick={closeModal}>Close</button>
      </div>

      <form className={styles.form} onSubmit={handleCreate}>
        <label>
          Image
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
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>

        <label>
          Description
          <input
            type="text"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>

        <label>
          Discount
          <input
            type="number"
            name="discount"
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
          />
        </label>

        <label>
          Price
          <input
            type="number"
            name="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </label>

        <button>Create</button>
      </form>
    </Modal>
  );
};

export default ModalNew;