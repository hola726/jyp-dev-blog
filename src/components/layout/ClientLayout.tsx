"use client";

import { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import SearchDialog from "@/components/search/SearchDialog";
import ScrollToTop from "./ScrollToTop";
import ReadingProgress from "./ReadingProgress";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <>
      <Header onSearchOpen={() => setSearchOpen(true)} />
      <main className="mx-auto min-h-[calc(100vh-8rem)] max-w-5xl px-6 py-8">
        {children}
      </main>
      <Footer />
      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
      <ScrollToTop />
      <ReadingProgress />
    </>
  );
}
