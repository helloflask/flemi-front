import * as React from "react";
import Card from "@mui/material/Card";
import { getUserData } from "./helpers";
import { PrivateUser } from "./models";


const ProfileSideBar = () => {
    const [user, setUser] = React.useState(new PrivateUser());
    React.useEffect(() => {
        if (user.id === 0) {
            getUser();
        }
    });

    const getUser = async () => {
        let userData = await getUserData();
        if (userData !== undefined) {
            setUser(userData)
        }
    }

	// TODO: Finish the user profile card.
	return (
        <Card variant="outlined">
            {user.username}
        </Card>
    );
}

export default ProfileSideBar;
