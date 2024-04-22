import Modal from "react-modal";
import styles from "./modal.module.css";
import Select from "react-select";
import productsData from "../../../../../data/products.json";

const ModalUpdate = ({
  modalIsOpen,
  closeModal,
  order,
  email,
  handleUpdate,
  setOrder,
}) => {
  const handleInputChange = (selectedOption, index) => {
    const list = [...order.products];
    list[index] = {
      id: selectedOption.value,
      title: selectedOption.label,
      amount: list[index].amount,
    };
    setOrder({ ...order, products: list });
  };

  const options = productsData.map((product) => ({
    value: product._id.toString(),
    label: product.title,
  }));

  return (
    <Modal
      className={styles.modal}
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      ariaHideApp={false}
    >
      <div className={styles.modalHeader}>
        <h3>Edit Order</h3>
        <button onClick={closeModal}>Close</button>
      </div>

      <form className={styles.form} onSubmit={handleUpdate}>
        <label>
          Email
          <input
            type="email"
            name="email"
            value={order ? order.email : ""}
            onChange={(e) => setOrder({ ...order, email: e.target.value })}
          />
        </label>

        {order &&
          order.products.map((product, index) => (
            <div key={index}>
        

              <label>
                Product
                <Select
                  name="id"
                  value={options.find(
                    (option) => option.value === product.id.toString()
                  )}
                  onChange={(selectedOption) =>
                    handleInputChange(selectedOption, index)
                  }
                  options={options}
                  styles={{
                    option: (provided, state) => ({
                      ...provided,
                      backgroundColor: state.isSelected
                        ? "#5D9913"
                        : provided.backgroundColor,
                    }),
                  }}
                />
              </label>

              <label>
                Amount
                <input
                  type="number"
                  name="amount"
                  value={product.amount}
                  onChange={(e) => handleInputChange(e, index)}
                />
              </label>
            </div>
          ))}

        <button>Update</button>
      </form>
    </Modal>
  );
};

export default ModalUpdate;
