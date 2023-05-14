import { useMemo, useState } from "react";
import { useUserContext } from "../context/UserDataProvider";
import { Column, usePagination, useTable, useSortBy } from "react-table";
import { User } from "../context/UserDataProvider";
import Badge from "./Badge";
import DateTime from "./DateTime";
import UserDetailsModal from "./Modals/UserDetailsModal";
import EditUserModal from "./Modals/EditUserModal";
import DeleteUserModal from "./Modals/DeleteUserModal";
import ProfilePlaceholder from "./ProfilePlaceholder";

type Modal = {
  show: boolean;
  modalName: string;
  details: User;
};

const Table = () => {
  const { users } = useUserContext();

  const [showModal, setShowModal] = useState<Modal>({
    show: false,
    modalName: "",
    details: {} as User,
  });

  const data = useMemo(() => users, [users]);
  const columns = useMemo<Column<User>[]>(
    () => [
      {
        Header: "Name",
        accessor: "fullName",
        Cell: ({ value, row }) => {
          return (
            <ProfilePlaceholder
              profileImageUrl={row.original.profileImageUrl}
              email={row.original.email}
              value={value}
            />
          );
        },
      },
      {
        Header: "Status",
        accessor: "isActive",
        Cell: ({ value }) => {
          return <Badge online={value} />;
        },
      },
      {
        Header: "Role",
        accessor: "role",
      },
      {
        Header: "Last Login",
        accessor: "lastLogin",
        Cell: ({ value }) => {
          return <DateTime value={value} />;
        },
      },
      {
        Header: "",
        accessor: "id",
        Cell: ({ row }) => {
          return (
            <div className="flex justify-evenly items-start text-2xl">
              <button
                className="text-blue-600 hover:text-blue-800"
                onClick={() => {
                  setShowModal({
                    show: true,
                    modalName: "view",
                    details: row.original,
                  });
                }}
              >
                <span className="fas fa-eye"></span>
              </button>
              <button
                className="text-yellow-600 hover:text-yellow-800"
                onClick={() => {
                  setShowModal({
                    show: true,
                    modalName: "edit",
                    details: row.original,
                  });
                }}
              >
                <span className="fas fa-edit"></span>
              </button>
              <button
                className="text-red-600 hover:text-red-800"
                onClick={() => {
                  setShowModal({
                    show: true,
                    modalName: "delete",
                    details: row.original,
                  });
                }}
              >
                <span className="fas fa-trash"></span>
              </button>
            </div>
          );
        },
      },
    ],
    []
  );

  const tableInstance = useTable({ columns, data }, useSortBy, usePagination);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    pageOptions,
    state: { pageIndex },
  } = tableInstance;

  return (
    <>
      <table
        {...getTableProps()}
        className="border-collapse border border-gray-300 w-full mt-4 rounded-lg"
      >
        <thead>
          {headerGroups.map((headerGroup: any) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column: any) => (
                <th
                  {...column.getHeaderProps(
                    column.getSortByToggleProps(
                      column.isSortedDesc ? "desc" : "asc"
                    )
                  )}
                  className="bg-slate-100 text-left px-2 py-2"
                >
                  {column.render("Header")}
                  <span className="ml-2">
                    {column.isSorted ? (
                      column.isSortedDesc ? (
                        <span className="fas fa-arrow-down"></span>
                      ) : (
                        <span className="fas fa-arrow-up"></span>
                      )
                    ) : (
                      ""
                    )}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row: any) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell: any) => {
                  return (
                    <td
                      {...cell.getCellProps()}
                      className="px-2 py-2 text-left"
                    >
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="flex justify-between items-center mt-4 bg-slate-100 w-full p-4 rounded-b-lg">
        <button
          className={`px-4 py-2 rounded-lg  flex gap-2 justify-center items-center ${
            pageIndex === 0
              ? ` bg-white text-black`
              : `bg-blue-500 text-white shadow-lg hover:bg-blue-800 hover:shadow-xl transition duration-300 ease-in-out`
          }`}
          onClick={() => pageIndex > 0 && tableInstance.previousPage()}
          disabled={pageIndex === 0}
        >
          <span className="fas fa-arrow-left"></span>
          <span>Previous</span>
        </button>
        <div className="flex gap-2 items-center">
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
                onClick={() => tableInstance.gotoPage(pageNumber)}
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
          onClick={() =>
            pageIndex < pageOptions.length - 1 && tableInstance.nextPage()
          }
          disabled={pageIndex === pageOptions.length - 1}
        >
          <span>Next</span>
          <span className="fas fa-arrow-right"></span>
        </button>
      </div>
      {showModal.show && showModal.modalName === "delete" && (
        <DeleteUserModal
          showModal={showModal.show}
          closeModal={() => {
            setShowModal({
              ...showModal,
              show: false,
            });
          }}
          userDetails={showModal.details}
        />
      )}
      {showModal.show && showModal.modalName === "edit" && (
        <EditUserModal
          showModal={showModal.show}
          closeModal={() => {
            setShowModal({
              ...showModal,
              show: false,
            });
          }}
          userDetails={showModal.details}
        />
      )}
      {showModal.show && showModal.modalName === "view" && (
        <UserDetailsModal
          showModal={showModal.show}
          closeModal={() => {
            setShowModal({
              ...showModal,
              show: false,
            });
          }}
          userDetails={showModal.details}
        />
      )}
    </>
  );
};

export default Table;
