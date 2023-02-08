import React from "react";
import PropTypes from "prop-types";

const TableHeader = ({ selectedSort, onSort, columns }) => {
    const handleSort = (item) => {
        if (selectedSort.iter === item) {
            onSort({
                ...selectedSort,
                order: selectedSort.order === "asc" ? "desc" : "asc"
            });
        } else {
            onSort({ iter: item, order: "asc" });
        }
    };
    return (
        <thead>
            <tr>
                {Object.keys(columns).map((column) => (
                    <th
                        key={column}
                        onClick={() =>
                            columns[column].iter
                                ? handleSort(columns[column].iter)
                                : undefined
                        }
                        scope="col"
                        {...{ role: columns[column].iter && "button" }}
                        // role={columns[column].iter && "button"}
                    >
                        {columns[column].name}
                        {selectedSort.iter === columns[column].iter && selectedSort.order === "asc" ? <i className="bi bi-caret-down-fill"></i> : selectedSort.iter === columns[column].iter && selectedSort.order === "desc" ? <i className="bi bi-caret-up-fill"></i> : ""}
                    </th>
                ))}
            </tr>
        </thead>
    );
};
TableHeader.propTypes = {
    selectedSort: PropTypes.object.isRequired,
    onSort: PropTypes.func.isRequired,
    columns: PropTypes.object.isRequired
};

export default TableHeader;
