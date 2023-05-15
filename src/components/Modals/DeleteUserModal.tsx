import { useUserContext } from "../../context/UserDataProvider";
import { User } from "../../types/User";
import { toast } from "react-toastify";

const DeleteUserModal = ({
  showModal,
  closeModal,
  userDetails,
}: {
  showModal: boolean;
  closeModal: () => void;
  userDetails: User;
}) => {
  const { id } = userDetails;

  const { users, setUsers } = useUserContext();

  const deleteUser = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_DB_URL as string}/${id}`,
      {
        method: "DELETE",
      }
    );
    if (response.ok) {
      const idx = users.findIndex((user) => user.id === id);
      const updatedUsers = users;
      updatedUsers.splice(idx, 1);
      //Setting the users in the context for real time update
      setUsers([...updatedUsers]);
      toast.success("User deleted successfully!", {
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
    <div
      className={`${
        showModal ? "flex" : "hidden"
      } fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 backdrop-blur-sm z-50 flex justify-center items-center`}
    >
      <div className="bg-white w-3/4 md:w-2/5 h-80 md:h-64 rounded-lg shadow-lg justify-center items-center flex-col p-4">
        <div className="w-full h-full flex flex-col justify-evenly items-center bg-red-100 rounded-lg">
          <div className="w-full h-fit flex flex-col md:flex-row justify-center items-center gap-4 ">
            <span className="fas fa-exclamation-triangle text-red-500 text-4xl"></span>
            <p className=" text-lg  text-center">
              Are you sure you want to delete <br />
              <span className="font-semibold">{userDetails.fullName}</span>?
            </p>
          </div>
          <div className="flex flex-col md:flex-row justify-center items-center gap-5">
            <button
              className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-xl flex gap-2 justify-center items-center hover:bg-red-800 hover:shadow-2xl transition duration-300 ease-in-out"
              onClick={() => {
                closeModal();
              }}
            >
              <span className="fas fa-times"></span>
              <span>Cancel</span>
            </button>
            <button
              className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-xl flex gap-2 justify-center items-center hover:bg-green-800 hover:shadow-2xl transition duration-300 ease-in-out"
              onClick={() => {
                deleteUser();
              }}
            >
              <span className="fas fa-check"></span>
              <span>Confirm</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteUserModal;
