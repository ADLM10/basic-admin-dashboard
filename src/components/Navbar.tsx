import { useState } from "react";
import { useUserContext } from "../context/UserDataProvider";
import AddUserModal from "./Modals/AddUserModal";
import { Headers } from "../utils/Headers";
import { CSVLink } from "react-csv";

const Navbar = () => {
  const { users } = useUserContext();

  const activeUserCount = users.filter((user) => user.isActive).length;

  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <nav className="h-16 w-full bg-slate-100 px-3 py-3 rounded-t-lg flex justify-between items-center">
        <div className=" flex-col justify-center items-center">
          <h1 className="text-xl font-bold">Users</h1>
          <span className="text-sm">
            Administer team members and account permissions from here.
          </span>
        </div>
        <span className="bg-sky-600 text-white px-6 py-2 rounded-full shadow-md relative">
          {users.length} Users
          <span className="fas fa-user ml-2"></span>
        </span>
        <span className="bg-white text-black px-6 py-2 rounded-full shadow-md relative">
          <span className="h-2 w-2 rounded-full bg-green-500 absolute top-4 left-3  animate-ping"></span>
          <span className="h-2 w-2 rounded-full bg-green-500 absolute top-4 left-3  animate-pulse"></span>
          <span className="ml-1">{activeUserCount} Active Users</span>
          <span className="fas fa-user ml-2"></span>
        </span>
        <div className="flex justify-evenly items-center w-1/4">
          <button
            className="bg-yellow-300 text-black px-4 py-2 rounded-lg shadow-lg flex gap-2 justify-center items-center
         hover:shadow-xl transition duration-300 ease-in-out download-btn hover:bg-yellow-500 hover:text-white"
          >
            <img
              width="25"
              height="25"
              className="transition duration-300 ease-in-out"
              src="https://img.icons8.com/ios/25/download-from-cloud--v1.png"
              alt="download-from-cloud--v1"
            />
            <span>
              <CSVLink
                data={users}
                headers={Headers}
                filename={"users.csv"}
              >
                Download CSV
              </CSVLink>
            </span>
          </button>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-xl flex gap-2 justify-center items-center
        hover:bg-blue-800 hover:shadow-2xl transition duration-300 ease-in-out
        "
            onClick={() => {
              setShowModal(true);
            }}
          >
            <span className="fas fa-user-plus"></span>
            Add User
          </button>
        </div>
      </nav>
      <AddUserModal
        showModal={showModal}
        closeModal={() => {
          setShowModal(false);
        }}
      />
    </>
  );
};

export default Navbar;
