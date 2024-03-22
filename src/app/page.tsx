import HomepageCarousel from "@/components/HomepageCarousel";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import authOptions from "@/lib/auth";
import { getServerSession } from "next-auth";

export default async function Home() {

  const session = await getServerSession(authOptions)

  return (
    <MaxWidthWrapper>
      <HomepageCarousel />
    </MaxWidthWrapper>
  );
}
