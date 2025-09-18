// app/layout.tsx
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import { AuthProvider } from "./context/AuthContext";

const poppins = Poppins({ 
  subsets: ["latin"], 
  weight: ["400","500","600","700","800","900"] 
});

export const metadata: Metadata = {
  title: "NauciMe.ba – Pronađi instruktora",
  description: "Oglasnik za instrukcije – pronađi najboljeg instruktora za tvoj predmet.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="bs">
      <body className={poppins.className} style={{ letterSpacing: ".1px" }}>
        <AuthProvider>
          <Header />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}