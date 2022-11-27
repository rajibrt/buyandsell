import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider';

const MyPhone = () => {
    const { user } = useContext(AuthContext);

    const url = `http://localhost:4000/myphone?seller=${user?.email}`
    const { data: myphone = [] } = useQuery({
        queryKey: ['mobile', user?.email],
        queryFn: async () => {
            const res = await fetch(url, {
                headers: {
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                }
            });
            const data = await res.json();
            return data;
        }

    })
    return (
        <div>
            <h2>My Listed Mobile</h2>


            <div className="overflow-x-auto w-full">
                <table className="table w-full">

                    <thead>
                        <tr>
                            <th>
                                <label>
                                    Serial
                                </label>
                            </th>
                            <th>Photo</th>
                            <th>Brand</th>
                            <th>Model</th>
                            <th>Price</th>
                            <th>Delete</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            myphone &&
                            myphone?.map((phone, i) => <tr key={phone._id}>
                                <th>{i + 1}</th>
                                <td>
                                    <div >
                                        <img className="w-24 lg:rounded-xl rounded-sm" src={phone.image} alt="PhoneImage" />
                                    </div>
                                </td>
                                <td>{phone.brand}</td>
                                <td>{phone.model}</td>
                                <td>${phone.salesPrice}</td>
                                <td>{phone.slot}</td>
                                <td>
                                    {
                                        phone.price && !phone.paid &&
                                        <Link to={`/dashboard/payment/${phone._id}`}><button className='btn btn-primary btn-sm'>Pay</button></Link>
                                    }
                                    {
                                        phone.price && phone.paid && <span className='text-primary'>Paid</span>
                                    }
                                </td>
                            </tr>)
                        }

                    </tbody>

                    <tfoot>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Job</th>
                            <th>Favorite Color</th>
                            <th></th>
                        </tr>
                    </tfoot>

                </table>
            </div>
        </div>
    );
};

export default MyPhone;