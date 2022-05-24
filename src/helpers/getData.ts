import _ from "lodash";
import flog from "./axiosInstance";
import { PrivateUser } from "../models/user";

export async function getUserData(): Promise<PrivateUser | undefined> {
    const token = localStorage.getItem("token")!;
    return flog({
        method: "get",
        url: "/me",
        headers: {
            Authorization: token,
        },
    })
        .then((response) => {
            return _.mapKeys(response.data, (__, key) => {
                return _.camelCase(key);
            }) as PrivateUser | undefined;
        })
        .catch(() => undefined);
}
