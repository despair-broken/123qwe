import { Outlet } from "react-router-dom";

const MainLayout = () => {
    return (
        <div>
            <header>HEADER
            </header>
            <main>
                <Outlet />
            </main>
            <footer>FOOTER
            </footer>
        </div>
    );
}

export default MainLayout;