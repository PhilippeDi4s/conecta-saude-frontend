import type { Metadata } from "next";
import { Abel } from "next/font/google";

import "./globals.css";

import { Container } from "../Components/Container";
import { ToastifyContainer } from "../Components/ToastifyContainer";
import { Header } from "../Components/Header";
import { BottomBar } from "../Components/BottomBar";

const abel = Abel({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-abel",
});

export const metadata: Metadata = {
  title: {
    template: "%s | Conecta Saúde",
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
      <body className={abel.variable}>
        <Header />
        <Container>{children}</Container>
        <ToastifyContainer />
        <BottomBar/>
      </body>
    </html>
  );
}
