export const metadata = {
  title: "Emotion Bite",
   description: "Emotional QR App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}