function Navigation({ setPage }) {
    // function handleLogout() {
    //     localStorage.clear()
    //     setPage('login')
    // }

    return (
        <>
            <div className="fixed top-0 left-0 right-0 navbar bg-stone-700 z-10">
                <div className="flex-1 px-2">
                    <a onClick={() => setPage('home')} className="text-2xl font-bold px-6">
                        <span className="btn btn-ghost text-yellow-600 text-xl">The Br(&)ed!</span>
                    </a>
                </div>
                {/* <div className="flex flex-1 justify-center px-2">
                <div className="flex items-stretch">
                    <a className="btn btn-ghost text-yellow-600 rounded-btn">Add New</a>
                </div>
            </div> */}
                <div className="flex flex-1 justify-end px-2">
                    {/* <div className="flex items-stretch">
                    <a className="btn btn-ghost text-yellow-600 rounded-btn">Login</a>
                </div> */}
                    {/* search */}
                    {/* <form action="" method="get" className="flex justify-center items-center">
                        <input
                            type="search"
                            name="search"
                            placeholder="Search"
                            className="input input-bordered"
                            onChange={(e) => {
                                e.preventDefault();
                                setSearch(e.target.value)
                            }}
                        />
                    </form> */}
                </div>
            </div>
        </>)
}

export default Navigation