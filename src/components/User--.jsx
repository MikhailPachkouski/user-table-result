import React from "react";
import Bookmark from "./Bookmark";
import Qualitie from "./Qualitie";
import PropTypes from "prop-types";

const User = ({ user, onDelete, onToggle }) => {
    return (
        <tr>
            <th scope="row">{user.name}</th>
            <td>
                {user.qualities.map((quality) => (
                    <Qualitie key={quality._id} {...quality} />
                ))}
            </td>
            <td>{user.profession.name}</td>
            <td>{user.completedMeetings}</td>
            <td>{user.rate}/5</td>
            <td>
                <Bookmark
                    status={user.bookmark}
                    id={user._id}
                    onToggle={onToggle}
                />
            </td>
            <td>
                <button
                    className="btn btn-danger"
                    onClick={() => onDelete(user._id)}
                >
                    delete
                </button>
            </td>
        </tr>
    );
};

User.propTypes = {
    user: PropTypes.object.isRequired,
    onDelete: PropTypes.func.isRequired,
    onToggle: PropTypes.func.isRequired
};

export default User;
