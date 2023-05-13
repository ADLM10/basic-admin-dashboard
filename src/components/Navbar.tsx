const Navbar = ({ UserCount }: { UserCount: number }) => {
  return (
    <nav className="h-16 w-full bg-slate-100 px-3 py-3 rounded-t-lg flex justify-between items-center">
      <div className=" flex-col justify-center items-center">
        <h1 className="text-xl font-bold">Users</h1>
        <span className="text-sm">
          Administer team members and account permissions from here.
        </span>
      </div>
      <span className="bg-sky-600 text-white px-6 py-2 rounded-full shadow-md relative">
        <span className="h-2 w-2 rounded-full bg-green-500 absolute top-4 left-3  animate-ping"></span>
        <span className="h-2 w-2 rounded-full bg-green-500 absolute top-4 left-3  animate-pulse"></span>
        {UserCount} Users
        <span className="fas fa-user ml-2"></span>
      </span>
      <div className="flex justify-evenly items-center w-1/4">
        <button
          className="bg-white text-black px-4 py-2 rounded-lg shadow-lg flex gap-2 justify-center items-center
        hover:bg-teal-300 hover:shadow-xl transition duration-300 ease-in-out"
        >
          <img
            width="25"
            height="25"
            src="https://img.icons8.com/ios/25/download-from-cloud--v1.png"
            alt="download-from-cloud--v1"
          />
          <span>Download CSV</span>
        </button>
        <button
        className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-xl flex gap-2 justify-center items-center
        hover:bg-blue-800 hover:shadow-2xl transition duration-300 ease-in-out
        "
        >
          <span className="fas fa-user-plus"></span>
          Add User
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
