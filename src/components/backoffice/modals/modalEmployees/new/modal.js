import Modal from "react-modal";
import styles from "./modal.module.css";

const ModalNew = ({
  modalIsOpen,
  closeModal,
  name,
  description,
  occupation,
  handleUpdate,
  setName,
  setDescription,
  setOccupation,
}) => {
  return (
    <Modal
      className={styles.modal}
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      ariaHideApp={false}
    >
      <div className={styles.modalHeader}>
        <h3>Create Employee</h3>
        <button onClick={closeModal}>Close</button>
      </div>

      <form className={styles.form} onSubmit={handleUpdate}>
        <label>
          Image
          <input
            type="file"
            name="image"
            onChange={(e) => handleImageChange(e)}
          />
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
          Occupation
          <input
            type="text"
            name="occupation"
            value={occupation}
            onChange={(e) => setOccupation(e.target.value)}
          />
        </label>

        <button>Create</button>
      </form>
    </Modal>
  );
};

export default ModalNew;
