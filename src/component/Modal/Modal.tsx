import { ReactElement, ReactNode, useState } from "react";
import { GiCancel } from "react-icons/gi";

interface ModalProps {
  children: ReactNode | ((closeModal: () => void) => ReactNode); // <-- updated
  className?: string;
  tipMessage: string;
  label: string;
  icon?: ReactElement;
}

const Modal = ({
  children,
  className,
  tipMessage,
  label,
  icon,
}: ModalProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <div className={`${className}`}>
      <div className="relative group">
        <button type="button" onClick={openModal} aria-label="Show Tip">
          {icon ? icon : <span className="text-3xl cursor-pointer">ℹ️</span>}
        </button>
        <span className="absolute right-full text-nowrap p-2 ml-2 hidden group-hover:block bg-black text-white text-sm rounded-2xl">
          {tipMessage}
        </span>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 w-full"
          onClick={closeModal}
        >
          <div
            className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold ">{label}</h2>
              <button type="button" onClick={closeModal} className=" text-2xl">
                <GiCancel className="" />
              </button>
            </div>
            {children(closeModal)}
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;
