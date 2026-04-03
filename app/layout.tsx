import type { Metadata } from "next";
import RouteTransition from "../components/RouteTransition";
import "./globals.css";

export const metadata: Metadata = {
  title: "RecruX",
  description: "A coach-facing recruiting platform for discovering international student-athletes.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <RouteTransition>{children}</RouteTransition>
      </body>
    </html>
  );
}
