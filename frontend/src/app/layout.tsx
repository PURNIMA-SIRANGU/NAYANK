import "@fontsource/space-grotesk";
import "./globals.css";

export const metadata = {
  title: "NAYANK",
  description: "AI Investigation Platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        style={{
          background: "#040B14",
          color: "#FFFFFF",
          margin: 0,
        }}
      >
        {children}
      </body>
    </html>
  );
}