import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { createContext, useState, useContext } from "react";

export type User = {
  id: string;
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
  pageNo: number;
  setPageNo: React.Dispatch<React.SetStateAction<number>>;
}

interface UserDataProviderProps {
  children: React.ReactNode;
}

const UserContext = createContext<UserContextInterface>({
  users: [],
  setUsers: () => {
    return;
  },
  pageNo: 1,
  setPageNo: () => {
    return;
  },
});

// eslint-disable-next-line react-refresh/only-export-components
export function useUserContext() {
  return useContext(UserContext);
}

export const UserDataProvider = (props: UserDataProviderProps) => {
  const [users, setUsers] = useState<User[]>([]);

  const [pageNo, setPageNo] = useState<number>(1);

  const { isLoading } = useQuery({
    queryKey: ["userData"],
    queryFn: () =>
      axios.get(import.meta.env.VITE_DB_URL as string).then((res) => {
        res.data.length > 0 && setUsers(res.data);
      }),
  });

  if (isLoading) return <div>Loading ...</div>;

  const { children } = props;

  const value = {
    users,
    setUsers,
    pageNo,
    setPageNo,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
