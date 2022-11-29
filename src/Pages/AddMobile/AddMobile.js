// import { useQuery } from '@tanstack/react-query';
// import React, { useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { useNavigate } from 'react-router-dom';
// // import toast from 'react-hot-toast';
// import Loading from '../Shared/Loading/Loading';
// import toast, { Toaster } from 'react-hot-toast';

// const AddMobile = () => {
//     // const { register, handleSubmit, formState: { errors } } = useForm();
//     // const [signUpError, setSignUPError] = useState('');
//     const imageHostKey = process.env.REACT_APP_imagebb_key;

//     // const navigate = useNavigate();

//     const { data: brand, isLoading } = useQuery({
//         queryKey: ['brand'],
//         queryFn: async () => {
//             const res = await fetch('https://buynsell-server.vercel.app/brand')
//             const data = await res.json();
//             return data;
//         }
//     })

//     const handleAddMobile = (data) => {
//         console.log(data);
//         setSignUPError('');
//         console.log(data.image[0]);
//         const image = data.image[0];
//         const formData = new FormData();
//         formData.append('image', image);
//         const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`
//         fetch(url, {
//             method: 'POST',
//             body: formData
//         })
//             .then(res => res.json())
//             .then(imgData => {
//                 if (imgData.success)
//                     console.log(imgData.data.url);
//                 const mobile = {
//                     brand: data.brand,
//                     model: data.model,
//                     image: imgData.data.url
//                 }
//                 // save doctor information in the database
//                 fetch('https://buynsell-server.vercel.app/allmobile', {
//                     method: 'POST',
//                     headers: {
//                         'content-type': 'application/json',
//                         // authorization: `bearer ${localStorage.getItem('accessToken')}`
//                     },
//                     body: JSON.stringify(mobile)
//                 })
//                     .then(res => res.json())
//                     .then(result => {
//                         console.log(result);
//                         toast.success(`${data.model} is added successfully`)
//                         navigate('/dashboard/managephone')
//                     })
//             })
//     }

//     if (isLoading) {
//         return <Loading />
//     }
//     const addMobile = event => {
//         event.preventDefault();
//         const form = event.target;
//         const submissionTime = new Date().getTime();
//         const image = form.image.value;
//         const rating = form.rating.value;
//         const title = form.title.value;
//         const price = form.price.value;
//         const content = form.content.value;

//         console.log(submissionTime, image, rating, title, price, content);

//         const service = {
//             submissionTime,
//             image,
//             rating,
//             title,
//             price,
//             content,
//         }


//         console.log(service)

//         fetch('https://buynsell-server.vercel.app/allmobile', {
//             method: 'POST',
//             headers: {
//                 'content-type': 'application/json'
//             },
//             body: JSON.stringify(service)
//         })
//             .then(res => res.json())
//             .then(data => {
//                 if (data.acknowledged) {
//                     <div>
//                         {toast.success('Mobile added successfully!')}
//                         < Toaster />
//                     </div>
//                     event.target.reset();
//                 }
//             })
//     }

//     return (
//         <div className='h-screen flex flex-col justify-top items-center my-4'>

//             <div className='grid justify-items-center my-8'>
//                 <h2>Add Service</h2>
//                 <form onSubmit={addMobile} className='mt-4 grid gap-2 w-96'>
//                     <select name='brand'

//                         className="select input-bordered w-full max-w-xs">
//                         <option disabled selected>Select the Brand</option>
//                         {
//                             brand.map(bName => <option
//                                 key={bName._id}
//                                 value={bName.brand}
//                             >{bName.brand}</option>)
//                         }
//                     </select>
//                     <input type="text" name='title' placeholder="Service Title" className="input input-bordered w-full" required />
//                     <input type="link" name='image' placeholder="Service Image" className="input input-bordered w-full" required />

//                     <div className='flex gap-4'>
//                         <input type="text" name='price' className="input input-bordered w-1/2" placeholder="Price $" required></input>
//                         <input type="number" name='rating' placeholder="Rating 1 to 5" min="1" max="5" step="0.5" className="input input-bordered w-1/2" required />
//                     </div>

//                     <textarea type="text" name='content' className="textarea textarea-bordered" placeholder="Fill Up" required></textarea>
//                     <button type='submit' className='btn'>Add Service</button>
//                     <Toaster />

//                 </form>
//             </div>
//             {/* <h2 className='text-2xl'>Add your phone to sell</h2>

//             <div className='w-96 p-7 shadow-lg rounded-2xl'>
//                 <form onSubmit={handleSubmit(handleAddMobile)} >

//                     <div className="form-control w-full max-w-xs ">
//                         <label className="label"> <span className="label-text">Brand Name</span></label>
//                         <select
//                             {...register("brand",
//                                 { required: "Brand name is required" }
//                             )}
//                             className="select input-bordered w-full max-w-xs">
//                             <option disabled selected>Select the Brand</option>
//                             {
//                                 brand.map(bName => <option
//                                     key={bName._id}
//                                     value={bName.brand}
//                                 >{bName.brand}</option>)
//                             }
//                         </select>
//                         {errors.img && <p className='text-red-600'>{errors.img.message}</p>}
//                     </div>

//                     <div className="form-control w-full max-w-xs ">
//                         <label className="label"> <span className="label-text">Photo</span></label>
//                         <input type="file" {...register("image")} className="input input-bordered w-full max-w-xs" />
//                         {errors.img && <p className='text-red-600'>{errors.img.message}</p>}
//                     </div>

//                     <div className="form-control w-full"
//                         {...register("model",
//                             { required: "Mobile name is required" }
//                         )}>
//                         <label className="label">
//                             <span className="label-text">Model</span>
//                         </label>
//                         <input type="text" placeholder="Mobile Model No" className="input input-bordered w-full max-w-xs" />
//                     </div>
//                     <input className='btn w-full bg-accent my-4' value="Add Phone" type="submit" />
//                     {signUpError && <p className="text-red-600">{ }signUpError</p>}
//                 </form>
//             </div> */}



//         </div>
//     );
// };

// export default AddMobile;