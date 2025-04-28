import {useLocation} from "react-router-dom";
import Navbar from './Navbar';
import {ToastContainer } from "react-toastify";

export default function Layout({ children }: { children: React.ReactNode }) {
    const location = useLocation();

    const rotasSemNavbar = ['/', '/register'];
    const esconderNavbar = rotasSemNavbar.includes(location.pathname);

    return (
        <div>
            {!esconderNavbar && <Navbar />}
            <main className="p-4">
                <ToastContainer/>
                {children}
            </main>
        </div>
    );
}