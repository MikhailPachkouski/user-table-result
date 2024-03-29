import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import qualitiesService from "../services/qualities.service";
import { toast } from "react-toastify";

const QualitiesContext = React.createContext();

export const useQualities = () => {
    return useContext(QualitiesContext);
};

const QualitiesProvider = ({ children }) => {
    const [qualities, setQualities] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        getQualitiesList();
    }, []);
    useEffect(() => {
        if (error !== null) {
            toast(error);
            setError(null);
        }
    }, [error]);

    async function getQualitiesList() {
        try {
            const { content } = await qualitiesService.get();
            setQualities(content);
            setIsLoading(false);
        } catch (error) {
            errorCatcher(error);
        }
    }
    function getQuality(id) {
        return qualities.find((q) => q._id === id);
    }
    function errorCatcher(error) {
        const { message } = error.response.data;
        setError(message);
    }
    return (
        <QualitiesContext.Provider
            value={{ qualities, isLoading, getQuality }}
        >
            {children}
        </QualitiesContext.Provider>
    );
};
QualitiesProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default QualitiesProvider;
