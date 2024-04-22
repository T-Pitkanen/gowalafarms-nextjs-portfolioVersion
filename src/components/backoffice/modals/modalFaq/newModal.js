import Modal from "react-modal";
import styles from "./modal.module.css";

const ModalFaqNew = ({
  modalIsOpen,
  closeModal,
  question,
  answer,
  handleCreate, 
  setQuestion,
  setAnswer,
}) => {
  return (
    <Modal
      className={styles.modal}
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      ariaHideApp={false}
    >
      <div className={styles.modalHeader}>
        <h3>Create F.A.Qs</h3> 
        <button onClick={closeModal}>Close</button>
      </div>

      <form className={styles.form} onSubmit={handleCreate}> 
        <label>
          Question?
          <input
            type="text"
            name="question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
        </label>

        <label>
          Answer
          <textarea
            name="answer"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            rows={"10"}
            cols={"50"}
          />
        </label>

        <button>Create</button>
      </form>
    </Modal>
  );
};

export default ModalFaqNew;