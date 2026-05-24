import { createBrowserRouter, RouterProvider, } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import routes from "./routes";

const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        children: routes.map((route) => ({
            path: route.path,
            element: <route.element />
        }))
    }
]);

const AppRouter = () => {
    return (
        <RouterProvider router={router} />
    );
}

export default AppRouter;