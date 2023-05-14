import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import Dashboard from "./Dashboard";
import { UserDataProvider } from "./context/UserDataProvider";


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <main className="h-full w-full p-4">
      <QueryClientProvider client={queryClient}>
        <UserDataProvider>
          <Dashboard />
        </UserDataProvider>
      </QueryClientProvider>
    </main>
  );
}

export default App;
