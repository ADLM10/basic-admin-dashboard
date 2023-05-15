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
      <nav className="h-full w-full gap-4 bg-slate-100 px-3 py-3 rounded-t-lg flex justify-between items-center md:h-36 lg:h-16">
        <div className=" flex-col justify-center items-center w-16 text-xs lg:w-full md:w-44">
          <h1 className="text-xl font-bold">Users</h1>
          <span className="text-xs">
            Administer team members and account permissions from here.
          </span>
        </div>
        <div
          className="flex flex-col gap-4 justify-evenly items-center w-1/4  md:flex-row md:w-2/3 text-xs lg:text-sm
        "
        >
          <span className="bg-sky-600 text-white w-24 h-10 md:w-32  flex justify-center items-center rounded-full shadow-md relative">
            <span>{users.length} Users</span>
            <span className="fas fa-user ml-2"></span>
          </span>
          <span className="bg-white text-black w-32 h-10 md:w-44  flex justify-center items-center rounded-full shadow-md relative">
            <span className="h-2 w-2 rounded-full bg-green-500 absolute top-1 md:top-4 md:left-3.5 animate-ping"></span>
            <span className="h-2 w-2 rounded-full bg-green-500 absolute top-1 md:top-4 md:left-3.5 animate-pulse"></span>
            <span className="ml-1">{activeUserCount} Active Users</span>
            <span className="fas fa-user ml-2"></span>
          </span>
        </div>
        <div className="flex flex-col justify-evenly items-center w-1/4 h-48 lg:w-5/6 lg:flex-row gap-2">
          <button
            className="bg-yellow-300 text-black w-16 h-10 md:w-48 md:h-12  rounded-lg shadow-lg flex gap-2 justify-center items-center
         hover:shadow-xl transition duration-300 ease-in-out download-btn hover:bg-yellow-500 hover:text-white"
          >
            <CSVLink
              data={users}
              headers={Headers}
              filename={"users.csv"}
              className="flex gap-2 justify-center items-center"
            >
              <img
                className="transition duration-300 ease-in-out md:h-5 md:w-5"
                src="https://img.icons8.com/ios/25/download-from-cloud--v1.png"
                alt="download-from-cloud--v1"
              />
              <span className="hidden md:block">Download CSV</span>
            </CSVLink>
          </button>
          <button
            className="bg-blue-600 text-white w-16 h-10 md:w-48 md:h-12 rounded-lg shadow-xl flex gap-2 justify-center items-center
        hover:bg-blue-800 hover:shadow-2xl transition duration-300 ease-in-out
        "
            onClick={() => {
              setShowModal(true);
            }}
          >
            <span className="fas fa-user-plus"></span>
            <span className="transition duration-300 ease-in-out hidden md:block">
              Add User
            </span>
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
