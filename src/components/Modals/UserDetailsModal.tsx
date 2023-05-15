import { User } from "../../types/User";
import Badge from "../Badge";

const UserDetailsModal = ({
  showModal,
  closeModal,
  userDetails,
}: {
  showModal: boolean;
  closeModal: () => void;
  userDetails: User;
}) => {
  const {
    profileImageUrl,
    fullName,
    email,
    gender,
    role,
    isActive,
    lastLogin,
  } = userDetails;

  return (
    <>
      <div
        className={`${
          showModal ? "flex" : "hidden"
        } fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 backdrop-blur-sm z-50 flex justify-center items-center`}
      >
        <div className="bg-white p-6 rounded-xl w-72 h-[400px]">
          <div className="flex justify-center">
            <img
              src={profileImageUrl}
              alt="Profile"
              className="w-20 h-20 rounded-full object-cover"
            />
          </div>
          <div className="text-center my-4">
            <h2 className="text-xl font-semibold">{fullName}</h2>
            <p className="text-gray-600">{email}</p>
          </div>
          <div className="flex justify-center gap-16 items-center mx-3 my-4">
            <div className="text-center ">
              <h4 className="text-gray-600 font-semibold">Gender</h4>
              <p>{gender}</p>
            </div>
            <div className="text-center ">
              <h4 className="text-gray-600 font-semibold">Role</h4>
              <p>{role}</p>
            </div>
          </div>
          <div className="flex justify-center gap-10 items-center mx-3 my-4 ">
            <div className="text-center">
              <h4 className="text-gray-600 font-semibold">Last Login</h4>
              <p>{new Date(lastLogin).toLocaleDateString()}</p>
              <p>
                {new Date(lastLogin).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
            <div className="w-20 h-full flex flex-col justify-center items-center text-xs ">
              <h4 className="text-gray-600 font-semibold mb-1">Status</h4>
              <Badge online={isActive} />
            </div>
          </div>
          <div className="flex justify-center">
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-xl flex gap-2 justify-center items-center
                hover:bg-blue-800 hover:shadow-2xl transition duration-300 ease-in-out
                "
              onClick={() => {
                closeModal();
              }}
            >
              <span className="fas fa-times"></span>
              <span>Close</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserDetailsModal;
