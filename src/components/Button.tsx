interface ButtonProps {
  styles: any;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const Button = ({ styles, setOpenModal }: ButtonProps) => {
  return (
    <button
      type="button"
      onClick={() => {
        setOpenModal(true);
      }}
      className={`py-4 px-6 bg-blue-gradient font-poppins font-medium text-[18px] text-primary outline-none ${styles} rounded-[10px]`}
    >
      Get Started
    </button>
  );
};

export default Button;
