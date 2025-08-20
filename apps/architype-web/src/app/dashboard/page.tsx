// SERVER component
import { db, dbEnabled } from "@/src/lib/db";
export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const supa = db();
  const { data: orgs } = await supa
    .from("orgs")
    .select("*")
    .order("created_at", { ascending: false });

  // Import locally to avoid client pulling server deps
  const DashboardContent = (await import("@/src/components/dashboard-content")).default;
  return <DashboardContent orgs={orgs ?? []} supabaseOn={dbEnabled} />;
}
