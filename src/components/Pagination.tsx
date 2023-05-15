import { TableInstance } from "react-table";
import {  useUserContext } from "../context/UserDataProvider";
import { User } from "../types/User";

const Pagination = ({
  tableInstance,
  pageOptions,
  pageIndex,
}: {
  tableInstance: TableInstance<User>;
  pageOptions: number[];
  pageIndex: number;
}) => {

    const { setPageNo } = useUserContext();

  return (
    <div className="flex flex-col md:flex-row gap-5 justify-between items-center mt-4 bg-slate-100 w-full p-4 rounded-b-lg">
      <button
        className={`px-4 py-2 rounded-lg  flex gap-2 justify-center items-center ${
          pageIndex === 0
            ? ` bg-white text-black`
            : `bg-blue-500 text-white shadow-lg hover:bg-blue-800 hover:shadow-xl transition duration-300 ease-in-out`
        }`}
        onClick={() => {
          pageIndex > 0 && tableInstance.previousPage();
          pageIndex > 0 && setPageNo(pageIndex - 1);
        }}
        disabled={pageIndex === 0}
      >
        <span className="fas fa-arrow-left"></span>
        <span>Previous</span>
      </button>
      <div className="flex gap-2 items-center w-full h-full justify-center">
        {pageOptions.map((pageNumber) => {
          return (
            <button
              key={pageNumber}
              className={`w-10 h-10 px-4 py-2 rounded-full shadow-lg flex gap-2 justify-center items-center
                hover:bg-teal-300 hover:shadow-xl transition duration-300 ease-in-out ${
                  pageNumber === pageIndex
                    ? "bg-teal-300 shadow-xl"
                    : "bg-white"
                }`}
              onClick={() => {
                tableInstance.gotoPage(pageNumber);
                pageIndex !== pageNumber && setPageNo(pageNumber);
              }}
            >
              {pageNumber + 1}
            </button>
          );
        })}
      </div>
      <button
        className={`px-4 py-2 rounded-lg  flex gap-2 justify-center items-center ${
          pageIndex === pageOptions.length - 1
            ? ` bg-white text-black`
            : `bg-blue-500 text-white shadow-lg hover:bg-blue-800 hover:shadow-xl transition duration-300 ease-in-out`
        }`}
        onClick={() => {
          pageIndex < pageOptions.length - 1 && tableInstance.nextPage();
          pageIndex < pageOptions.length - 1 && setPageNo(pageIndex + 1);
        }}
        disabled={pageIndex === pageOptions.length - 1}
      >
        <span>Next</span>
        <span className="fas fa-arrow-right"></span>
      </button>
    </div>
  );
};

export default Pagination;
