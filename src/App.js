import React, { useEffect, useState } from "react";
import api from "./api/index";
import Users from "./components/Users";

const App = () => {
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

    return (
        <div style={{ margin: "15px" }} className="d-flex justify-content-center">
            {users && (
                <Users
                    users={users}
                    onDelete={handleDelete}
                    onToggle={handleToogleBookmark}
                />
            )}
        </div>
    );
};

export default App;
