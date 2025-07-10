"use client";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    category: string;
    image: string;
    price: string;
  };
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="group rounded-xl border border-gray-200/80 bg-white shadow-sm transition-all hover:shadow-lg overflow-hidden">
      <div className="relative overflow-hidden">
        <Link href={`/products/${product.id}`}>
          <Image
            src={product.image}
            alt={product.name}
            width={400}
            height={300}
            className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </Link>
        <div className="absolute bottom-4 right-4">
          <button className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-gray-700 shadow-md transition-colors hover:bg-orange-500 hover:text-white">
            <ShoppingCart size={20} />
          </button>
        </div>
      </div>
      <div className="p-5">
        <p className="mb-1 text-sm text-gray-500">{product.category}</p>
        <h3 className="mb-3 text-lg font-semibold text-gray-800">
          <Link href={`/products/${product.id}`}>{product.name}</Link>
        </h3>
        <p className="font-bold text-orange-600">{product.price}</p>
      </div>
    </div>
  );
};

export default ProductCard;
