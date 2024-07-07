import { useEffect, useState } from "react";
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'
import Toastify from 'toastify-js'

function Details({ url }) {
    const [product, setProduct] = useState([]);
    const [loading, setLoading] = useState(false)
    const { id } = useParams()

    // const products = product.products
    // console.log(product, `products di detail`);
    async function fetchProduct() {
        try {
            const { data } = await axios.get(`${url}/products/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.access_token}`
                }
            })

            // console.log(data, `data di details`);
            setProduct(data.products)
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

    useEffect(() => {
        fetchProduct()
    }, [])

    return (
        <>
            <main className="px-10 my-8">
                {loading ? (
                    <div className="mt-32 flex justify-center items-center">
                        <img src={gearLoad} />
                    </div>
                ) : (
                    <div className="flex flex-col bg-base-100 my-6 items-center p-20 bg-gray-100 shadow-md rounded-2xl">
                        <div className="relative">
                            <img
                                src={product.imgUrl}
                                className="max-w-sm rounded-lg shadow-md mb-5"
                                style={{ boxShadow: "0px 0px 10px rgba(0,0,0,0.2)" }}
                            />
                            <Link to={`/editImage/${product.id}`}>
                                <i className="fas fa-pencil-alt absolute top-2 right-2 text-lg text-accent-focus hover:text-yellow-400"></i>
                            </Link>
                        </div>
                        <div className="flex-col">
                            <div className="px-5">
                                <div className="texts">
                                    <h1 className="text-5xl font-bold text-accent-focus">{product.name}</h1>
                                    <div className="py-6">
                                        <p className="text-lg">{product.description}</p>
                                        <br></br>
                                        <p className="text-lg">Stock: {product.stock}</p>
                                        <p className="text-lg">Price: {product.price}</p>
                                    </div>
                                </div>
                                <div className="buttons mt-5">
                                    <Link to="/">
                                        <button className="btn btn-neutral hover:btn-accent-focus transition duration-300 ease-in-out">
                                            Back
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </>
    )
}

export default Details