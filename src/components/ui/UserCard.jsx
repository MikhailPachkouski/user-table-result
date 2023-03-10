import React from "react";
import PropTypes from "prop-types";
import { useLocation, useNavigate } from "react-router-dom";

const UserCard = ({ user }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(`${location.pathname}/edit`);
    };
    return (
        <div className="card mb-3">
            <div className="card-body">
                <button
                    className="btn btn-light btn-sm position-absolute top-0 end-0"
                    onClick={handleClick}
                >
                    <i className="bi bi-gear"></i>
                </button>
                <div className="d-flex flex-column align-items-center">
                    <img
                        src={`https://avatars.dicebear.com/api/avataaars/${(
                            Math.random() + 1
                        )
                            .toString(36)
                            .substring(7)}.svg`}
                        className="rounded-circle"
                        width="150"
                    />
                    <h3>{user.name}</h3>
                    <p className="text-secondary mb-1">
                        {user.profession.name}
                    </p>
                    <div className="text-muted">
                        <i
                            className="bi bi-caret-down-fill text-primary"
                            role="button"
                        ></i>
                        <i
                            className="bi bi-caret-up text-secondary"
                            role="button"
                        ></i>
                        <span className="ms-2">{user.rate}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
UserCard.propTypes = {
    user: PropTypes.string.isRequired
};

export default UserCard;
