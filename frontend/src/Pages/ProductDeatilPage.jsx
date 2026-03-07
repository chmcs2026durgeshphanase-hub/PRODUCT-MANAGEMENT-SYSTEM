import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import api from "../lib/axios";
import toast from "react-hot-toast";
import { LoaderIcon, Trash2Icon, ArrowLeftIcon } from "lucide-react";

const ProductDetailPage = () => {
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await api.get(`/products/${id}`);
                setProduct(res.data);
            } catch (error) {
                console.error("Error fetching product", error);
                toast.error("Failed to fetch the product");
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    const handleDelete = async () => {
        if (!window.confirm("Are you sure you want to delete this product?")) return;

        try {
            await api.delete(`/products/${id}`);
            toast.success("Product deleted successfully");
            navigate("/");
        } catch (error) {
            console.error("Error deleting product", error);
            toast.error("Failed to delete product");
        }
    };

    const handleSave = async () => {
        if (!product.name.trim() || !product.category.trim()) {
            toast.error("Please add product name and category");
            return;
        }

        setSaving(true);

        try {
            await api.put(`/products/${id}`, {
                name: product.name,
                category: product.category,
                price: Number(product.price),
                quantity: Number(product.quantity),
                supplier: product.supplier,
                status: product.status,
                description: product.description,
                unit: product.unit,
                warrantyPeriod: product.warrantyPeriod
            });

            toast.success("Product updated successfully");
            navigate("/");
        } catch (error) {
            console.error("Error updating product", error);
            toast.error("Failed to update product");
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-base-200 flex items-center justify-center">
                <LoaderIcon className="animate-spin size-10" />
            </div>
        );
    }

    const isLowStock = product.quantity <= 10;

    return (
        <div className="min-h-screen bg-base-200">
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-2xl mx-auto">

                    <div className="flex items-center justify-between mb-6">
                        <Link to="/" className="btn btn-ghost">
                            <ArrowLeftIcon className="h-5 w-5" />Back to Products
                        </Link>
                        <button onClick={handleDelete} className="btn btn-error btn-outline">
                            <Trash2Icon className="h-5 w-5" /> Delete Product
                        </button>
                    </div>

                    {isLowStock && (
                        <div className="alert alert-warning mb-6">
                            <span>Low Stock Alert: Only {product.quantity} {product.unit} left!</span>
                        </div>
                    )}

                    <div className="card bg-base-100 shadow-lg">
                        <div className="card-body">

                            <div className="flex flex-col gap-5 mt-4">
                                <div className="flex items-center gap-4">
                                    <label className="font-semibold text-sm w-1/3 text-right">Product Name :</label>
                                    <input type="text" placeholder="Product name" className="input input-bordered w-2/3" value={product.name} onChange={(e) => setProduct({ ...product, name: e.target.value })} />
                                </div>

                                <div className="flex items-center gap-4">
                                    <label className="font-semibold text-sm w-1/3 text-right">Category :</label>
                                    <input type="text" placeholder="Category" className="input input-bordered w-2/3" value={product.category} onChange={(e) => setProduct({ ...product, category: e.target.value })} />
                                </div>

                                <div className="flex items-center gap-4">
                                    <label className="font-semibold text-sm w-1/3 text-right">Price (₹) :</label>
                                    <input type="number" step="0.01" placeholder="Price" className="input input-bordered w-2/3" value={product.price} onChange={(e) => setProduct({ ...product, price: e.target.value })} />
                                </div>

                                <div className="flex items-center gap-4">
                                    <label className="font-semibold text-sm w-1/3 text-right">Quantity :</label>
                                    <input type="number" min="0" placeholder="Quantity" className="input input-bordered w-2/3" value={product.quantity} onChange={(e) => setProduct({ ...product, quantity: e.target.value })} />
                                </div>

                                <div className="flex items-center gap-4">
                                    <label className="font-semibold text-sm w-1/3 text-right">Supplier :</label>
                                    <input type="text" placeholder="Supplier" className="input input-bordered w-2/3" value={product.supplier} onChange={(e) => setProduct({ ...product, supplier: e.target.value })} />
                                </div>

                                <div className="flex items-center gap-4">
                                    <label className="font-semibold text-sm w-1/3 text-right">Status :</label>
                                    <select className="select select-bordered w-2/3" value={product.status} onChange={(e) => setProduct({ ...product, status: e.target.value })}>
                                        <option value="In Stock">In Stock</option>
                                        <option value="Out of Stock">Out of Stock</option>
                                    </select>
                                </div>

                                <div className="flex items-start gap-4">
                                    <label className="font-semibold text-sm w-1/3 text-right mt-3">Description :</label>
                                    <textarea className="textarea textarea-bordered w-2/3 h-24" value={product.description} onChange={(e) => setProduct({ ...product, description: e.target.value })}></textarea>
                                </div>

                                <div className="flex items-center gap-4">
                                    <label className="font-semibold text-sm w-1/3 text-right">Unit :</label>
                                    <select className="select select-bordered w-2/3" value={product.unit} onChange={(e) => setProduct({ ...product, unit: e.target.value })}>
                                        <option value="piece">piece</option>
                                        <option value="Kg">Kg</option>
                                        <option value="liter">liter</option>
                                    </select>
                                </div>

                                <div className="flex items-center gap-4">
                                    <label className="font-semibold text-sm w-1/3 text-right">Warranty Period :</label>
                                    <input type="text" placeholder="e.g. 12 months" className="input input-bordered w-2/3" value={product.warrantyPeriod} onChange={(e) => setProduct({ ...product, warrantyPeriod: e.target.value })} />
                                </div>

                                <div className="card-actions justify-end mt-4">
                                    <button className="btn btn-primary w-2/3" disabled={saving} onClick={handleSave}>
                                        {saving ? "Saving ..." : "Save Changes"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailPage;