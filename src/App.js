import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import NavBar from "./components/ui/NavBar";
import Users from "./layouts/Users";
import { Routes, Route } from "react-router-dom";
import Main from "./layouts/Main";
import Login from "./layouts/Login";

const App = () => {
    return (
        <div
            style={{ margin: "15px" }}
            className="d-flex flex-column align-items-center"
        >
            <NavBar />
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/login/:type?" element={<Login />} />
                <Route path="/users/:userId?/:edit?" element={<Users />} />
            </Routes>
        </div>
    );
};

export default App;
