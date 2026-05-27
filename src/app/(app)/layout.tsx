import { BottomBar } from "@/src/Components/BottomBar";
import { Container } from "@/src/Components/Container";
import { Header } from "@/src/Components/Header";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />

      <Container>{children}</Container>

      <BottomBar />
    </>
  );
}
