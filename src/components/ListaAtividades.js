import { useEffect, useState } from 'react';
import api from '../services/api';
import Cronometro from './Cronometro';
import AtividadeForm from "./AtividadeForm";
import { toast } from "react-toastify";

export default function ListaAtividades() {
    const [atividades, setAtividades] = useState([]);
    const [atividadeAtiva, setAtividadeAtiva] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const res = await api.get('/atividades');
            setAtividades(res.data);
        } catch (err) {
            console.log('Erro ao carregar atividades', err);
        }
    };

    const finalizarAtividade = async (id, duracao) => {
        try {
            await api.put(`/atividades/${id}/finalizar`, { duracao });
            setAtividadeAtiva(null);
            const res = await api.get('/atividades');
            setAtividades(res.data);
        } catch (err) {
            alert('Erro ao finalizar atividade');
        }
    };

    const formatarData = (dataISO) => {
        const [ano, mes, dia] = dataISO.split('-');
        return `${dia}/${mes}/${ano}`;
    };

    const excluirAtividade = async (id) => {
        if (!window.confirm('Tem certeza que deseja excluir esta atividade?')) return;
        try {
            await api.delete(`/atividades/${id}`);
            toast.success('Atividade excluida');
            setAtividades((prev => prev.filter((atividade) => atividade.id !== id)));
        } catch (err) {
            console.error(err);
        }
    }

    const editarAtividade = async (atividade) => {
        const novoNome = prompt('Digite o novo nome da atividade: ',atividade.nome );
        if (novoNome && novoNome.trim() !== '') {
            try {
                await api.put(`/atividades/${atividade.id}`, {nome: novoNome});
                await fetchData();
            } catch (err) {
                console.error(err);
            }
        }
    }

    return (
      <div className="d-flex flex-column text-center mt-4 container py-5 text-center fade-in bg-light shadow rounded-2xl">
        <h4 className="text-lg font-semibold mb-4">Minhas Atividades</h4>
        <div className="d-flex flex-row gap-2 justify-content-center">
          {atividades.length === 0 ? (
            <p className="text-muted">Nenhuma atividade cadastrada ainda.</p>
          ) : (
            atividades.map((a) => (
              <div key={a.id} className="mb-4 text-center">
                <div className="card card-body mb-2">
                  <strong>{a.nome}</strong> {formatarData(a.data)} - {a.duracao ?? 0} min
                  <div className="flex-row">
                    <button className="btn btn-sm btn-light" onClick={() => editarAtividade(a)}>Editar</button>
                    <button className="btn btn-sm btn-light" onClick={() => excluirAtividade(a.id)}>Excluir</button>
                  </div>
                </div>

                {!a.finalizada && (
                  <div>
                    {atividadeAtiva === a.id ? (
                      <Cronometro onFinalizar={(duracao) => finalizarAtividade(a.id, duracao)} />
                    ) : (
                      <button className="btn btn-light" onClick={() => setAtividadeAtiva(a.id)}>Iniciar Atividade</button>
                    )}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
        <AtividadeForm onNovaAtividade={() => window.location.reload()} />
      </div>
    );
}
