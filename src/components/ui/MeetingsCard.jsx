import React from "react";
import PropTypes from "prop-types";

const MeetingsCard = ({ value }) => {
    return (
        <div className="card">
            <div className="card-body text-center">
                <h5 className="card-title">Completed meetings</h5>
                <span className="display-3">{value}</span>
            </div>
        </div>
    );
};
MeetingsCard.propTypes = {
    value: PropTypes.number
};

export default MeetingsCard;
