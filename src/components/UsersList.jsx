import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Pagination from "./Pagination";
import { paginate } from "../utils/paginate";
import api from "../api/index";
import PropTypes from "prop-types";
import GroupList from "./GroupList";
import SearchStatus from "./SearchStatus";
import UsersTable from "./UsersTable";
import _ from "lodash";

const UsersList = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProfessions] = useState();
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedProf, setSelectedProf] = useState();
    const [sortBy, setSortBy] = useState({ iter: "name", order: "asc" });
    const pageSize = 8;

    const [users, setUsers] = useState();
    useEffect(() => {
        api.users.fetchAll().then((data) => setUsers(data));
    }, []);

    const handleDelete = (userId) => {
        setUsers((prev) => prev.filter((user) => user._id !== userId));
    };
    const handleToogleBookmark = (id) => {
        const userIndex = users.findIndex((user) => user._id === id);
        const newUsers = [...users];
        newUsers[userIndex].bookmark = !newUsers[userIndex].bookmark;
        setUsers(newUsers);
    };

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };
    const handleProfessionSelect = (item) => {
        if (searchQuery !== "") setSearchQuery("");
        setSelectedProf(item);
    };
    const handleSearchQuery = (event) => {
        setSelectedProf(undefined);
        setSearchQuery(event.target.value);
    };
    const clearProfessions = () => {
        setSelectedProf();
    };
    const handleSort = (item) => {
        // if (sortBy.iter === item) {
        //     setSortBy(prev => ({ ...prev, order: prev.order === "asc" ? "desc" : "asc" }));
        // } else {
        //     setSortBy({ iter: item, order: "asc" });
        // }
        setSortBy(item);
    };
    useEffect(() => {
        api.professions.fetchAll().then((data) => setProfessions(data));
    }, []);
    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf, searchQuery]);

    if (users) {
        const filteredUsers = searchQuery
            ? users.filter(
                // (user) => user.name.toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1
                user => user.name.toLowerCase().includes(searchQuery.toLowerCase())
            )
            : selectedProf
                ? users.filter(
                    (user) =>
                        JSON.stringify(user.profession) ===
                      JSON.stringify(selectedProf)
                )
                : users;
        const count = filteredUsers.length;
        const sortedUsers = _.orderBy(
            filteredUsers,
            [sortBy.iter],
            [sortBy.order]
        );
        const userCrop = paginate(sortedUsers, currentPage, pageSize);
        return (
            <div className="d-flex m-3">
                {professions && (
                    <div className="d-flex flex-column flex-shrink-0">
                        <GroupList
                            items={professions}
                            onItemSelect={handleProfessionSelect}
                            selectedItem={selectedProf}
                        />
                        <button
                            className="btn btn-secondary mt-2"
                            onClick={clearProfessions}
                        >
                            Очистить
                        </button>
                    </div>
                )}

                <div className="d-flex flex-column p-2">
                    <SearchStatus number={count} />
                    <input
                        type="text"
                        name="searchQuery"
                        placeholder="Search..."
                        onChange={handleSearchQuery}
                        value={searchQuery}
                    />
                    {count > 0 && (
                        <UsersTable
                            users={userCrop}
                            onSort={handleSort}
                            selectedSort={sortBy}
                            onDelete={handleDelete}
                            onToggle={handleToogleBookmark}
                        />
                    )}
                    <div className="d-flex justify-content-center">
                        <Pagination
                            itemsCount={count}
                            pageSize={pageSize}
                            currentPage={currentPage}
                            onPageChange={handlePageChange}
                        />
                    </div>
                </div>
            </div>
        );
    }
    return "loading...";
};

UsersList.propTypes = {
    users: PropTypes.array,
    onDelete: PropTypes.func,
    onToggle: PropTypes.func
};

export default UsersList;
