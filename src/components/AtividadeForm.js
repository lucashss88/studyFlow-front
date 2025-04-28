import { useState, useEffect } from 'react';
import api from '../services/api';

export default function AtividadeForm({ onNovaAtividade }) {
    const [nome, setNome] = useState('');
    const [data, setData] = useState('');
    const [disciplinaId, setDisciplinaId] = useState('');
    const [disciplinas, setDisciplinas] = useState([]);

    useEffect(() => {
        api.get('/disciplinas').then((res) => setDisciplinas(res.data));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await api.post('/atividades', {
            nome,
            data,
            disciplinaId,
            finalizada: false,
        });
        onNovaAtividade(res.data);
        setNome('');
        setData('');
        setDisciplinaId('');
    };

    return (
        <div className="py-3 text-center container d-flex flex-column justify-content-center align-items-center mt-5 w-50">
            <form onSubmit={handleSubmit} className="w-75 p-lg-3 bg-white shadow-sm rounded form">
                <div>
                    <input
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        placeholder="Nome da atividade"
                        className="form-control input-group m-1"
                    />
                    <input
                        type="date"
                        value={data}
                        onChange={(e) => setData(e.target.value)}
                        className="form-control input-group m-1"
                    />
                    <select
                        value={disciplinaId}
                        onChange={(e) => setDisciplinaId(e.target.value)}
                        className="form-control form-select m-1"
                    >
                        <option
                            value="">Selecione a disciplina
                        </option>
                        {disciplinas.map((d) => (
                            <option key={d.id} value={d.id}>{d.nome}</option>
                        ))}
                    </select>
                    <button
                        type="submit"
                        className="btn btn-light w-100 m-1"
                    >
                        Criar
                    </button>
                </div>

            </form>
        </div>

    );
}
