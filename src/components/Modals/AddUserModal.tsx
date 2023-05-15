import { useState } from "react";
import { getDateTime } from "../../utils/getDateTime";
import { useUserContext } from "../../context/UserDataProvider";
import { toast } from "react-toastify";

type formData = {
  fullName: string;
  email: string;
  gender: string;
  role: string;
  isActive: boolean;
  lastLogin: string;
  profileImageUrl: string;
};

const AddUserModal = ({
  showModal,
  closeModal,
}: {
  showModal: boolean;
  closeModal: () => void;
}) => {
  const { users, setUsers } = useUserContext();

  const [formData, setFormData] = useState<formData>({
    fullName: "",
    email: "",
    gender: "",
    role: "Admin",
    isActive: false,
    lastLogin: "",
    profileImageUrl: "",
  });

  const addUser = async () => {
    const newUser = {
      ...formData,
      isActive: true,
      lastLogin: getDateTime(),
    };

    const res = await fetch(import.meta.env.VITE_DB_URL as string, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    });

    const data = await res.json();

    if (data) {
      setUsers([...users, data]);
      toast.success("User added successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: false,
        progress: undefined,
      });
    } else {
      toast.error("Something went wrong!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: false,
        progress: undefined,
      });
    }

    console.log(data);

    setFormData({
      fullName: "",
      email: "",
      gender: "",
      role: "",
      isActive: false,
      lastLogin: "",
      profileImageUrl: "",
    });

    closeModal();
  };

  return (
    <>
      {showModal && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 backdrop-blur-sm z-50 flex justify-center items-center">
          <div
            className="bg-white w-11/12 md:3/4 h-[90%] rounded-lg shadow-lg justify-center items-center flex-col p-4
          overflow-y-scroll
          "
          >
            <div className="w-full h-16 flex justify-between px-10 items-center">
              <h1 className="text-2xl font-bold">Add User</h1>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-xl flex gap-2 justify-center items-center hover:bg-red-800 hover:shadow-2xl transition duration-300 ease-in-out"
                onClick={closeModal}
              >
                <span className="fas fa-times"></span>
                <span>Close</span>
              </button>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                addUser();
              }}
              className="h-[85%] flex flex-col justify-start items-start gap-5 p-5"
            >
              <div className="w-full h-fit flex-col md:flex-row  justify-evenly items-center bg-gray-200 shadow-2xl rounded-xl py-5 px-1">
                <label
                  htmlFor="fullName"
                  className="text-sm text-black font-semibold ml-4"
                >
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-11/12 h-8 outline-none px-2 py-1 m-2 rounded-lg shadow-lg border border-gray-300 "
                  value={formData.fullName}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      fullName: e.target.value,
                    });
                  }}
                />
              </div>
              <div className="w-full h-fit flex-col md:flex-row  justify-evenly items-center bg-gray-200 shadow-2xl rounded-xl py-5 px-1">
                <label
                  htmlFor="email"
                  className="text-sm text-black font-semibold ml-4"
                >
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Email"
                  className="w-11/12 h-8 outline-none px-2 py-1 m-2 rounded-lg shadow-lg border border-gray-300  "
                  value={formData.email}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      email: e.target.value,
                    });
                  }}
                />
              </div>
              <div className="w-full h-fit flex justify-evenly items-center bg-gray-200 shadow-2xl rounded-xl p-5">
                <label
                  htmlFor="gender"
                  className="text-sm text-black font-semibold"
                >
                  Gender
                </label>
                <div className="flex items-center">
                  <label className="mr-3">
                    <input
                      type="radio"
                      value="Male"
                      checked={formData.gender === "Male"}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          gender: e.target.value,
                        });
                      }}
                      className="mr-1"
                    />
                    Male
                  </label>
                  <label>
                    <input
                      type="radio"
                      value="Female"
                      checked={formData.gender === "Female"}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          gender: e.target.value,
                        });
                      }}
                      className="mr-1"
                    />
                    Female
                  </label>
                </div>
              </div>
              <div className="w-full h-fit flex justify-evenly items-center bg-gray-200 shadow-2xl rounded-xl p-5">
                <label
                  htmlFor="role"
                  className="text-sm text-black font-semibold"
                >
                  Role
                </label>
                <select
                  name="role"
                  id="role"
                  className="w-3/4 h-8 outline-none px-2 py-1  rounded-lg shadow-lg border border-gray-300 "
                  value={formData.role}
                  defaultValue={formData.role}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      role: e.target.value,
                    });
                  }}
                >
                  <option value="Admin">Admin</option>
                  <option value="User">User</option>
                  <option value="Moderator">Moderator</option>
                </select>
              </div>
              <div className="w-full h-fit flex justify-evenly items-center bg-gray-200 shadow-2xl rounded-xl p-5">
                <label
                  htmlFor="profileImageUrl"
                  className="text-sm text-black font-semibold"
                >
                  Profile Image URL
                </label>
                <input
                  type="text"
                  placeholder="Profile Image URL"
                  className="w-3/4 h-8 outline-none px-2 py-1  rounded-lg shadow-lg border border-gray-300 "
                  value={formData.profileImageUrl}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      profileImageUrl: e.target.value,
                    });
                  }}
                />
              </div>
              <div className="w-full h-full flex justify-end items-center gap-3">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-xl flex gap-2 justify-center items-center mb-4"
                >
                  <span className="fas fa-user-plus"></span>
                  <span>Add User</span>
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-xl flex gap-2 justify-center items-center hover:bg-red-800 hover:shadow-2xl transition duration-300 ease-in-out mb-4"
                  onClick={closeModal}
                >
                  <span className="fas fa-times"></span>
                  <span>Cancel</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AddUserModal;
