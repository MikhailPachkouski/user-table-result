import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import TextField from "../../form/TextField";
import { validator } from "../../../utils/validator";
import api from "../../../api";
import SelectField from "../../form/SelectField";
import RadioField from "../../form/RadioField";
import MultiSelectField from "../../form/MultiSelectField";
import BackButton from "../../common/BackButton";
const EditUserPage = () => {
    const { userId } = useParams();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState({
        name: "",
        email: "",
        profession: "",
        sex: "male",
        qualities: []
    });
    const [qualities, setQualities] = useState({});
    const [errors, setErrors] = useState([]);
    const [professions, setProfessions] = useState({});
    useEffect(() => {
        api.users.getById(userId).then((user) => {
            setData({
                name: user.name,
                email: user.email,
                profession: user.profession._id,
                sex: user.sex,
                qualities: transformQualities(user.qualities)
            });
            console.log(data);
        });
        api.professions.fetchAll().then((data) => setProfessions(data));
        api.qualities.fetchAll().then((data) => setQualities(data));
    }, []);
    const transformQualities = (data) => {
        return data.map((quality) => ({
            label: quality.name,
            value: quality._id
        }));
    };
    const getPropfessionById = (id) => {
        for (const prof in professions) {
            const profData = professions[prof];
            if (profData._id === id) return profData;
        }
    };
    const getQualities = (elements) => {
        const qualitiesArray = [];
        for (const elem of elements) {
            for (const quality in qualities) {
                if (elem.value === qualities[quality]._id) {
                    qualitiesArray.push(qualities[quality]);
                }
            }
        }
        return qualitiesArray;
    };
    const handleChange = (target) => {
        setData((prev) => ({ ...prev, [target.name]: target.value }));
    };
    const validatorConfig = {
        name: {
            isRequired: {
                message: "Имя пользователя обязательно для заполнения"
            }
        },
        email: {
            isRequired: {
                message: "Электронная поста обязательна для заполнения"
            },
            isEmail: {
                message: "Email введен некорректно"
            }
        }
    };
    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    useEffect(() => {
        validate();
    }, [data]);
    const isValid = Object.keys(errors).length === 0;

    useEffect(() => {
        if (data._id) setIsLoading(false);
    }, [data]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        api.users
            .update(userId, {
                ...data,
                profession: getPropfessionById(data.profession),
                qualities: getQualities(data.qualities)
            })
            .then((data) => navigate(`/users/${userId}`));
    };
    return (
        <div className="container mt-5">
            <BackButton />
            <div className="row">
                <div className="col-md-6 offset-md-3 shadow p-3">
                    {!isLoading && Object.keys(professions).length > 0 ? (
                        <form onSubmit={handleSubmit}>
                            <TextField
                                label="Имя"
                                name="name"
                                value={data.name}
                                onChange={handleChange}
                                error={errors.name}
                            />
                            <TextField
                                label="Электронная почта"
                                name="email"
                                value={data.email}
                                onChange={handleChange}
                                error={errors.email}
                            />
                            <SelectField
                                label="Выберите Вашу профессию"
                                value={data.profession}
                                defaultOption="Choose..."
                                options={professions}
                                onChange={handleChange}
                                name="profession"
                                error={errors.profession}
                            />
                            <RadioField
                                options={[
                                    { name: "Male", value: "male" },
                                    { name: "Female", value: "female" },
                                    { name: "Other", value: "other" }
                                ]}
                                value={data.sex}
                                name="sex"
                                onChange={handleChange}
                                label="Выберите пол"
                            />
                            <MultiSelectField
                                options={qualities}
                                onChange={handleChange}
                                defaultValue={data.qualities}
                                name="qualities"
                                label="Выберите качества"
                            />
                            <button
                                type="submit"
                                disabled={!isValid}
                                className="btn btn-primary w-100 mx-auto"
                            >
                                Обновить
                            </button>
                        </form>
                    ) : (
                        <h3>Loading</h3>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EditUserPage;
