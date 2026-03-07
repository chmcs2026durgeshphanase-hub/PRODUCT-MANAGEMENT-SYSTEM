// pages/HomePage.jsx
import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import api from '../lib/axios';
import toast from 'react-hot-toast';
import ProductCard from '../components/ProductCard';
import ProductNotFound from '../components/ProductNotFound';

const HomePage = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    // Search & Filter states
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const [unitFilter, setUnitFilter] = useState('All');
    const [lowStockOnly, setLowStockOnly] = useState(false);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await api.get('/products');
                setProducts(res.data);
                setFilteredProducts(res.data);
            } catch (error) {
                console.error("Error fetching products:", error);
                toast.error("Failed to load products");
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    // Apply search + filters
    useEffect(() => {
        let result = [...products];

        // Search by name OR category
        if (searchTerm.trim()) {
            const term = searchTerm.toLowerCase().trim();
            result = result.filter(p =>
                p.name?.toLowerCase().includes(term) ||
                p.category?.toLowerCase().includes(term)
            );
        }

        // Status filter
        if (statusFilter !== 'All') {
            result = result.filter(p => p.status === statusFilter);
        }

        // Unit filter
        if (unitFilter !== 'All') {
            result = result.filter(p => p.unit === unitFilter);
        }

        // Low stock only
        if (lowStockOnly) {
            result = result.filter(p => Number(p.quantity) <= 10);
        }

        setFilteredProducts(result);
    }, [products, searchTerm, statusFilter, unitFilter, lowStockOnly]);

    const lowStockCount = products.filter(p => Number(p.quantity) <= 10).length;

    return (
        <div className='min-h-screen'>
            <Navbar />  {/* No search in navbar – keeping it clean like bookstore */}

            <div className='max-w-7xl mx-auto p-4 mt-6 space-y-6'>

                {/* Low stock alert */}
                {lowStockCount > 0 && (
                    <div className="alert alert-warning shadow-lg">
                        <span>
                            <strong>Low Stock Alert!</strong> {lowStockCount} product(s) have quantity ≤ 10
                        </span>
                    </div>
                )}

                {/* Search bar – main content area */}
                <div className="form-control w-full max-w-xl mx-auto">
                    <label className="label">
                        <span className="label-text">Search by Product Name or Category</span>
                    </label>
                    <input
                        type="text"
                        placeholder="Type product name or category..."
                        className="input input-bordered w-full"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                {/* Filters */}
                <div className="flex flex-col sm:flex-row gap-4 items-end sm:items-center justify-between flex-wrap">
                    <div className="form-control w-full sm:w-48">
                        <label className="label">
                            <span className="label-text">Status</span>
                        </label>
                        <select
                            className="select select-bordered w-full"
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                        >
                            <option>All</option>
                            <option>In Stock</option>
                            <option>Out of Stock</option>
                        </select>
                    </div>

                    <div className="form-control w-full sm:w-48">
                        <label className="label">
                            <span className="label-text">Unit</span>
                        </label>
                        <select
                            className="select select-bordered w-full"
                            value={unitFilter}
                            onChange={(e) => setUnitFilter(e.target.value)}
                        >
                            <option>All</option>
                            <option>piece</option>
                            <option>Kg</option>
                            <option>liter</option>
                        </select>
                    </div>

                    <div className="form-control">
                        <label className="label cursor-pointer gap-2">
                            <input
                                type="checkbox"
                                className="checkbox checkbox-warning"
                                checked={lowStockOnly}
                                onChange={(e) => setLowStockOnly(e.target.checked)}
                            />
                            <span className="label-text">Low Stock Only (≤ 10)</span>
                        </label>
                    </div>
                </div>

                {/* Content */}
                {loading && (
                    <div className='text-center text-primary py-10'>
                        Loading products...
                    </div>
                )}

                {!loading && filteredProducts.length === 0 && (
                    <ProductNotFound />
                )}

                {!loading && filteredProducts.length > 0 && (
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                        {filteredProducts.map((product) => (
                            <ProductCard
                                key={product._id}
                                product={product}
                                setProducts={setProducts}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default HomePage;