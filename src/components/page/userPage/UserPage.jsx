import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import api from "../../../api/index";
import { useNavigate, useParams } from "react-router-dom";
import QualitiesList from "../../ui/qualities/QualitiesList";

const UserPage = ({ userId }) => {
    const navigate = useNavigate();
    const params = useParams();
    const [user, setUser] = useState();
    useEffect(() => {
        api.users.getById(userId).then((data) => setUser(data));
    }, []);
    const handleClick = () => {
        navigate(`/users/${params.userId}/edit`);
    };

    if (user) {
        return (
            <div>
                <h1> {user.name}</h1>
                <h2>Профессия: {user.profession.name}</h2>
                <QualitiesList qualities={user.qualities} />
                <p>completedMeetings: {user.completedMeetings}</p>
                <h2>Rate: {user.rate}</h2>
                <button onClick={handleClick}> Изменить</button>
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
