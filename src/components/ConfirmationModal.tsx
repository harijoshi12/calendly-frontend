import React from "react";
import { FaTimes } from "react-icons/fa";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  message,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 max-w-sm w-full">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Booking Confirmation</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700">
            <FaTimes className="w-5 h-5" />
          </button>
        </div>
        <p>{message}</p>
        <button
          onClick={onClose}
          className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
          Close
        </button>
      </div>
    </div>
  );
};

export default ConfirmationModal;
