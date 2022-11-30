import React, { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthProvider';
import useAdmin from '../hooks/useAdmin';
import useBuyer from '../hooks/useBuyer';
import useSeller from '../hooks/useSeller';
import Footer from '../Pages/Shared/Footer/Footer';
import Navbar from '../Pages/Shared/Navbar/Navbar';

const DashboardLayout = () => {
    const { user } = useContext(AuthContext)
    const [isSeller] = useSeller(user?.email)
    const [isBuyer] = useBuyer(user?.email)
    const [isAdmin] = useAdmin(user?.email)

    return (
        <div>
            <Navbar />
            <div className="drawer drawer-mobile">
                <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />

                <div className="drawer-content">
                    {/* <!-- Page content here --> */}
                    <Outlet />

                </div>
                <div className="drawer-side ">
                    <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 bg-base-100 text-base-content">
                        {/* <!-- Sidebar content here --> */}
                        {
                            isSeller &&
                            <>
                                <h2 className="font-bold">Welcome Back Seller</h2>
                                <li><Link to='/dashboard/myphone'>My Mobile</Link></li>
                            </>
                        }
                        {
                            isBuyer &&
                            <>
                                <li><Link to='/dashboard/bookedphone'>Booked Mobile</Link></li>

                            </>
                        }
                        {
                            isAdmin &&
                            <>
                                <li><Link to='/dashboard/allphones'>All Phones</Link></li>
                                <li><Link to='/dashboard/allsellers'>All Sellers</Link></li>
                                <li><Link to='/dashboard/allbuyers'>All Buyers</Link></li>
                            </>
                        }

                    </ul>

                </div>
            </div>
            <Footer />
        </div>
    );
};

export default DashboardLayout;