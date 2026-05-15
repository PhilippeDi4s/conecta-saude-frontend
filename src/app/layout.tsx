import type { Metadata } from "next";
import "./globals.css";
import { Container } from "../Components/Container";
import { ToastifyContainer } from "../Components/ToastifyContainer";

export const metadata: Metadata = {
  title: {
    template: "% | Conecta Saúde",
    default: "Conecta Saúde",
  },
  description:
    "Conecta Saúde — Agende consultas médicas online com especialistas em Dermatologia, Cardiologia e Pediatria. Rápido, simples e sem complicação",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body>
        <Container>{children}</Container>
        <ToastifyContainer />
      </body>
    </html>
  );
}
