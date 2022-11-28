import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import ConfirmationModal from '../../Shared/ConfirmationModal/ConfirmationModal';
import Loading from '../../Shared/Loading/Loading';

const AllPhones = () => {
    const [deletingMobile, setDeletingMobile] = useState(null);
    const closeModal = () => {
        setDeletingMobile(null);
    }

    const { data: allmobile, isLoading, refetch } = useQuery({
        queryKey: ['allmobile'],
        queryFn: async () => {
            try {
                const res = await fetch('http://localhost:4000/allmobile', {
                    headers: {
                        authorization: `bearer ${localStorage.getItem('accessToken')}`
                    }
                });
                const data = await res.json();
                return data;
            }
            catch (error) {

            }
        }
    });


    if (isLoading) {
        return <Loading></Loading>
    }

    const handleDeleteMobile = mobile => {
        fetch(`http://localhost:4000/allmobile/${mobile._id}`, {
            method: 'DELETE',
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    refetch();
                    toast.success(`${allmobile.model} deleted successfully`)
                }
            })
    }
    return (
        <div>
            <h2>All Buyers</h2>
            <div className="overflow-x-auto">
                <table className="table w-full">

                    <thead>
                        <tr>
                            <th></th>
                            <th>Image</th>
                            <th>Model</th>
                            <th>Email</th>
                            <th>Admin Action</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            allmobile.map((mobile, i) =>
                                <tr key={mobile._id}>
                                    <th>{i + 1}</th>
                                    <td>
                                        <div >
                                            <img className="w-24 lg:rounded-xl rounded-sm" src={mobile.image} alt="PhoneImage" />
                                        </div>
                                    </td>
                                    <td>{mobile.model}</td>
                                    <td>{mobile.seller}</td>
                                    <td>
                                        <label onClick={() => setDeletingMobile(mobile)} htmlFor="confirmation-modal" className="btn btn-sm btn-error">Delete</label>
                                    </td>
                                </tr>
                            )
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

export default AllPhones;