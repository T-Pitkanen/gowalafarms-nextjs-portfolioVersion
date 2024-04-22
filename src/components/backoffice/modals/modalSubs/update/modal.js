import Modal from "react-modal";
import styles from "./modal.module.css";

const ModalUpdate = ({
  modalIsOpen,
  closeModal,
  id,
  name,
  email,
  message,
  validated,
  handleUpdate,
  setName,
  setEmail,
  setMessage,
  setValidated,
}) => {
  return (
    <Modal
      className={styles.modal}
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      ariaHideApp={false}
    >
      <div className={styles.modalHeader}>
        <h3>Edit Subscriber</h3>
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
          Email
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>

        <label>
          Message
          <textarea
            name="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={"10"}
            cols={"50"}
          />
        </label>

        <label>
          Validated
          <input
            type="checkbox"
            name="validated"
            checked={validated}
            onChange={(e) => setValidated(e.target.checked)}
          />
        </label>

        <button>Update</button>
      </form>
    </Modal>
  );
};

export default ModalUpdate;