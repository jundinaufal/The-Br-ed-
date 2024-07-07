import axios from 'axios';
import { useEffect, useState } from "react";
import Toastify from 'toastify-js'
import gearLoad from "../Components/assets/react.svg"
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Link } from 'react-router-dom';

function Home({ url }) {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false)
    const [search, setSearch] = useState('')

    async function handleDelete(id) {
        try {
            await axios.delete(`${url}/products/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.access_token}`
                }
            })
            Toastify({
                text: "Success delete",
                duration: 2000,
                newWindow: true,
                close: true,
                gravity: "top",
                position: "left",
                stopOnFocus: true,
                style: {
                    background: "#00B29F",
                    color: "#17202A",
                    boxShadow: "0 5px 10px black",
                    fontWeight: "bold"
                }
            }).showToast();

            fetchProducts()
        } catch (error) {
            Toastify({
                text: error.response.data.error,
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
        }
    }

    async function fetchProducts() {
        try {
            setLoading(true)
            const { data } = await axios.get(`${url}/products`, {
                headers: {
                    Authorization: `Bearer ${localStorage.access_token}`
                }
            });
            // console.log(data, `data di home`);
            setProducts(data.products);
        } catch (error) {
            Toastify({
                text: error.response.data.error,
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
        } finally {
            setLoading(false)
        }
    }

    // lifecyle mounted
    useEffect(() => {
        console.log('ini proses mounted, akan dijalankan sebelum pemasangan dom & react di komponen ini (saat memasuki komponen ini)');
        fetchProducts();
    }, []) // mounted

    useEffect(() => {
        console.log('ini adalah watchers, akan dijalankan sebelum pemasangan dom & react di komponen ini dan ketika state yg di pantau dalam dependencies(parameter kedua) berubah');
        fetchProducts();
    }, [search])

    return (
        <>
            <Link to="/add" className="flex justify-between mb-4 mt-10">
                <button className="btn">Add Products</button>
            </Link>

            {loading ? (
                <div className="mt-32 flex justify-center items-center">
                    <img src={gearLoad} />
                </div>
            ) : (
                <div className="overflow-x-auto mt-10">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Stock</th>
                                <th>Action</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => (
                                <tr key={product.id}>
                                    <th>{product.id}</th>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle h-12 w-12">
                                                    <img
                                                        src={product.imgUrl}
                                                        alt="Avatar Tailwind CSS Component"
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold">{product.name}</div>
                                                <div className="text-sm opacity-50">{product.Category.name}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        {product.description}
                                        <br />
                                        {/* <span className="badge badge-ghost badge-sm">Desktop Support Technician</span> */}
                                    </td>
                                    <td>{product.stock}</td>
                                    <th>
                                        <div className="flex gap-2">
                                            <Link to={`/products/${product.id}`} className="btn btn-ghost btn-xs text-green-500">
                                                <i className="fas fa-book-open-reader"></i>
                                            </Link>
                                            <Link to={`/edit/${product.id}`} className="btn btn-ghost btn-xs text-yellow-500">
                                                <i className="fas fa-edit"></i>
                                            </Link>
                                            <button onClick={() => handleDelete(product.id)} className="btn btn-ghost btn-xs text-red-500">
                                                <i className="fas fa-trash"></i>
                                            </button>
                                        </div>
                                    </th>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </>
    );
}

export default Home