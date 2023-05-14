import Navbar from "./components/Navbar";
import Table from "./components/Table";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Dashboard = () => {
  return (
    <main
      className="h-fit w-full flex flex-col justify-start items-center bg-white rounded-2xl shadow-2xl p-5"
    >
      <Navbar />
      <Table />
      <ToastContainer />
    </main>
  );
};

export default Dashboard;
