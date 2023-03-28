import React from "react";
import PropTypes from "prop-types";
import Bookmark from "../common/Bookmark";
import Qualities from "./qualities";
import Table from "../common/table";
import { Link } from "react-router-dom";
import Profession from "./Profession";

const UsersTable = ({
    users,
    onSort,
    selectedSort,
    onToggle,
    onDelete,
    ...rest
}) => {
    const columns = {
        name: { iter: "name", name: "Имя", component: (user) => <Link to={`/users/${user._id}`}>{user.name}</Link> },
        qualities: {
            name: "Качества",
            component: (user) => <Qualities qualities={user.qualities} />
        },
        professions: { name: "Профессия", component: (user) => <Profession id={user.profession}/> },
        completedMeetings: {
            iter: "completedMeetings",
            name: "Встретился, раз"
        },
        rate: { iter: "rate", name: "Оценка" },
        bookmark: {
            iter: "bookmark",
            name: "Избранное",
            component: (user) => (
                <Bookmark
                    status={user.bookmark}
                    onClick={() => onToggle(user._id)}
                />
            )
        },
        delete: {
            component: (user) => (
                <button
                    className="btn btn-danger"
                    onClick={() => onDelete(user._id)}
                >
                    delete
                </button>
            )
        }
    };
    return <Table {...{ selectedSort, onSort, columns, data: users }} />;
    // return (
    //     <Table {...{ selectedSort, onSort, columns, data: users }}>
    //         <TableHeader {...{ selectedSort, onSort, columns }} />
    //         <TableBody {...{ columns, data: users }} />
    //     </Table>
    // );
};
UsersTable.propTypes = {
    users: PropTypes.array.isRequired,
    onSort: PropTypes.func.isRequired,
    selectedSort: PropTypes.object.isRequired,
    onToggle: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired
};

export default UsersTable;
