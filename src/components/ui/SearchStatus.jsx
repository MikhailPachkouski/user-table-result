import React from "react";
import PropTypes from "prop-types";

const SearchStatus = ({ number }) => {
    const renderPhrase = (number) => {
        return [2, 3, 4].includes(number)
            ? "человека тусанут"
            : "человек тусанет";
    };

    if (!number) {
        return (
            <h3>
                <span className="badge bg-danger">
                    Никто не тусанет с тобой сегодня
                </span>
            </h3>
        );
    }
    return (
        <h3>
            <span className="badge bg-primary">
                {number} {renderPhrase(number)} с тобой сегодня
            </span>
        </h3>
    );
};

SearchStatus.propTypes = {
    number: PropTypes.number.isRequired
};

export default SearchStatus;
