import HomePageClient from "./HomePageClient";
import { Product as ProductCardType } from "../components/ProductCard";

interface APIProduct {
  id: number;
  nama: string;
  kategori: string;
  harga: number;
  stok: number;
  deskripsi: string;
  gambar: string;
}

export default async function Index() {
  let initialProducts: ProductCardType[] = [];
  let fetchError = false;

  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    if (baseUrl) {
      const response = await fetch(`${baseUrl}/produk`, {
        next: { revalidate: 60 } // Cache and revalidate every 60 seconds
      });
      if (!response.ok) throw new Error("Server error");
      const allProducts = await response.json();
      initialProducts = allProducts.slice(0, 8).map((product: APIProduct) => ({
        id: String(product.id),
        name: product.nama,
        category: product.kategori,
        images: [`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/uploads/${product.gambar}`],
        price: product.harga,
        inStock: product.stok > 0,
        name_id: product.nama,
        name_en: product.nama,
        description_id: product.deskripsi,
        description_en: product.deskripsi,
        ageRange: "",
        dimensions: { length: 0, width: 0, height: 0 },
        materials: [],
        weight: 0,
        featured: false,
      }));
    } else {
      fetchError = true;
    }
  } catch (error) {
    console.error("Failed to fetch featured products:", error);
    fetchError = true;
  }

  return <HomePageClient initialProducts={initialProducts} fetchError={fetchError} />;
}
