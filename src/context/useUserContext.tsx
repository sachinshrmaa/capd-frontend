// useUserContext.ts
import React from "react";
import UserContext from "./userContext";

const useUserContext = () => {
  const context = React.useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserContextProvider");
  }
  return context;
};

export default useUserContext;
