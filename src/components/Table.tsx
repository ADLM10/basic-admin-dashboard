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
import Pagination from "./Pagination";

type Modal = {
  show: boolean;
  modalName: string;
  details: User;
};

const Table = () => {
  const { users, pageNo } = useUserContext();

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
            <div className="flex justify-evenly items-start text-base md:text-2xl gap-2">
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

  const tableInstance = useTable(
    { columns, data, initialState: { pageIndex: pageNo } },
    useSortBy,
    usePagination
  );

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
      <div className="w-full h-full overflow-x-auto overflow-y-auto">
        <table
          {...getTableProps()}
          className="border-collapse border border-gray-300 w-full mt-4 rounded-lg
        "
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
      </div>
      <Pagination
        tableInstance={tableInstance}
        pageOptions={pageOptions}
        pageIndex={pageIndex}
      />
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
