import { useMemo } from "react";
import { useUserContext } from "../context/UserDataProvider";
import { Column, useTable } from "react-table";
import { User } from "../context/UserDataProvider";
import Badge from "./Badge";
import DateTime from "./DateTime";

const Table = () => {
  const { users } = useUserContext();

  const data = useMemo(() => users, [users]);
  const columns = useMemo<Column<User>[]>(
    () => [
      {
        Header: "Name",
        accessor: "fullName",
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
    ],
    []
  );

  const tableInstance = useTable({ columns, data });

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
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
                  {...column.getHeaderProps()}
                  className="bg-slate-100 text-left px-2 py-2"
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row: any) => {
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
      {/* <div className="flex justify-between items-center mt-4">
        <div className="flex justify-center items-center">
          <span className="text-sm text-gray-500">Page</span>
          <span className="text-sm text-gray-500 mx-2">{pageIndex + 1}</span>
          <span className="text-sm text-gray-500">of</span>
          <span className="text-sm text-gray-500 mx-2">
            {pageOptions.length}
          </span>
        </div>
        <div className="flex justify-center items-center">
          <button
            className="bg-white text-black px-4 py-2 rounded-lg shadow-lg flex gap-2 justify-center items-center
                hover:bg-teal-300 hover:shadow-xl transition duration-300 ease-in-out"
            onClick={() => pageIndex > 0 && tableInstance.previousPage()}
          >
            <span className="fas fa-arrow-left"></span>
            <span>Previous</span>
          </button>
          <button
            className="bg-white text-black px-4 py-2 rounded-lg shadow-lg flex gap-2 justify-center items-center
                hover:bg-teal-300 hover:shadow-xl transition duration-300 ease-in-out"
            onClick={() =>
              pageIndex < pageOptions.length - 1 && tableInstance.nextPage()
            }
          >
            <span>Next</span>
            <span className="fas fa-arrow-right"></span>
          </button>
        </div>
      </div> */}
    </>
  );
};

export default Table;
