function Card({ product }) {
    return (
        <>
            <div className="card bg-base-100 w-50 shadow-xl flex-wrap hover:scale-110">
                <figure className="px-10 pt-10">
                    <img
                        src={product.imgUrl}
                        alt="product image rounded-xl aspect-w-18 aspect-h-12 object-cover h-30 w-30 " />
                </figure>
                <div className="card-body items-center text-center">
                    <h2 className="card-title">{product.name}</h2>
                    <p>{product.Category.name}</p>
                    {/* <div className="card-actions">
                        <button className="btn btn-primary">Buy Now</button>
                    </div> */}
                </div>
            </div>
        </>

    )
}

export default Card