import React from 'react';
import { useLoaderData } from 'react-router-dom';

const AllSellers = () => {
    const allSellers = useLoaderData();
    console.log(allSellers);

    const handleDelete = () => {

    }

    return (
        <div>
            <h2>All Seller</h2>
            <div className="overflow-x-auto">
                <table className="table w-full">

                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Admin Action</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            allSellers.map((seller, i) =>
                                <tr key={seller._id}>
                                    <th>{i + 1}</th>
                                    <td>{seller.name}</td>
                                    <td>{seller.email}</td>
                                    <td>{seller?.role !== 'admin' && <button onClick={() => handleDelete(seller._id)} className='btn btn-xs btn-primary'>Delete</button>}</td>
                                    <td><button className='btn btn-xs btn-danger'>Delete</button></td>
                                </tr>
                            )
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllSellers;