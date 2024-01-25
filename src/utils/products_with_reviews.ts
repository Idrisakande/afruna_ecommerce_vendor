import { IProduct } from "@/interfaces/IProductItem";
import { T_review } from "@/types/user.type";

type TProductsMap = { [productId: string]: IProduct };

export function productsWithReviews(products:IProduct[],reviews: T_review[]) {
  // Create an object to map products by their _id
const productsMap:TProductsMap = {};
products.forEach(product => {
  productsMap[product._id] = product;
});

// Create a new array by matching reviews to products
const mergedData:(IProduct & { reviews: T_review[] })[] = reviews.map(review => {
  const product = productsMap[review.productId];
  if (product) {
    // Create a new object that includes product properties and reviews
    return {
   ...(product as IProduct),
      reviews: [review],
    };
  }
  return {
 ...(product as IProduct),
    reviews: [],
  }; 
});

// Filter out empty reviews from mergedData
  const mergedDataFiltered:(IProduct & { reviews: T_review[] })[] = mergedData.filter(data => data.reviews.length > 0);
  return mergedDataFiltered;
}