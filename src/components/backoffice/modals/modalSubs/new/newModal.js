import Modal from "react-modal";
import styles from "./newModal.module.css";

const ModalNew = ({
  modalIsOpen,
  closeModal,
  name,
  email,
  message,
  validated,
  handleCreate,
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
        <h3>Create Subscriber</h3>
        <button onClick={closeModal}>Close</button>
      </div>

      <form className={styles.form} onSubmit={handleCreate}>
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
          Validated?
          <input
            type="checkbox"
            name="validated"
            checked={validated}
            onChange={(e) => setValidated(e.target.checked)}
          />
        </label>

        <button>Create</button>
      </form>
    </Modal>
  );
};

export default ModalNew;