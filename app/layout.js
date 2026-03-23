export const metadata = {
  title: "scanova Login",
   description: "Emotional QR App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}