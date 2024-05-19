import { Inter } from "next/font/google";
import "./globals.css"; 
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Go-Venture",
  description: "Turn Your Travel Dreams into Reality with Go-Venture",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme= "light" className={inter.className}>
      <body >
        <div className="min-h-screen w-full">{children}
        </div>
      </body>
    </html>
  );
}
