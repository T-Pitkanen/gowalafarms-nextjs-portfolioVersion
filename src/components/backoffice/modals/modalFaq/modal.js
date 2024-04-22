import Modal from "react-modal";

import styles from "./modal.module.css";

const ModalFaq = ({
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
        {" "}
        <h3>Edit F.A.Qs</h3>
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
            type="text"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          Message
          <input
            type="text"
            name="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </label>
        <label>
          Message
          <input
            type="checkbox"
            name="validated"
            value={validated}
            onChange={(e) => setValidated(e.target.value)}
          />
        </label>

        <button>Update</button>
      </form>
    </Modal>
  );
};

export default ModalFaq;
