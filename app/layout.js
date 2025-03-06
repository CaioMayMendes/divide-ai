import { Open_Sans, Bebas_Neue } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const opensans = Open_Sans({ subsets: ["latin"] });
const fugaz = Bebas_Neue({ subsets: ["latin"], weight: ["400"] });

export const metadata = {
  title: "Divede-AI",
  description: "Use IA para dividir as contas do jantar.",
};

const header = (
  <header className="p-4 sm:p-8 flex items-center justify-between gap-4">
    <Link href="/">
      <h1 className={"text-base sm:text-lg textGradient " + fugaz.className}>
        Divede-AI
      </h1>
    </Link>
  </header>
);

const footer = (
  <footer className="p-4 sm:p-8 grid place-items-center">
    <p>
      Criado por{" "}
      <span className={"textGradient " + fugaz.className}>Maynds</span>
    </p>
  </footer>
);

export default function RootLayout({ children }) {
  return (
    <html lang="en">
        <body
          className={
            "w-full max-w-[1000px] mx-auto text-sm sm:text-base min-h-screen flex flex-col text-slate-800 " +
            opensans.className
          }
        >
          {header}
          {children}
          {footer}
        </body>
    </html>
  );
}