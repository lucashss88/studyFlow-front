import { useStopwatch } from 'react-timer-hook';

function Cronometro({ onFinalizar }) {
    const {
        seconds,
        minutes,
        start,
        pause,
    } = useStopwatch({ autoStart: false });

    const finalizar = () => {
        pause();
        onFinalizar(minutes);
    };

    return (
        <div>
            <div>{minutes}:{seconds.toString().padStart(2, '0')}</div>
            <button className="btn btn-light" onClick={start}>Iniciar</button>
            <button className="btn btn-light" onClick={pause}>Pausar</button>
            <button className="btn btn-light" onClick={finalizar}>Finalizar</button>
        </div>
    );
}

export default Cronometro;