import { createBrowserRouter, redirect } from "react-router-dom";
import Home from '../Views/Home'
import AddProduct from '../Views/AddProduct'
import AddUser from '../Views/AddUser'
import EditProduct from '../Views/EditProduct'
import EditImage from '../Views/EditImage'
import BaseLayout from '../Views/BaseLayout'
import DetailProduct from '../Views/DetailProduct'
import Login from '../Views/Login'
import ListCategory from '../Views/CategoryList'
import Toastify from 'toastify-js'
const url = 'https://server.yoelk20.tech'

const router = createBrowserRouter([
    {
        path: "/login",
        element: <Login url={url} />,
        loader: () => {
            if (localStorage.access_token) {
                Toastify({
                    text: "You already logged in",
                    duration: 2000,
                    newWindow: true,
                    close: true,
                    gravity: "top",
                    position: "left",
                    stopOnFocus: true,
                    style: {
                        background: "#EF4C54",
                        color: "#17202A",
                        boxShadow: "0 5px 10px black",
                        fontWeight: "bold"
                    }
                }).showToast();
                return redirect('/')
            }
            return null
        }
    },
    {
        element: <BaseLayout />,
        loader: () => {
            if (!localStorage.access_token) {
                Toastify({
                    text: "Please log in first",
                    duration: 2000,
                    newWindow: true,
                    close: true,
                    gravity: "bottom",
                    position: "right",
                    stopOnFocus: true,
                    style: {
                        background: "#EF4C54",
                        color: "#17202A",
                        boxShadow: "0 5px 10px black",
                        fontWeight: "bold"
                    }
                }).showToast();
                return redirect('/login')
            }
            return null
        },
        children: [
            {
                path: '/',
                element: <Home url={url} />
            },
            {
                path: "/products/:id",
                element: <DetailProduct url={url} />
            },
            {
                path: '/add',
                element: <AddProduct url={url} />
            },
            {
                path: "/edit/:id",
                element: <EditProduct url={url} />
            },
            {
                path: "/categories",
                element: <ListCategory url={url} />
            },
            {
                path: "/editImage/:id",
                element: <EditImage url={url} />
            },
            {
                path: "/addUser",
                element: <AddUser url={url} />
            }
        ]
    }
])

export default router