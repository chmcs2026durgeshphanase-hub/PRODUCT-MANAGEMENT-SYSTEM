import api from '../lib/axios';
import { ArrowLeftIcon } from 'lucide-react';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router';

const CreatePage = () => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [supplier, setSupplier] = useState('');
  const [status, setStatus] = useState('In Stock');
  const [description, setDescription] = useState('');
  const [unit, setUnit] = useState('piece');
  const [warrantyPeriod, setWarrantyPeriod] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.post('/products', {
        name,
        category,
        price: Number(price),
        quantity: Number(quantity),
        supplier,
        status,
        description,
        unit,
        warrantyPeriod
      });
      toast.success('Product created successfully!');
      navigate('/');
    } catch (error) {
      console.log('Error creating product', error);
      toast.error('Failed to create product.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-200">
    <div className="container mx-auto px-4 py-8">
    <div className="max-w-2xl mx-auto">
    <Link to="/" className="btn btn-ghost mb-8 text-base-content hover:bg-base-300">
    <ArrowLeftIcon className="size-5 mr-2" /> Back to Products </Link>

    <div className="card bg-base-300 shadow-xl">
    <div className="card-body">
    <h2 className="card-title text-2xl mb-6 text-base-content">Create New Product</h2>
    <form onSubmit={handleSubmit} className="space-y-6">

    <div className="form-control">
    <label className="label">
    <span className="label-text text-gray-300 font-semibold">Product Name</span> </label>
    <input
        type="text"
        placeholder="Product Name"
        className="
                input input-bordered w-full bg-base-200 text-white font-medium
                border-gray-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30
                placeholder:text-gray-500 placeholder:font-normal placeholder:opacity-80 "
                value={name}
                onChange={(e) => setName(e.target.value)}
                required />
    </div>

    <div className="form-control">
    <label className="label">
    <span className="label-text text-gray-300 font-semibold">Category</span> </label>
    <input type="text" placeholder="e.g. Electronics, Clothing, etc." className="
                      input input-bordered w-full bg-base-200 text-white font-medium
                      border-gray-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30
                      placeholder:text-gray-500 placeholder:font-normal placeholder:opacity-80 "
    value={category}
    onChange={(e) => setCategory(e.target.value)}
    required />
    </div>

    <div className="form-control">
    <label className="label">
    <span className="label-text text-gray-300 font-semibold">Price (₹)</span> </label>
    <input type="number" step="0.01" placeholder="e.g. 499.99" className="
                      input input-bordered w-full bg-base-200 text-white font-medium
                      border-gray-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30
                      placeholder:text-gray-500 placeholder:font-normal placeholder:opacity-80
                    "
    value={price}
    onChange={(e) => setPrice(e.target.value)}
    required />
    </div>

    <div className="form-control">
    <label className="label">
    <span className="label-text text-gray-300 font-semibold">Quantity</span> </label>
    <input type="number" min="0" placeholder="e.g. 50" className="
                      input input-bordered w-full bg-base-200 text-white font-medium
                      border-gray-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30
                      placeholder:text-gray-500 placeholder:font-normal placeholder:opacity-80
                    "
    value={quantity}
    onChange={(e) => setQuantity(e.target.value)}
    required />
    </div>

    <div className="form-control">
    <label className="label">
    <span className="label-text text-gray-300 font-semibold">Supplier</span> </label>
    <input type="text" placeholder="Supplier Name" className="
                      input input-bordered w-full bg-base-200 text-white font-medium
                      border-gray-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30
                      placeholder:text-gray-500 placeholder:font-normal placeholder:opacity-80
                    "
    value={supplier}
    onChange={(e) => setSupplier(e.target.value)} required />
    </div>

    <div className="form-control">
    <label className="label">
    <span className="label-text text-gray-300 font-semibold">Status</span> </label>
    <select className="
                      select select-bordered w-full bg-base-200 text-white font-medium
                      border-gray-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30
                    "
    value={status}
    onChange={(e) => setStatus(e.target.value)}
    required >
    <option value="In Stock">In Stock</option>
    <option value="Out of Stock">Out of Stock</option>
    </select>
    </div>

    <div className="form-control">
    <label className="label">
    <span className="label-text text-gray-300 font-semibold">Description</span> </label>
    <textarea className="
                      textarea textarea-bordered h-32 w-full bg-base-200 text-white font-medium
                      border-gray-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30
                      placeholder:text-gray-500 placeholder:font-normal placeholder:opacity-80
                    "
    placeholder="Short details of the product"
    value={description}
    onChange={(e) => setDescription(e.target.value)}
    ></textarea>
    </div>

    <div className="form-control">
    <label className="label">
    <span className="label-text text-gray-300 font-semibold">Unit</span>
    </label>
    <select
       className="
                   select select-bordered w-full bg-base-200 text-white font-medium
                   border-gray-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30
                    "
        value={unit}
        onChange={(e) => setUnit(e.target.value)}
        required >
        <option value="piece">piece</option>
        <option value="Kg">Kg</option>
        <option value="liter">liter</option>
        </select>
        </div>

        <div className="form-control">
        <label className="label">
        <span className="label-text text-gray-300 font-semibold">Warranty Period</span>
        </label>
        <input type="text" placeholder="e.g. 12 months or 1 year" className="
                      input input-bordered w-full bg-base-200 text-white font-medium
                      border-gray-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30
                      placeholder:text-gray-500 placeholder:font-normal placeholder:opacity-80
                    "
        value={warrantyPeriod}
        onChange={(e) => setWarrantyPeriod(e.target.value)}
        required />
        </div>

        <div className="card-actions justify-end mt-10">
        <button type="submit" className="btn btn-primary px-10" disabled={loading} >
        {loading ? "Creating..." : "Create Product"}
        </button>
        </div> </form> </div> </div> </div> </div> </div>
  );
};

export default CreatePage;