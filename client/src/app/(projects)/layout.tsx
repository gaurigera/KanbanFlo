import { Sidebar } from "@/app/(projects)/[projectId]/sidebar";

export default function HomeLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <section className="flex h-screen">
      <Sidebar />
      <section className="flex-1 p-5 space-y-3 bg-neutral-50/45">
        {children}
      </section>
    </section>
  );
}
