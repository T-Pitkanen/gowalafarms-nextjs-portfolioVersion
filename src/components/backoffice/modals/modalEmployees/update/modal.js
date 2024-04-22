import Modal from "react-modal";
import styles from "./modal.module.css";

const ModalUpdate = ({
  modalIsOpen,
  closeModal,
  id,
  name,
  description,
  position,
  handleUpdate,
  setName,
  setDescription,
  setPosition,
}) => {
  return (
    <Modal
      className={styles.modal}
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      ariaHideApp={false}
    >
      <div className={styles.modalHeader}>
        <h3>Edit Employee</h3>
        <button onClick={closeModal}>Close</button>
      </div>

      <form className={styles.form} onSubmit={handleUpdate}>
        <label>
          ID:
          <input type="text" name="id" value={id} readOnly />
        </label>

        <label>
          Name
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
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
        Position
          <input
            type="text"
            name="position"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
          />
        </label>

        <button>Update</button>
      </form>
    </Modal>
  );
};

export default ModalUpdate;