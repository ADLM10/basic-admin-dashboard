import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { createContext, useState, useContext } from "react";

export type User = {
  id: number;
  fullName: string;
  gender: string;
  email: string;
  role: string;
  isActive: boolean;
  lastLogin: string;
  profileImageUrl: string;
};

interface UserContextInterface {
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
}

interface UserDataProviderProps {
  children: React.ReactNode;
}

const UserContext = createContext<UserContextInterface>({
  users: [],
  setUsers: () => {
    return;
  },
});

// eslint-disable-next-line react-refresh/only-export-components
export function useUserContext() {
  return useContext(UserContext);
}

export const UserDataProvider = (props: UserDataProviderProps) => {
  const [users, setUsers] = useState<User[]>([]);

  const { isLoading } = useQuery({
    queryKey: ["userData"],
    queryFn: () =>
      axios
        .get("https://my-json-server.typicode.com/ADLM10/mock-user-db/users")
        .then((res) => {
          res.data.length > 0 && setUsers(res.data);
        }),
  });

  if (isLoading) return <div>Loading ...</div>;

  const { children } = props;

  return (
    <UserContext.Provider value={{ users, setUsers }}>
      {children}
    </UserContext.Provider>
  );
};
