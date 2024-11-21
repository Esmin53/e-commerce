import HomepageCarousel from "@/components/HomepageCarousel";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import ProductCard from "@/components/ProductCard";
import { products } from "@/db/schema";
import { db } from "@/lib/db";
import { eq } from "drizzle-orm";

export default async function Home() {

  const featuredProducts = await db.select().from(products).where(eq(products.isFeatured, true))

  return (
    <MaxWidthWrapper>
      <HomepageCarousel />
      <div className="w-full p-2 mt-6 text-gray-600">
        <p className="text-sm font-medium text-gray-600">Featured Products</p>
        <h1 className="text-2xl py-2 text-gray-900 font-semibold">Our High Quality Featured Products</h1>
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
          {featuredProducts?.map((item) => (
            <ProductCard key={item.id} product={item}/>
          ))}
        </div>
      </div>
    </MaxWidthWrapper>
  );
}
