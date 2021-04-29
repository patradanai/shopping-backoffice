import React, { useState } from "react";
import Modal from "react-modal";
import Image from "next/image";
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    padding: 0,
    transform: "translate(-50%, -50%)",
  },
};

const ModalOrder = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <button
        className="bg-red-300 rounded px-3 py-1 text-white"
        onClick={() => setIsOpen(true)}
      >
        Add Order
      </button>
      <Modal isOpen={isOpen} style={customStyles} ariaHideApp={false}>
        <div style={{ width: 620 }}>
          {/* Header form */}
          <div className="bg-blue-300 h-10 p-2 text-center">
            <p className="text-white font-mono">Order Number #1</p>
          </div>
          <div className="px-10">
            {/* Name */}
            <div>
              <p className="font-mono text-sm">Name</p>
              <p>Patradanai Nakpimay</p>
            </div>

            {/* Shipping */}
            <div>
              <p className="font-mono">Shipping</p>
              <p>44 M.4 Soi 2/4 T.Donpao A.Meawang 50360</p>
            </div>

            {/* Items */}
            <div>
              <p className="font-mono">Products</p>
              <div className="flex h-full py-1 bg-white border items-center justify-between px-5">
                <div>1</div>
                <div>
                  <Image src={"/images/avatar.png"} width={40} height={40} />
                </div>
                <div>Pad Thai Chicken</div>
                <div>1x</div>
                <div>500</div>
              </div>
            </div>
            {/* Total */}
            <div>
              <p className="font-mono">Total</p>
              <p></p>
            </div>

            {/* Staff Action */}
            <div>
              <p className="font-mono">Staff Action</p>
              <p></p>
            </div>

            <div className="text-center space-x-3 my-5">
              <button
                type="submit"
                onClick={() => setIsOpen(!isOpen)}
                className="bg-blue-300 py-2 rounded text-white px-10 hover:bg-gray-300"
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="bg-red-300 py-2 rounded text-white px-10 hover:bg-gray-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ModalOrder;
