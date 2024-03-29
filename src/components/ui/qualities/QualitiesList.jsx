import React from "react";
import Quality from "./Quality";
import PropTypes from "prop-types";
import { useQualities } from "../../../hooks/useQualities";

const QualitiesList = ({ qualities }) => {
    const { isLoading } = useQualities();
    if (!isLoading) {
        return (
            <>
                {qualities.map((quality) => (
                    <Quality key={quality} id={quality} />
                ))}
            </>
        );
    } else return "loading...";
};
QualitiesList.propTypes = {
    qualities: PropTypes.array.isRequired
};

export default QualitiesList;
