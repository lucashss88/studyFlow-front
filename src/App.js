import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {AuthProvider} from "./context/AuthContext";
import RotaPrivada from "./routes/RotaPrivada";
import DisciplinaForm from './components/DisciplinaForm';
import Home from './pages/Home';
import Login from "./pages/Login";
import Register from "./pages/Register";
import Layout from "./components/Layout";
import AtividadeForm from "./components/AtividadeForm";
import ListaAtividades from "./components/ListaAtividades";
import ListaDisciplinas from "./components/ListaDisciplinas";

export default function App() {
    return (
      <AuthProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/disciplina" element={<RotaPrivada><DisciplinaForm /></RotaPrivada>} />
              <Route path="/atividade" element={<RotaPrivada><AtividadeForm /></RotaPrivada>} />
              <Route path="/atividades" element={<RotaPrivada><ListaAtividades /></RotaPrivada>} />
              <Route path="/disciplinas" element={<RotaPrivada><ListaDisciplinas /></RotaPrivada>} />
              <Route path="/home" element={<RotaPrivada><Home /></RotaPrivada>} />
            </Routes>
          </Layout>
        </Router>
      </AuthProvider>
  );
}
