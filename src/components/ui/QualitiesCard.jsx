import React from "react";
import QualitiesList from "./qualities/QualitiesList";
import PropTypes from "prop-types";

const QualitiesCard = ({ data }) => {
    return (
        <div className="card mb-3">
            <div className="card-body d-flex flex-column justify-content-center text-center">
                <h4 className="card-title">Qualities</h4>
                <p className="card-text">
                    <QualitiesList qualities={data} />
                </p>
            </div>
        </div>
    );
};
QualitiesCard.propTypes = {
    data: PropTypes.array
};

export default QualitiesCard;
