import React from "react";
import { useParams } from "react-router-dom";
import EditUserPage from "../components/page/EditUserPage";
import UserPage from "../components/page/userPage";
import UsersListPage from "../components/page/UsersListPage";

const Users = () => {
    const { userId, edit } = useParams();
    return <>{userId ? (edit ? <EditUserPage/> : <UserPage userId={userId} />) : <UsersListPage />}</>;
};

export default Users;
