import HomepageCarousel from "@/components/HomepageCarousel";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import ProductCard from "@/components/ProductCard";
import { products } from "@/db/schema";
import authOptions from "@/lib/auth";
import { db } from "@/lib/db";
import { eq } from "drizzle-orm";
import { getServerSession } from "next-auth";

export default async function Home() {

  const session = await getServerSession(authOptions)

  const featuredProducts = await db.select().from(products).where(eq(products.isFeatured, true))

  console.log(featuredProducts)

  return (
    <MaxWidthWrapper>
      <HomepageCarousel />
      <div className="w-full p-2 mt-6">
        <h1 className="text-xl py-2">Featured Products</h1>
        <div className="grid grid-cols-4 gap-4">
          {featuredProducts?.map((item) => (
            <ProductCard key={item.id} product={item}/>
          ))}

        </div>
      </div>

    </MaxWidthWrapper>
  );
}
