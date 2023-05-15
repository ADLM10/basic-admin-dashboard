import { useState } from "react";
import { useUserContext } from "../../context/UserDataProvider";
import { User } from "../../types/User";
import { toast } from "react-toastify";

const EditUserModal = ({
  userDetails,
  showModal,
  closeModal,
}: {
  userDetails: User;
  showModal: boolean;
  closeModal: () => void;
}) => {
  const {
    profileImageUrl,
    fullName,
    email,
    gender,
    role,
    isActive,
    lastLogin,
    id,
  } = userDetails;

  const { users, setUsers } = useUserContext();

  const [editUser, setEditUser] = useState({
    fullName: fullName,
    email: email,
    gender: gender,
    role: role,
    isActive: isActive,
    lastLogin: lastLogin,
    profileImageUrl: profileImageUrl,
  });

  const editUserHandler = async () => {
    const res = await fetch(`${import.meta.env.VITE_DB_URL as string}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editUser),
    });

    const data = await res.json();

    if (data) {
      const idx = users.findIndex((user) => user.id === id);
      const updatedUsers = users;
      updatedUsers[idx] = data;
      setUsers([...updatedUsers]);
      toast.success("User updated successfully!", {
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

    closeModal();
  };

  return (
    <>
      <div
        className={`${
          showModal ? "flex" : "hidden"
        } fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 backdrop-blur-sm z-50 flex justify-center items-center`}
      >
        <div
          className="bg-white w-11/12 md:w-3/4 h-[90%] rounded-lg shadow-lg justify-center items-center flex-col p-4
        overflow-y-scroll
        "
        >
          <div className="w-full h-16 flex justify-between px-10 items-center">
            <h1 className="text-2xl font-bold">Edit User</h1>
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
              editUserHandler();
            }}
            className="h-[85%] flex flex-col justify-start items-start gap-5 p-5"
          >
            <div className="w-full h-fit flex flex-col md:flex-row  justify-evenly items-center bg-gray-200 shadow-2xl rounded-xl py-5 px-1">
              <label
                htmlFor="fullName"
                className="text-sm text-black font-semibold ml-4"
              >
                Full Name
              </label>
              <input
                type="text"
                placeholder="Full Name"
                className="w-11/12 h-8 outline-none px-2 py-1 m-2 rounded-lg shadow-lg border border-gray-300 "
                value={editUser.fullName}
                onChange={(e) => {
                  setEditUser({
                    ...editUser,
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
                className="w-11/12 h-8 outline-none px-2 py-1 m-2 rounded-lg shadow-lg border border-gray-300"
                value={editUser.email}
                onChange={(e) => {
                  setEditUser({
                    ...editUser,
                    email: e.target.value,
                  });
                }}
              />
            </div>
            <div className="w-full h-fit flex justify-start gap-3 items-center bg-gray-200 shadow-2xl rounded-xl p-5">
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
                    checked={editUser.gender === "Male"}
                    onChange={(e) => {
                      setEditUser({
                        ...editUser,
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
                    checked={editUser.gender === "Female"}
                    onChange={(e) => {
                      setEditUser({
                        ...editUser,
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
                value={editUser.role}
                onChange={(e) => {
                  setEditUser({
                    ...editUser,
                    role: e.target.value,
                  });
                }}
              >
                <option value="Admin">Admin</option>
                <option value="User">User</option>
                <option value="Moderator">Moderator</option>
              </select>
            </div>
            <div className="w-full h-fit flex flex-col md:flex-row  justify-evenly items-center bg-gray-200 shadow-2xl rounded-xl py-5 px-1">
              <label
                htmlFor="profileImageUrl"
                className="text-sm text-black font-semibold ml-4"
              >
                Profile Image URL
              </label>
              <input
                type="text"
                placeholder="Profile Image URL"
                className="w-11/12 h-8 outline-none px-2 py-1 m-2 rounded-lg shadow-lg border border-gray-300 "
                value={editUser.profileImageUrl}
                onChange={(e) => {
                  setEditUser({
                    ...editUser,
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
                <span>Save</span>
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
    </>
  );
};

export default EditUserModal;
