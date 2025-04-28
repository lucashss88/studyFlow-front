import React, { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import {toast, ToastContainer} from 'react-toastify';

export default function Login() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const navigate = useNavigate();
    const {login} = useAuth();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post('/auth/login', { email, senha });
            login(res.data.token);
            toast.success('Login realizado com sucesso!');
            navigate('/home');
        } catch (err) {
            alert('Erro ao fazer login');
        }
    };

    const register = () => {
        navigate('/register');
    }

    return (
        <div className="container d-flex flex-column justify-content-center align-items-center vh-100">
            <ToastContainer />
            <div className="card p-4 shadow mb-2" style={{ width: '100%', maxWidth: 400 }}>
                <h3 className="text-center mb-4">Estudo Manager</h3>
                <form onSubmit={handleLogin}>
                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input type="email" className="form-control" value={email} onChange={e => setEmail(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Senha</label>
                        <input type="password" className="form-control" value={senha} onChange={e => setSenha(e.target.value)} />
                    </div>
                    <button className="btn btn-secondary w-100">Entrar</button>
                </form>
            </div>
            <h9>Ainda não possui cadastro? Cadastre-se <a className="link-dark btn-link" onClick={register}>aqui</a>.</h9>
        </div>
    );
};
