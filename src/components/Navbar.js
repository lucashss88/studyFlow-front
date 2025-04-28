import useAuth from "../hooks/useAuth";
import {useNavigate} from "react-router-dom";

export default function Navbar() {
    const {logout} = useAuth();
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="navbar-expand-lg navbar-dark bg-dark text-white shadow">
                <h1 className="text-xl font-bold pt-2 ps-2">StudyFlow</h1>
                <div className="flex gap-4 justify-content-between text-end">
                    <button onClick={() => navigate('/home')} className="btn text-white">Dashboard</button>
                    <button onClick={() => navigate('/atividades')} className="btn text-white">Atividades</button>
                    <button onClick={() => navigate('/disciplinas')} className="btn text-white">Disciplinas</button>
                    <button onClick={logout} className="btn text-white">Sair</button>
                </div>
            </nav>
        </div>
    );
}