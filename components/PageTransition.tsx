"use client";

export default function PageTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="page-enter page-enter-active">{children}</div>;
}
