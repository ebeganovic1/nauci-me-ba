"use client";

import Image from "next/image";
import styles from "@/styles/Header.module.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Plus_Jakarta_Sans } from "next/font/google";

const brandFont = Plus_Jakarta_Sans({ subsets: ["latin"], weight: ["600"] });

export default function Header() {
  const [q, setQ] = useState("");
  const router = useRouter();

  const onSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/instrukcije?search=${encodeURIComponent(q)}`);
  };

  return (
    <header className={styles.header}>
      {/* GRID: auto | 1fr | auto */}
      <div className={styles.inner}>
        {/* lijevo */}
        <div className={styles.left}>
          <Image src="/logo.svg" alt="NauciMe.ba" width={32} height={32} />
          <span className={`${styles.brandText} ${brandFont.className}`}>NauciMe.ba</span>
        </div>

        {/* centar */}
        <div className={styles.center}>
          <form className={styles.search} onSubmit={onSearch}>
            <input
              type="text"
              placeholder="Search..."
              value={q}
              onChange={(e) => setQ(e.target.value)}
              aria-label="Pretraži"
            />
            <button type="submit">Traži</button>
          </form>
        </div>

        {/* desno */}
        <div className={styles.right}>
          <button className={styles.linkBtn}>Prijavi se</button>
          <button className={styles.primaryBtn}>Registracija</button>
        </div>
      </div>
    </header>
  );
}
