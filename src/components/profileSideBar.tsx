import * as React from "react";
import Card from "@mui/material/Card";
import { getUserData } from "../helpers/getData";
import { PrivateUser } from "../models/user";

export default function ProfileSideBar() {
    const [user, setUser] = React.useState(new PrivateUser());
    React.useEffect(() => {
        getUser();
    }, []);

    const getUser = async () => {
        let userData = await getUserData();
        if (userData !== undefined) {
            setUser(userData);
        }
    };

    // TODO: Finish the user profile card.
    return <Card variant="outlined">{user.username}</Card>;
}
