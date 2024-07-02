import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { constructMetadata } from "~/lib/utils";

export const metadata = constructMetadata();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>{children}</body>
    </html>
  );
}