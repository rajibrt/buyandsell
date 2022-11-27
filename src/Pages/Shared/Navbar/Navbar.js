import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FaMobile } from "react-icons/fa";
import { AuthContext } from '../../../contexts/AuthProvider';
import useSeller from '../../../hooks/useSeller';

const Navbar = () => {
    const handleLogOut = () => {
        logOut()
            .then(() => { })
            .catch(err => console.log(err))
    }
    const { user, logOut } = useContext(AuthContext)
    const [isSeller] = useSeller(user?.email)

    const menuItems = <React.Fragment>

        <li><Link to='/'>Home</Link></li>
        {
            user?.uid ?
                <>
                    <li><Link to='/dashboard'>Dashboard</Link></li>
                    <li><button onClick={handleLogOut} >Sign out</button></li>
                </>
                : <li><Link to='/login'>Login</Link></li>
        }

    </React.Fragment>

    return (
        <div className="navbar bg-base-100 flex justify-between">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">


                        {menuItems}

                    </ul>
                </div>
                <Link to='/' className="btn btn-ghost normal-case text-xl">Bye and Sell</Link>
            </div>
            <div>
                <div className="navbar hidden lg:flex">
                    <ul className="menu menu-horizontal p-0">

                        {menuItems}

                    </ul>
                </div>


                {
                    isSeller &&
                    <>
                        <div className="navbar">
                            <Link to="/submitmobile" className="btn btn-success"><FaMobile className='text-2xl text-base-100 mr-2'></FaMobile>Add Mobile</Link>
                        </div>
                    </>
                }
                <label htmlFor="dashboard-drawer" tabIndex={2} className="btn btn-ghost lg:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                </label>
            </div>
        </div>
    );
};

export default Navbar;