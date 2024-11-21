import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const updateField = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const authenticateUser = async (e) => {
        e.preventDefault();
        try {
            const result = await axios.post(`${process.env.BACKEND_URL}/api/login`, formData, {
                headers: { "Content-Type": "application/json" },
            });
            console.log("Autenticación exitosa:", result.data);
            sessionStorage.setItem("token", result.data.token);
            navigate("/private");
        } catch (authError) {
            console.error("Error durante el inicio de sesión:", authError.response?.data?.error || authError.message);
        }
    };

    return (
        <div className="container mt-5">
            <h2>Inicio de Sesión</h2>
            <form onSubmit={authenticateUser}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Correo Electrónico</label>
                    <input
                        id="email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={updateField}
                        className="form-control"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Contraseña</label>
                    <input
                        id="password"
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={updateField}
                        className="form-control"
                        required
                    />
                </div>
                <button className="btn btn-primary" type="submit">
                    Acceder
                </button>
            </form>
        </div>
    );
};

export default Login;
