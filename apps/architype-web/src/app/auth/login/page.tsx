// apps/architype-web/src/app/auth/login/page.tsx
export const dynamic = "force-dynamic";
export const revalidate = 0;

import LoginClient from "./LoginClient"; // client-only UI (no server imports)

export default function Page() {
  return <LoginClient />;
}
