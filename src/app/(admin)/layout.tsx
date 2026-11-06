import AppShell from "@/components/layout/AppShell";
import AuthGuard from "@/components/layout/AuthGuard";

// Every admin route shares the guarded sidebar + header shell. The session and boutique data
// live in the browser (src/store), so AuthGuard shows a splash on the server and each page
// mounts after hydration — which is why every admin page sets `instant = false`.
export default function AdminLayout({ children }: LayoutProps<"/">) {
  return (
    <AuthGuard>
      <AppShell>{children}</AppShell>
    </AuthGuard>
  );
}
