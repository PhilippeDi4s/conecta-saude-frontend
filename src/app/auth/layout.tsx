import { Header } from "@/src/Components/Header";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />

      {children}
    </>
  );
}
