import React from "react";
import Modal from "./modal";

const ImageModal = ({ openModal, setOpenModal, picture }) => {
  return (
    <div>
      {" "}
      <Modal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        bg={"bg-transparent"}
        width={"w-full"}
      >
        <button
          onClick={() => setOpenModal(false)}
          type="button"
          class="absolute top-2 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
        >
          <svg
            class="w-3 h-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>
          <span class="sr-only">Close modal</span>
        </button>
        <div class="p-6 text-center ">
          <img className="w-full h-[80vh] object-contain" src={picture} alt="dvndf" />
        </div>
      </Modal>
    </div>
  );
};

export default ImageModal;
