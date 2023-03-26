import React from "react";
import { useParams } from "react-router-dom";
import EditUserPage from "../components/page/EditUserPage";
import UserPage from "../components/page/userPage";
import UsersListPage from "../components/page/UsersListPage";
import UserProvider from "../hooks/useUser";

const Users = () => {
    const { userId, edit } = useParams();
    return (
        <>
            <UserProvider>
                {userId ? (
                    edit ? (
                        <EditUserPage />
                    ) : (
                        <UserPage userId={userId} />
                    )
                ) : (
                    <UsersListPage />
                )}
            </UserProvider>
        </>
    );
};

export default Users;
