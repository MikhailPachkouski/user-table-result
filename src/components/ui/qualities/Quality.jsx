import React from "react";
import PropTypes from "prop-types";
import { useQualities } from "../../../hooks/useQualities";

const Quality = ({ id }) => {
    const { getQuality } = useQualities();
    const { name, color } = getQuality(id);
    return <span className={`badge bg-${color} m-1`}>{name}</span>;
};
Quality.propTypes = {
    id: PropTypes.string.isRequired
};

export default Quality;
