import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider';
import ConfirmationModal from '../../Shared/ConfirmationModal/ConfirmationModal';
import Loading from '../../Shared/Loading/Loading';

const BookedPhone = () => {
    const { user } = useContext(AuthContext);
    const [deletingMobile, setDeletingMobile] = useState(null);
    const closeModal = () => {
        setDeletingMobile(null);
    }



    const url = `http://localhost:4000/buyerbookedphone?buyer=${user?.email}`
    const { data: bookedPhone = [], isLoading, refetch } = useQuery({
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
        fetch(`http://localhost:4000/allbookedphone/${mobile._id}`, {
            method: 'DELETE',
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    refetch();
                    toast.success(`${bookedPhone.model} deleted successfully`)
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
                            <th>Payment</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            bookedPhone &&
                            bookedPhone?.map((phone, i) => <tr key={phone._id}>
                                <th>{i + 1}</th>
                                <td>
                                    <div >
                                        <img className="w-24 lg:rounded-xl rounded-sm" src={phone.image} alt="PhoneImage" />
                                    </div>
                                </td>
                                <td>{phone.brand}</td>
                                <td>{phone.model}</td>
                                <td>${phone.salesPrice}</td>
                                {/* <td>
                                    <label onClick={() => setDeletingMobile(phone)} htmlFor="confirmation-modal" className="btn btn-sm btn-error">Pay Now</label>
                                </td> */}
                                <td>
                                    {
                                        // phone.price && !phone.paid &&
                                        <Link to={`/dashboard/payment/${phone._id}`}><button className='btn btn-primary btn-sm'>Pay</button></Link>
                                    }
                                    {
                                        // phone.price && phone.paid && <span className='text-primary'>Paid</span>
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
                    message={`If you delete ${deletingMobile.name}. It cannot be undone`}
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

export default BookedPhone;