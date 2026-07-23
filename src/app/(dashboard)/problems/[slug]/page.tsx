import { notFound } from "next/navigation";
import { PROBLEMS_DATA } from "@/data/problemsData";
import { getProblemDetailBySlug } from "@/data/problemDetailData";
import { ProblemWorkspace } from "@/components/workspace/ProblemWorkspace";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ProblemDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const basicInfo = PROBLEMS_DATA.find((p) => p.slug === slug);

  if (!basicInfo && slug !== "two-sum" && slug !== "palindrome-number") {
    // If not in data list at all, we can fallback dynamically or 404
  }

  const problemDetail = getProblemDetailBySlug(slug, basicInfo);

  return <ProblemWorkspace problem={problemDetail} />;
}
