import { useState } from 'react';
import api from '../services/api';

export default function DisciplinaForm({ onNovaDisciplina }) {
    const [nome, setNome] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post('/disciplinas', { nome });
            onNovaDisciplina(res.data);
            setNome('');
        } catch (err) {
            alert('Erro ao adicionar disciplina');
        }
    };


    return (
        <div className="container d-flex flex-column justify-content-center align-items-center mt-5 w-50">
            <form onSubmit={handleSubmit} className="w-75 p-lg-4 bg-white shadow-sm rounded form">
                <div className="mb-3">
                    <input
                        type="text"
                        id="disciplineName"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        placeholder="Digite o nome da disciplina"
                        className="form-control input-group"
                    />
                </div>
                <button type="submit" className="btn btn-light w-100">
                    Adicionar
                </button>
            </form>
        </div>

    );
}