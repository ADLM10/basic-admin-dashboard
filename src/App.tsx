import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import Dashboard from "./Dashboard";
import { UserDataProvider } from "./context/UserDataProvider";

const queryClient = new QueryClient();

function App() {
  return (
    <div className="h-screen w-screen bg-gradient-to-r from-slate-400 to-teal-100 p-4">
      <QueryClientProvider client={queryClient}>
        <UserDataProvider>
          <Dashboard />
        </UserDataProvider>
      </QueryClientProvider>
    </div>
  );
}

export default App;
