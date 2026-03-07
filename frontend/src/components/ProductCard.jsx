import { Link, useLocation } from "react-router";
import { Package, Tags, Truck, IndianRupee, ShieldCheck, Edit2, Trash2 } from "lucide-react";
import { formatData } from "../lib/utils";
import api from "../lib/axios";
import toast from "react-hot-toast";
import { useState } from "react";

const ProductCard = ({ product, setProducts }) => {
const [showModal, setShowModal] = useState(false);
const location = useLocation();
const isActive = location.pathname === `/product/${product._id}`;
const isLowStock = product.quantity <= 10;

const handleDelete = async () => {
    try {
      await api.delete(`/products/${product._id}`);
      setProducts((prev) => prev.filter((p) => p._id !== product._id));
      toast.success("Product deleted successfully");
    } catch {
      toast.error("Failed to delete product");
    } finally {
      setShowModal(false);
    }
  };

return (
    <>
      <Link
        to={`/product/${product._id}`}
        className={`
          relative block rounded-xl bg-base-100 p-5 border border-base-300
          transition-all duration-300 ease-in-out
          hover:shadow-2xl hover:-translate-y-3 hover:scale-[1.03]
          hover:border-primary hover:ring-1 hover:ring-primary/30
          ${isActive ? "border-primary shadow-lg scale-[1.03]" : ""}
        `}
      >
        {/* Top Row */}
        <div className="flex justify-between items-start flex-wrap gap-2 mb-4">
        <p className="text-xs text-base-content/60 font-mono">
            {product._id.substring(0, 8)}...
          </p>
          <div className="flex gap-2">
            <span className={`badge ${product.status === 'In Stock' ? 'badge-success' : 'badge-error'} font-medium px-3 py-1`}>
              {product.status}
            </span>
            {isLowStock && (
              <span className="badge badge-warning font-medium px-3 py-1">
                Low Stock ⚠️
              </span>
            )}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Package className="size-5 text-primary flex-shrink-0" />
            <p className="font-semibold text-base-content text-lg line-clamp-1">
              {product.name}
            </p>
          </div>

          <div className="flex items-center gap-3 text-base-content/80 text-sm">
            <Tags className="size-4 text-primary flex-shrink-0" />
            <span className="font-medium line-clamp-1">{product.category}</span>
          </div>

          <div className="flex items-center gap-3 text-base-content/80 text-sm">
            <Truck className="size-4 text-primary flex-shrink-0" />
            <span className="font-medium line-clamp-1">{product.supplier}</span>
          </div>

          <div className="flex items-center gap-3 text-base-content/80 text-sm">
            <IndianRupee className="size-4 text-primary flex-shrink-0" />
            <span className="font-medium">
              ₹{product.price} × {product.quantity} {product.unit}
            </span>
          </div>

          <div className="flex items-center gap-3 text-base-content/80 text-sm">
            <ShieldCheck className="size-4 text-primary flex-shrink-0" />
            <span className="font-medium">{product.warrantyPeriod}</span>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-5 flex justify-between items-center text-sm text-base-content/60">
          <span>{formatData(new Date(product.createdAt))}</span>

          <div className="flex gap-5">
            <Edit2 className="size-5 text-warning cursor-pointer hover:scale-110 transition" />
            <Trash2
              className="size-5 text-error cursor-pointer hover:scale-110 transition"
              onClick={(e) => {
                e.preventDefault();
                setShowModal(true);
              }}
            />
          </div>
        </div>
      </Link>

      {/* Delete Confirmation Modal */}
      {showModal && (
        <dialog className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg text-error flex items-center gap-2">
              <Trash2 className="size-5" /> Delete Product
            </h3>
            <p className="py-4 text-base-content/70">
              Are you sure you want to delete <span className="font-semibold text-base-content">"{product.name}"</span>?<br />
              This action cannot be undone.
            </p>
            <div className="modal-action">
              <button className="btn btn-ghost" onClick={() => setShowModal(false)}>
                Cancel
              </button>
              <button className="btn btn-error flex items-center gap-2" onClick={handleDelete}>
                <Trash2 className="size-4" /> Delete
              </button>
            </div>
          </div>
        </dialog>
      )}
    </>
  );
};

export default ProductCard;