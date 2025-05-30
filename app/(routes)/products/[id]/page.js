import ProductDetails from "@/components/products/product-details";
import ReviewSection from "@/components/products/review-section";
import { PRODUCT_QUERIES } from "@/lib/db/actions";

export default async function ProductPage({ params }) {
  const { id } = await params;
  const raw = await PRODUCT_QUERIES.getProductDetailsWithReviews(id);

  if (!raw) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <p className="text-xl">Product not found.</p>
      </div>
    );
  }

  const product = {
    id: raw.id,
    name: raw.name,
    description: raw.description,
    price: raw.price.toNumber(), 
    category: raw.category,
    url: raw.url,
    status: raw.status,
    mainImage: raw.mainImage,
    createdAt: raw.createdAt.toISOString(), 
    updatedAt: raw.updatedAt.toISOString(),
    sellerId: raw.sellerId,
    seller: { name: raw.sellerName}, 
    avgRating: raw.avgRating,
    reviewsCount: raw.reviewsCount,
    reviews: raw.reviews.map((r) => ({
      id: r.id,
      rating: r.rating,
      comment: r.comment,
      createdAt: r.createdAt.toISOString(),
      reviewer: { name: r.reviewer.name },
    })),
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-12 bg-[#F8F8F8]">
      {/* Product Details */}
      <ProductDetails product={product} />

      {/* Reviews */}
      <ReviewSection reviews={product.reviews} productId={product.id} />
    </div>
  );
}
