import React, { useState, ReactNode } from "react";
import UserContext from "./userContext";

type User = {
  name: string;
  email: string;
};

type UserContextProviderProps = {
  children: ReactNode;
};

const UserContextProvider: React.FC<UserContextProviderProps> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
