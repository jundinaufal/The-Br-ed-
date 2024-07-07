import axios from 'axios'
import Toastify from 'toastify-js'
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useEffect } from 'react';

function EditImage({ productId, url }) {
    const [product, setProduct] = useState([]);
    // const [imgUrl, setImgUrl] = useState("");
    const [image, setImage] = useState(null);
    const { id } = useParams()

    async function fetchProduct() {
        try {
            const { data } = await axios.get(`${url}/products/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.access_token}`
                }
            })

            console.log(data, `data di edit image`);

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

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append("imgUrl", image);

            const response = await axios.patch(`${url}/products/${id}`, formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.access_token}`,
                    "Content-Type": "multipart/form-data",
                },
            });

            Toastify({
                text: "Image updated successfully!",
                duration: 2000,
                newWindow: true,
                close: true,
                gravity: "top",
                position: "left",
                stopOnFocus: true,
                style: {
                    background: "#8BC34A",
                    color: "#17202A",
                    boxShadow: "0 5px 10px black",
                    fontWeight: "bold",
                },
            }).showToast();
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
                    fontWeight: "bold",
                },
            }).showToast();
        }
    }

    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col mt-10">
                <div className="text-center lg:text-left">
                    <h3 className="text-2xl font-bold">Edit Image</h3>
                    <p className="py-6">Update the product image.</p>
                </div>
                <div className="card bg-base-100 shadow-2xl">
                    <form onSubmit={handleSubmit} className="card-body grid grid-cols-2">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Image URL</span>
                            </label>
                            <input
                                type="file"
                                onChange={(e) => setImage(e.target.files[0])}
                                className="input input-bordered"
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Current Image</span>
                            </label>
                            <img src={product.imgUrl} alt="Current Image" className="max-w-sm rounded-lg shadow-md" />
                        </div>
                        <div className="form-control mt-6 grid grid-cols-2">
                            <button type="submit" className="btn btn-primary">
                                Update Image
                            </button>
                            <Link to="/">
                                <button className="btn btn-neutral hover:btn-accent-focus transition duration-300 ease-in-out">
                                    Cancel
                                </button>
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default EditImage;