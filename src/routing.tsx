import { createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import BooksPage from "./pages/BooksPage";
import SingleBookPage from "./pages/SingleBookPage";
import AddReviwPage from "./pages/AddReviwPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <HomePage />
            },
            {
                path: "/login",
                element: <LoginPage />
            },
            {
                path: "/books",
                element: <BooksPage />
            },
            {
                path: "/book/:id",
                element: <SingleBookPage />
            },
            {
                path: "/addreview/:id",
                element: (
                    <ProtectedRoute>
                        <AddReviwPage />
                    </ProtectedRoute>

                )
            },
        ]
    }

])

export default router;