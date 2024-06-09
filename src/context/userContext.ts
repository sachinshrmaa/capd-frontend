// userContext.ts
import React from "react";

type User = {
  name: string;
  email: string;
};

type UserContextType = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
};

const UserContext = React.createContext<UserContextType | undefined>(undefined);

export default UserContext;
