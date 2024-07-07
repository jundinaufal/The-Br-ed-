import axios from 'axios';
import { useState, useEffect } from "react"
import Card from "../Components/Card"
import gearLoad from "../Components/assets/react.svg"
import { Link } from "react-router-dom"
import Toastify from 'toastify-js'

function Home({ url }) {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState('');
    // const [currentPage, setCurrentPage] = useState(1);
    // const [totalPages, setTotalPages] = useState(0);
    // const [limit, setLimit] = useState(6); // number of products per page
    // const [categories, setCategory] = useState(''); // add a state to store the selected category

    // setCategory(products.Category)

    console.log(products, `category di home`);

    async function fetchProducts() {
        try {
            setLoading(true);
            const { data } = await axios.get(`${url}/public/products`, {
                // params: {
                //     page: currentPage,
                //     limit: limit,
                //     category: products.Category, // add category to the params
                // },
            });

            setProducts(data.data);
            // setTotalPages(Math.ceil(data.total / limit));
        } catch (error) {
            Toastify({
                text: error.response,
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
                    fontWeight: "bold",
                },
            }).showToast();
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchProducts()
    }, [search])

    // search
    function searchOnChange(event) {
        let newSearch = event.target.value;
        setSearch(newSearch);
    }

    function handleCategoryChange(event) {
        let newCategory = event.target.value;
        setCategory(newCategory);
    }

    // const handlePageChange = (page) => {
    //     setCurrentPage(page);
    // };

    // const handlePrevious = () => {
    //     if (currentPage > 1) {
    //         setCurrentPage(currentPage - 1);
    //     }
    // };

    // const handleNext = () => {
    //     if (currentPage < totalPages) {
    //         setCurrentPage(currentPage + 1);
    //     }
    // };

    return (
        <>
            <div className="flex justify-between mb-4 mt-10">
                <div className="flex items-center gap-2">
                    <form action="" method="get" className="flex justify-center items-center">
                        <input
                            type="search"
                            name="search"
                            placeholder="Search"
                            className="input input-bordered"
                            onChange={searchOnChange}
                        />
                    </form>
                    <select className="select select-bordered" onChange={handleCategoryChange}>
                        <option disabled selected>Filter</option>
                        {products.map((product) => (
                            <option key={product.Category.id}> {product.Category.name}
                            </option>
                        ))}
                    </select>
                    {/* <button className="btn">Search</button> */}
                </div>
            </div>

            {loading ? (
                <div className="mt-32 flex justify-center items-center">
                    <img src={gearLoad} />
                </div>
            ) : (
                <div id="PAGE-HOME" className="p-3">
                    <div className="grid grid-cols-3 gap-10 px-5 my-8 bg-white flex-wrap">
                        {products.map((product) => {
                            return (
                                <Link key={product.id} to={`/public/products/${product.id}`}>
                                    <Card product={product} />
                                </Link>
                            );
                        })}
                    </div>

                    {/* <div className="join">
                        <button
                            className="join-item btn"
                            onClick={handlePrevious}
                            disabled={currentPage === 1}
                        >
                            «
                        </button>
                        {Array.from({ length: totalPages }, (_, i) => (
                            <button
                                key={i + 1}
                                className={`join-item btn ${currentPage === i + 1? 'bg-blue-500' : ''}`}
                                onClick={() => handlePageChange(i + 1)}
                            >
                                {i + 1}
                            </button>
                        ))}
                        <button
                            className="join-item btn"
                            onClick={handleNext}
                            disabled={currentPage === totalPages}
                        >
                            »
                        </button>
                    </div> */}
                </div>
            )}
        </>
    );
}

export default Home;