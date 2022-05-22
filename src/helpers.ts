import flog from "./axiosInstance";
import { PrivateUser } from "./models";

export async function getUserData(): Promise<PrivateUser | undefined> {
    const token = localStorage.getItem("token")!;
    return flog({
        method: "get",
        url: "/me",
        headers: {
            "Authorization": token,
        },
    }).then((response) => {
        return response.data;
    }).catch(() => undefined);
}
