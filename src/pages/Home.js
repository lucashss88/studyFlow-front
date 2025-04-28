import GraficoAtividades from "../components/GraficoAtividades";

export default function Home() {
    return (
        <div className="container py-5 mt-4 text-center fade-in">
          <div className="bg-light shadow rounded-2xl">
              <GraficoAtividades />
          </div>

        </div>
    );
}
