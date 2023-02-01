import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import api from "../api/index";
// import QualitiesList from "./QualitiesList";
// import { useNavigate } from "react-router-dom";

const UserPage = ({ userId }) => {
    // const navigate = useNavigate();
    const [user] = useState();
    useEffect(() => {
        api.users.getById(userId).then((data) => console.log(data));
        console.log(user, userId);
    }, []);
    console.log(user, userId);
    // const handleClick = () => {
    //     navigate("/users");
    // };

    if (user) {
        return (
            <div>
                {/* <h1> {user.name}</h1>
            <h2>Профессия: {user.profession.name}</h2>
            <QualitiesList qualities={user.qualities} />
            <p>completedMeetings: {user.completedMeetings}</p>
            <h2>Rate: {user.rate}</h2>
            <button onClick={handleClick}> Все Пользователи</button> */}
            </div>
        );
    } else {
        return <h1>Loading...</h1>;
    }
};

UserPage.propTypes = {
    userId: PropTypes.string.isRequired
};
export default UserPage;
