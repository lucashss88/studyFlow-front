import {useEffect, useState} from "react";
import api from "../services/api";
import {
    BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend
} from "recharts";

export default function GraficoAtividades() {
    const [dados, setDados] = useState([]);

    useEffect(() => {
        const carregarAtividades = async () => {
            try {
                const res = await api.get('/atividades');
                const finalizadas = res.data.filter((a) => a.finalizada && a.duracao > 0);
                const formatadas = finalizadas.map((a) => ({
                    nome: a.nome,
                    duracao: a.duracao
                }));
                console.log("Formatadas:", formatadas);
                setDados(formatadas);
            } catch (error) {
                console.error('Erro ao carregar dados', error);
            }
        };
        carregarAtividades();
    }, []);

    return (
        <div className="container d-flex flex-column justify-content-center align-items-center vh-100 w-50">
            <div className="w-100 h-75 p-4 bg-white rounded-lg shadow-md text-center">
                <h2 className="text-lg font-semibold mb-4">
                    Tempo gasto por atividade
                </h2>
                {dados.length > 0 ? (

                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={dados}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="nome" />
                            <YAxis label={{ value: 'Minutos', angle: -90, position: 'insideLeft' }} />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="duracao" fill="#212529" />
                        </BarChart>
                    </ResponsiveContainer>
                ) : (
                    <p className="text-center text-gray-500">Nenhuma atividade finalizada com duração registrada.</p>
                )}
            </div>
        </div>
    );
}