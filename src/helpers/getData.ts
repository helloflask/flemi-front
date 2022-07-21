import _ from "lodash";
import flemi from "./axiosInstance";

export async function getData<T>(url: string): Promise<T | undefined> {
    const token = localStorage.getItem("token");
    if (token === null) {
        return undefined;
    }
    return flemi({
        method: "get",
        url,
        headers: {
            Authorization: token,
        },
    })
        .then((response) => {
            return _.mapKeys(response.data, (__, key) => {
                return _.camelCase(key);
            }) as T | undefined;
        })
        .catch(() => undefined);
}
