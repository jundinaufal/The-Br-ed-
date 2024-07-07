import { createBrowserRouter } from "react-router-dom";
import Home from "../Views/Home";
import BaseLayout from "../Views/BaseLayout";
import ProductDetails from "../Views/ProductDetails";
const url = 'https://server.yoelk20.tech'

const router = createBrowserRouter([
    {
        path: "/",
        element: <BaseLayout />,
        children: [
            {
                path: '/',
                element: <Home url={url} />
            },
            {
                path: '/public/products/:id',
                element: <ProductDetails url={url} />
            }
        ]
    }
])

export default router