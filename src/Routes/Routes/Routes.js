import { createBrowserRouter } from "react-router-dom"
import Main from "../../Layout/Main"
import AllPhone from "../../Pages/Dashboard/AllPhone/AllPhone";
import AllSeller from "../../Pages/Dashboard/AllSeller/AllSeller";
import AllUsers from "../../Pages/Dashboard/AllUsers/AllUsers";
import Dashboard from "../../Pages/Dashboard/Dashboard";
import DashboardLayout from "../../Pages/Dashboard/DashboardLayout/DashboardLayout";
import Payment from "../../Pages/Dashboard/Payment/Payment";
import Home from "../../Pages/Home/Home"
import Login from "../../Pages/Login/Login";
import DisplayError from "../../Pages/Shared/DisplayError/DisplayError";
import SignUp from "../../Pages/SignUp/SignUp";
import AdminRoute from "../AdminRoute/AdminRoute";
import PrivateRoute from "./PrivateRoute/PrivateRoute";
import AddMobile from "../../Pages/AddMobile/AddMobile";
import SubmitMobile from "../../Pages/AddMobile/SubmitMobile";
import SingleCategory from "../../Pages/SingleCategory/SingleBrand";
import SingleMobile from "../../Pages/SingleMobile/SingleMobile";
import SingleBrand from "../../Pages/SingleCategory/SingleBrand";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        errorElement: <DisplayError></DisplayError>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/singlecategory/:id',
                element: <SingleCategory></SingleCategory>,
                loader: ({ params }) => fetch(`http://localhost:4000/singlecategory/${params.id}`)
            },
            {
                path: '/mobile/:id',
                element: <SingleMobile></SingleMobile>,
                loader: ({ params }) => fetch(`http://localhost:4000/mobile/${params.id}`)
            },
            {
                path: '/singlebrand/:brand',
                element: <SingleBrand></SingleBrand>,
                loader: ({ params }) => fetch(`http://localhost:4000/brandCollection?brand=${params.brand}`)
            },
            {
                path: '/signup',
                element: <SignUp></SignUp>
            },
            {
                path: '/dashboard',
                element: <Dashboard></Dashboard>
            },
            {
                path: '/addmobile',
                element: <PrivateRoute><AddMobile></AddMobile></PrivateRoute>
            },
            {
                path: '/submitmobile',
                element: <PrivateRoute><SubmitMobile></SubmitMobile></PrivateRoute>
            },

        ]
    },
    {
        path: '/dashboard',
        element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
        errorElement: <DisplayError></DisplayError>,
        children: [
            {
                path: '/dashboard',
                element: <AdminRoute><AllPhone></AllPhone></AdminRoute>
            },
            {
                path: '/dashboard/allusers',
                element: <AdminRoute><AllUsers /></AdminRoute>
            },
            {
                path: '/dashboard/adddoctor',
                element: <AdminRoute><AllSeller /></AdminRoute>
            },

            {
                path: '/dashboard/payment/:id',
                element: <AdminRoute><Payment></Payment></AdminRoute>,
                loader: ({ params }) => fetch(`http://localhost:4000/bookings/${params.id}`)
            },
        ]
    }
])

export default router;