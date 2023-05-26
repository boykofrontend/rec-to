import Cookies from "universal-cookie";
import { IUser } from "../types/types";
const cookies = new Cookies();

export const cookiesSetUserData = (value: IUser): void =>
  cookies.set("user_data", value, { path: "/" });

export const cookiesGetUserData = (): IUser => cookies.get("user_data");

export const cookiesRemoveUserData = (): void =>
  cookies.remove("user_data", { path: "/" });
