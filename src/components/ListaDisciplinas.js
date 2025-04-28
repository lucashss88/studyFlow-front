import { useEffect, useState } from 'react';
import api from '../services/api';
import DisciplinaForm from "./DisciplinaForm";

export default function ListaDisciplinas() {
    const [disciplinas, setDisciplinas] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await api.get('/disciplinas');
                setDisciplinas(res.data);
            } catch (err) {
                console.error('Erro ao carregar disciplinas', err);
            }
        };
        fetchData();
    }, []);

    return (
      <div className="d-flex flex-column text-center mt-4 container py-5 text-center fade-in bg-light shadow rounded-2xl">
        <h4 className="text-lg font-semibold mb-4">Minhas Disciplinas</h4>
        <div className="d-flex flex-row gap-2 justify-content-center flex-wrap">
          {disciplinas.length === 0 ? (
            <p className="text-muted">Nenhuma atividade cadastrada ainda.</p>
          ) : (
            disciplinas.map((disciplina) => (
              <div key={disciplina.id} className="mb-4 text-center">
                <div className="card card-body mb-2 shadow-sm">
                  <strong>{disciplina.nome}</strong>
                </div>
              </div>
            ))
          )}
        </div>
        <DisciplinaForm onNovaDisciplina={() => window.location.reload()} />
      </div>
    );
}
