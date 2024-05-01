import Layout from "@/pages/Layout/index";
import Month from "@/pages/Month/index";
import New from "@/pages/New/index";
import Year from "@/pages/Year/index";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Month/>
            },
            {
                path: 'year',
                element: <Year/>
            }
        ]
    },
    {
        path: '/new',
        element: <New/>
    }
])
export default router