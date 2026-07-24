import { UsersDetail } from "@/app/provider";
import { createContext } from "react";


type UserDetailContextType = {
  userDetail?: UsersDetail;
  setUserDetail: React.Dispatch<
    React.SetStateAction<UsersDetail | undefined>
  >;
}


export const UserDetailContext =
  createContext<UserDetailContextType | undefined>(undefined);