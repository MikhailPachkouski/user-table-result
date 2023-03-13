import React, { useEffect, useState } from "react";
import SelectField from "../../form/SelectField";
import api from "../../../api";
import { validator } from "../../../utils/validator";
import PropTypes from "prop-types";
import TextAreaField from "../../form/TextAreaField";

const AddCommentForm = ({ onSubmit }) => {
    const initialData = { userId: "", content: "" };
    const [data, setData] = useState(initialData);
    const [users, setUsers] = useState({});
    const [errors, setErrors] = useState({});
    useEffect(() => {
        api.users.fetchAll().then((data) => setUsers(data));
    }, []);
    const validatorConfig = {
        userId: {
            isRequired: {
                message: "Выберите от чьего имени вы хотите отправить сообщение"
            }
        },
        content: {
            isRequired: {
                message: "Сообщение не может быть пустым"
            }
        }
    };
    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    const clearData = () => {
        setData(initialData);
        setErrors({});
    };
    const handleChange = (target) => {
        setData((prev) => ({ ...prev, [target.name]: target.value }));
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        onSubmit(data);
        clearData();
    };
    const arrayOfUsers =
        users &&
        Object.keys(users).map((userId) => ({
            name: users[userId].name,
            value: users[userId]._id
        }));
    return (
        <div>
            <h3>New Comment</h3>
            <form>
                <SelectField
                    value={data.userId}
                    onChange={handleChange}
                    defaultOption="Выберите пользователя"
                    options={arrayOfUsers}
                    name="userId"
                    error={errors.userId}
                />
                <TextAreaField
                    label="Комментарий"
                    name="content"
                    value={data.content}
                    onChange={handleChange}
                    error={errors.content}
                />
                <div className="d-flex justify-content-end">
                    <button className="btn btn-primary" onClick={handleSubmit}>
                        Опубликовать
                    </button>
                </div>
            </form>
        </div>
    );
};
AddCommentForm.propTypes = {
    onSubmit: PropTypes.func
};

export default AddCommentForm;
