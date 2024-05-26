import { Voces } from "next/font/google";
import "./globals.css"; 
const voces = Voces({ subsets: ["latin-ext"], weight: '400'});

export const metadata = {
  title: "Go-Venture",
  description: "Turn Your Travel Dreams into Reality with Go-Venture",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme= "light" className={voces.className}>
      <body >
        <div className="min-h-screen w-full">{children}
        </div>
      </body>
    </html>
  );
}
