// export const metadata = {
//   title: "Emotion Bite",
//    description: "Emotional QR App",
// };

// export default function RootLayout({ children }) {
//   return (
//     <html lang="en">
//       <body>{children}</body>
//     </html>
//   );
// }
import { Nunito, Caveat } from "next/font/google";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${nunito.className} ${caveat.className}`}>
        {children}
      </body>
    </html>
  );
}