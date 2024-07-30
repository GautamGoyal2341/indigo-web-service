import React, { useState, useRef, useEffect } from "react";
import axios from "axios";

const FlightStatusChoices = [
  { value: "scheduled", label: "Scheduled" },
  { value: "on_time", label: "On Time" },
  { value: "delayed", label: "Delayed" },
  { value: "canceled", label: "Canceled" },
  { value: "boarding", label: "Boarding" },
  { value: "in_air", label: "In Air" },
  { value: "landed", label: "Landed" },
];

const AlertModal = ({ isOpen, onClose, onSuccess }) => {
  const [flightDetails, setFlightDetails] = useState("");
  const [status, setStatus] = useState("");
  const modalRef = useRef();
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/notifications/`, {
        flight_details: flightDetails,
        status,
      });
      onSuccess();
    } catch (error) {
      console.error("Error sending alert:", error);
      alert("Failed to send alert. Please try again.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
      <div
        ref={modalRef}
        className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white"
      >
        <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
          Send Flight Alert
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="flightDetails"
              className="block text-sm font-medium text-gray-700"
            >
              Flight Details and Message
            </label>
            <input
              type="text"
              id="flightDetails"
              value={flightDetails}
              onChange={(e) => setFlightDetails(e.target.value)}
              className="mt-1 block w-full rounded-md border-black p-2 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="status"
              className="block text-sm font-medium text-gray-700"
            >
              Status
            </label>
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="mt-1 block w-full rounded-md border-black p-2 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            >
              <option value="">Select a status</option>
              {FlightStatusChoices.map((choice) => (
                <option key={choice.value} value={choice.value}>
                  {choice.label}
                </option>
              ))}
            </select>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="mr-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
            >
              Send Alert
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AlertModal;
