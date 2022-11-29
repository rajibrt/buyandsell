import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider';
import ConfirmationModal from '../../Shared/ConfirmationModal/ConfirmationModal';
import Loading from '../../Shared/Loading/Loading';

const MyPhone = () => {
    const { user } = useContext(AuthContext);
    const [deletingMobile, setDeletingMobile] = useState(null);
    const closeModal = () => {
        setDeletingMobile(null);
    }

    const url = `https://buynsell-server.vercel.app/myphone?seller=${user?.email}`
    const { data: allmobile = [], isLoading, refetch } = useQuery({
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

    if (isLoading) {
        return <Loading></Loading>
    }

    const handleDeleteMobile = mobile => {
        fetch(`https://buynsell-server.vercel.app/allmobile/${mobile._id}`, {
            method: 'DELETE',
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    refetch();
                    toast.success(`${mobile.model} deleted successfully`)
                }
            })
    }

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
                            allmobile &&
                            allmobile?.map((mobile, i) => <tr key={mobile._id}>
                                <th>{i + 1}</th>
                                <td>
                                    <div >
                                        <img className="w-24 lg:rounded-xl rounded-sm" src={mobile.image} alt="PhoneImage" />
                                    </div>
                                </td>
                                <td>{mobile.brand}</td>
                                <td>{mobile.model}</td>
                                <td>${mobile.salesPrice}</td>
                                <td>
                                    <label onClick={() => setDeletingMobile(mobile)} htmlFor="confirmation-modal" className="btn btn-sm btn-error">Delete</label>
                                </td>
                                <td>
                                    {
                                        mobile.price && !mobile.paid &&
                                        <Link to={`/dashboard/payment/${mobile._id}`}><button className='btn btn-primary btn-sm'>Pay</button></Link>
                                    }
                                    {
                                        mobile.price && mobile.paid && <span className='text-primary'>Paid</span>
                                    }
                                </td>
                            </tr>)
                        }

                    </tbody>

                </table>
            </div>
            {
                deletingMobile && <ConfirmationModal
                    title={`Are you sure you want to delete?`}
                    message={`If you delete ${deletingMobile.model}. It cannot be undone`}
                    successAction={handleDeleteMobile}
                    successButtonName="Delete"
                    modalData={deletingMobile}
                    closeModal={closeModal}
                >

                </ConfirmationModal>
            }

        </div>
    );
};

export default MyPhone;