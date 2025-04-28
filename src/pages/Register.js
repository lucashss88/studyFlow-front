import {useState} from "react";
import {useNavigate} from "react-router-dom";
import api from "../services/api";
import {toast, ToastContainer} from "react-toastify";

export default function Register() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await api.post('/auth/register', { email, senha });
            localStorage.setItem('token', res.data.token);
            navigate('/');
            toast.success('Usuário cadastrado com sucesso!');
        } catch (error) {
            console.error(error);
            toast.error('Erro no cadastro.');

        }
    };

    return (
        <div className="container d-flex flex-column justify-content-center align-items-center vh-100">
            <ToastContainer />
            <div className="card p-4 shadow mb-2" style={{ width: '100%', maxWidth: 400 }}>
                <h3 className="text-center mb-4">Estudo Manager</h3>
                <form onSubmit={handleRegister}>
                    <input
                        type="email"
                        placeholder="E-mail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="form-control input-group border rounded mb-3"
                    />
                    <input
                        type="password"
                        placeholder="Senha"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        className="form-control input-group border rounded mb-3"
                    />
                    <button className="btn btn-secondary w-100">
                        Cadastrar
                    </button>
                </form>
            </div>
        </div>
    );
}