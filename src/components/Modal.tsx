import "../styles/Modal.sass";
import { useState } from "react";
import LoginPage from "./ModalForm/LoginPage";
import RegisterPage from "./ModalForm/RegisterPage";
import { AxiosInstance } from "axios";

interface ModalProps {
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  setAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  authenticated: boolean;
  client: AxiosInstance;
  getUserFunction: () => void;
}

function Modal({
  setOpenModal,
  setAuthenticated,
  authenticated,
  client,
  getUserFunction,
}: ModalProps) {
  const [formPage, setFormPage] = useState(true);
  return (
    <>
      <div
        className="modalBackground"
        onClick={() => {
          setOpenModal(false);
        }}
      ></div>

      <div className="modalForm">
        <div className="modalContainer form-wrapper">
          <section className="form-container forms">
            {formPage ? (
              <LoginPage
                setOpenModal={setOpenModal}
                setFormPage={setFormPage}
                setAuthenticated={setAuthenticated}
                authenticated={authenticated}
                client={client}
                getUser={getUserFunction}
              ></LoginPage>
            ) : (
              <RegisterPage setFormPage={setFormPage}></RegisterPage>
            )}
          </section>
        </div>
      </div>
    </>
  );
}

export default Modal;
