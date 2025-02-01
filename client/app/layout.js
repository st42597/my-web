import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

export const metadata = {
  title: "WillKi.dev",
  description: "WillKi.dev - 내가 만든 내 블로그",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main className="content-container">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
