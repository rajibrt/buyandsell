import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import Loading from '../Shared/Loading/Loading';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { AuthContext } from '../../contexts/AuthProvider';
import { DayPicker } from 'react-day-picker';
import { format } from 'date-fns';

const SubmitMobile = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const imageHostKey = process.env.REACT_APP_imagebb_key;
    const { user } = useContext(AuthContext);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const navigate = useNavigate();
    const purchaseDate = format(selectedDate, 'PP');
    console.log(purchaseDate);
    const submissionDate = format(new Date(), 'PPpp');
    console.log(submissionDate);

    const { data: brand, isLoading } = useQuery({
        queryKey: ['brand'],
        queryFn: async () => {
            const res = await fetch('http://localhost:4000/brand')
            const data = await res.json();
            return data;
        }
    })

    const handleAddPhone = (data) => {
        console.log(data);
        console.log(data.image[0]);
        const image = data.image[0];
        const formData = new FormData();
        formData.append('image', image);
        const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`
        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imgData => {
                if (imgData.success)
                    console.log(imgData.data.url);
                const mobile = {
                    brand: data.brand,
                    condition: data.condition,
                    location: data.location,
                    mobileno: data.mobileno,
                    description: data.description,
                    model: data.model,
                    salesPrice: data.salesPrice,
                    image: imgData.data.url,
                    seller: user.email,
                    purchasesDate: purchaseDate,
                    originalPrice: data.originalPrice,
                    postDate: submissionDate
                }

                fetch('http://localhost:4000/allmobile', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json',
                        authorization: `bearer ${localStorage.getItem('accessToken')}`
                    },
                    body: JSON.stringify(mobile)
                })
                    .then(res => res.json())
                    .then(result => {
                        console.log(result);
                        if (data.acknowledged) {
                            <div>
                                {toast.success('Mobile added successfully!')}
                                < Toaster />
                            </div>
                        }
                        toast.success(`${data.model} is added successfully`)
                    })
            })
    }

    if (isLoading) {
        return <Loading />
    }

    return (

        <div className='grid justify-items-center my-8'>
            <div className='w-96 p-7 shadow-lg rounded-2xl'>
                <h2 className='text-xl text-center mb-10'>Add Mobile</h2>
                <form onSubmit={handleSubmit(handleAddPhone)} >
                    <label className="label"> <span className="label-text">Brand</span></label>
                    <select
                        {...register("brand",
                            { required: "Brand name is required" }
                        )}
                        className="select input-bordered w-full max-w-xs">
                        <option disabled selected>Select the Brand</option>
                        {
                            brand.map(bName => <option
                                key={bName._id}
                                value={bName.brand}
                            >{bName.brand}</option>)
                        }
                        {errors.email && <p className='text-red-600'>{errors.email?.message}</p>}
                    </select>

                    <label className="label"> <span className="label-text">Condition</span></label>
                    <select
                        {...register("condition",
                            { required: "Select the mobile condition" }
                        )}
                        className="select input-bordered w-full max-w-xs">
                        <option selected>Excellent</option>
                        <option selected>Good</option>
                        <option selected>Fair</option>
                        <option disabled selected>Select the mobile condition</option>
                        {errors.condition && <p className='text-red-600'>{errors.condition?.message}</p>}
                    </select>

                    <div className="form-control w-full max-w-xs ">
                        <label className="label"> <span className="label-text">Model</span></label>
                        <input type="text" {...register("model", {
                            required: "Name is required",
                        })} className="input input-bordered w-full max-w-xs" />
                    </div>
                    <div className="form-control w-full max-w-xs ">
                        <label className="label"> <span className="label-text">Original Price</span></label>
                        <input type="text" {...register("originalPrice", {
                            required: "Original price required",
                        })} className="input input-bordered w-full max-w-xs" />
                        {errors.price && <p className='text-red-600'>{errors.price?.message}</p>}
                    </div>
                    <div className="form-control w-full max-w-xs ">
                        <label className="label"> <span className="label-text">Sales Price</span></label>
                        <input type="text" {...register("salesPrice", {
                            required: "Sales price required",
                        })} className="input input-bordered w-full max-w-xs" />
                        {errors.price && <p className='text-red-600'>{errors.price?.message}</p>}
                    </div>
                    <div className="form-control w-full max-w-xs ">
                        <label className="label"> <span className="label-text">Contact No</span></label>
                        <input type="text" {...register("mobileno", {
                            required: "Your mobile no required",
                        })} className="input input-bordered w-full max-w-xs" />
                        {errors.mobileno && <p className='text-red-600'>{errors.mobileno?.message}</p>}
                    </div>
                    <div className="form-control w-full max-w-xs ">
                        <label className="label"> <span className="label-text">Location</span></label>
                        <input type="text" {...register("location", {
                            required: "You location required",
                        })} className="input input-bordered w-full max-w-xs" />
                        {errors.location && <p className='text-red-600'>{errors.location?.message}</p>}
                    </div>
                    <div className='mb-6'>
                        <DayPicker
                            mode='single'
                            selected={selectedDate}
                            onSelect={setSelectedDate}
                        ></DayPicker>
                        <p>Purchases Date: {format(selectedDate, 'PP')}</p>
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Mobile Description</span>

                        </label>
                        <textarea {...register("description", {
                            required: "Please write a description",
                        })} className="textarea textarea-bordered h-24" placeholder="Please write down the mobile description as much you can..."></textarea>

                    </div>
                    <div className="form-control w-full max-w-xs ">
                        <label className="label"> <span className="label-text">Photo</span></label>
                        <input type="file" {...register("image", {
                            required: "Photo is required",
                        })} className="input input-bordered w-full max-w-xs" />
                        {errors.img && <p className='text-red-600'>{errors.img.message}</p>}
                    </div>
                    <input className='btn w-full bg-accent my-4' value="Add Mobile" type="submit" />
                    < Toaster />
                </form>
            </div>
        </div>
    );
};

export default SubmitMobile;