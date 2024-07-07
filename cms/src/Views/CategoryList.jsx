import axios from 'axios';
import { useEffect, useState } from "react";
import Toastify from 'toastify-js'
import gearLoad from "../Components/assets/react.svg"
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Link } from 'react-router-dom';

function showCategories({ url }) {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false)
    
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

    async function fetchCategories() {
        try {
            setLoading(true)
            const { data } = await axios.get(`${url}/categories`, {
                headers: {
                    Authorization: `Bearer ${localStorage.access_token}`
                }
            });
            // console.log(data, `data di home`);
            setCategories(data.categories);
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
        fetchCategories();
    }, []) // mounted

    return (
        <>        
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
                                <th>Category Name</th>  
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categories.map((category) => (
                                <tr key={category.id}>
                                    <th>{category.id}</th>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div>
                                                <div className="font-bold">{category.name}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <th>
                                        <div className="flex gap-2">
                                            {/* <Link to={`/edit/${category.id}`} className="btn btn-ghost btn-xs text-yellow-500">
                                                <i className="fas fa-edit"></i>
                                            </Link> */}
                                            <button onClick={() => handleDelete(category.id)} className="btn btn-ghost btn-xs text-red-500">
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

export default showCategories