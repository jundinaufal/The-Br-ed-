import { useEffect, useState } from "react"
import Toastify from 'toastify-js'
import axios from 'axios'
import { Link } from "react-router-dom"

function ProductForm({ url, handleSubmit, product, nameProp }) {
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState(0)
    const [imgUrl, setImgUrl] = useState("")
    const [stock, setStock] = useState(0)
    const [categoryId, setCategoryId] = useState("")
    const [categories, setCategories] = useState([])

    // console.log(categories, `categories di form`);
    useEffect(() => {
        if (product) {
            setName(product.name)
            setDescription(product.description)
            setPrice(product.price)
            setImgUrl(product.imgUrl)
            setStock(product.stock)
            setCategoryId(product.categoryId)
        }
    }, [product])

    async function fetchCategories() {
        try {
            const { data } = await axios.get(`${url}/categories`, {
                headers: {
                    Authorization: `Bearer ${localStorage.access_token}`
                }
            })
            // console.log(data.categories, `data di form`);
            setCategories(data.categories)
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
        fetchCategories()
    }, [])

    return (
        <>
            <div className="hero bg-base-200 min-h-screen">
                <div className="hero-content flex-col mt-10">
                    <div className="text-center lg:text-left">
                        <h3 className="text-2xl font-bold">{nameProp}</h3>
                        <p className="py-6">
                            Fill in the form to {nameProp}.
                        </p>
                    </div>
                    <div className="card bg-base-100 shadow-2xl">
                        <form onSubmit={(e) => handleSubmit(e, name, description, price, imgUrl, stock, categoryId)} className="card-body grid grid-cols-2 ">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Product Name</span>
                                </label>
                                <input
                                    onChange={(e) => setName(e.target.value)}
                                    type="text"
                                    placeholder="Product Name"
                                    className="input input-bordered"
                                    value={name}
                                // required
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Description</span>
                                </label>
                                <input
                                    onChange={(e) => setDescription(e.target.value)}
                                    type="text"
                                    placeholder="Product Description"
                                    className="input input-bordered"
                                    value={description}
                                // required
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Price</span>
                                </label>
                                <input
                                    onChange={(e) => setPrice(e.target.value)}
                                    type="number"
                                    placeholder="Price"
                                    className="input input-bordered"
                                    value={price}
                                // required
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Image URL</span>
                                </label>
                                <input
                                    onChange={(e) => setImgUrl(e.target.value)}
                                    type="url"
                                    placeholder="Image URL"
                                    className="input input-bordered"
                                    value={imgUrl}
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Stock</span>
                                </label>
                                <input
                                    onChange={(e) => setStock(e.target.value)}
                                    type="number"
                                    placeholder="Stock"
                                    className="input input-bordered"
                                    value={stock}
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Category</span>
                                </label>
                                <select
                                    className="select select-bordered"
                                    onChange={(e) => setCategoryId(e.target.value)}
                                    name="category"
                                    id="category-select"
                                    value={categoryId}
                                >
                                    <option value="" disabled hidden>
                                        Select a category
                                    </option>
                                    {categories.map((c) => (
                                        <option key={c.id} value={c.id}>
                                            {c.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-control mt-6 grid grid-cols-2">
                                <button type="submit" className="btn btn-primary">{nameProp}</button>
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
        </>
    )

}

export default ProductForm