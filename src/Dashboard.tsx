import Navbar from "./components/Navbar";
import Table from "./components/Table";

const Dashboard = () => {
  return (
    <main
      className="h-full w-[99%] flex flex-col justify-start items-center bg-white "
      style={{
        border: "2px solid black",
        borderRadius: "10px",
        padding: "20px",
        boxShadow: "0px 0px 10px 0px black",
      }}
    >
      <Navbar UserCount={10} />
      <Table />
    </main>
  );
};

export default Dashboard;
