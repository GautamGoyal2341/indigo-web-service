import FlightDetails from "./components/FlightDetails";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

function App() {
  return (
    <>
      <FlightDetails />
      <ToastContainer />
    </>
  );
}

export default App;
