import React, { useState } from "react";
import Modal from "react-modal";

const ModalStaff = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <button
        className="bg-red-300 rounded px-3 py-1 text-white"
        onClick={() => setIsOpen(true)}
      >
        Add Member
      </button>
      <Modal isOpen={isOpen}></Modal>
    </div>
  );
};

export default ModalStaff;
