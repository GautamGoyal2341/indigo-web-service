import React, { useEffect, useState } from "react";
import AlertModal from "./AlertModal";
import SubscribeModal from "./SubscribeModal";
import axios from "axios";
import { toast } from "react-toastify";

const FlightDetails = () => {
  const [flights, setFlights] = useState([]);
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
  const [isSubscribeModalOpen, setIsSubscribeModalOpen] = useState(false);

  const handleAlertSuccess = () => {
    toast.success("Alert sent successfully!");
    setIsAlertModalOpen(false);
  };

  const handleSubscribeSuccess = () => {
    toast.success("Subscribed successfully!");
    setIsSubscribeModalOpen(false);
  };

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/flights/`
        );
        setFlights(response.data);
      } catch (error) {
        console.error("Error fetching flight data:", error);
      }
    };

    fetchFlights();
  }, []);

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case "On Time":
        return "bg-green-100 text-green-800";
      case "Delayed":
        return "bg-yellow-100 text-yellow-800";
      case "Cancelled":
        return "bg-red-100 text-red-800";
      case "canceled":
        return "bg-red-100 text-red-800";
      case "boarding":
        return "bg-green-100 text-green-800";
      case "scheduled":
        return "bg-pink-100 text-pink-500";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="container mx-auto px-4 sm:px-8">
      <div className="py-8">
        <div className="mb-4 flex justify-between items-center">
          <h2 className="text-2xl font-semibold leading-tight">
            Flight Details
          </h2>
          <div>
            <button
              onClick={() => setIsAlertModalOpen(true)}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
            >
              Send Alert
            </button>
            <button
              onClick={() => setIsSubscribeModalOpen(true)}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              Subscribe to Alerts
            </button>
          </div>
        </div>
      </div>

      <div className="my-2 flex sm:flex-row flex-col">
        {/* Add filter inputs here if needed */}
      </div>
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full leading-normal">
          <thead>
            <tr>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Flight ID
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Airline
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Departure
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Arrival
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {flights.map((flight) => (
              <tr key={flight.id}>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <p className="text-gray-900 whitespace-no-wrap">
                    {flight.flight_id}
                  </p>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <p className="text-gray-900 whitespace-no-wrap">
                    {flight.airline.name}
                  </p>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <p className="text-gray-900 whitespace-no-wrap">
                    {new Date(flight.scheduled_departure).toLocaleString()} -{" "}
                    {flight.departure_gate.gate_number}
                  </p>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <p className="text-gray-900 whitespace-no-wrap">
                    {new Date(flight.scheduled_arrival).toLocaleString()} -{" "}
                    {flight.arrival_gate.gate_number}
                  </p>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <span
                    className={`relative inline-block px-3 py-1 font-semibold rounded-full ${getStatusBadgeColor(
                      flight.status
                    )}`}
                  >
                    {flight.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <AlertModal
        isOpen={isAlertModalOpen}
        onClose={() => setIsAlertModalOpen(false)}
        onSuccess={handleAlertSuccess}
      />
      <SubscribeModal
        isOpen={isSubscribeModalOpen}
        onClose={() => setIsSubscribeModalOpen(false)}
        onSuccess={handleSubscribeSuccess}
      />
    </div>
  );
};

export default FlightDetails;
