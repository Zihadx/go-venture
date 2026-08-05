import { Voces } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
const voces = Voces({ subsets: ["latin-ext"], weight: "400" });

export const metadata = {
  title: "Go-Ventures",
  description: "Turn Your Travel Dreams into Reality with Go-Venture",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="light" className={voces.className}>
      <body>
        <div className="min-h-screen w-full">
          <>
            <Toaster position="top-right" richColors />
            {children}
          </>
        </div>
      </body>
    </html>
  );
}
