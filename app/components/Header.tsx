// app/components/Header.tsx
"use client";

import Image from "next/image";
import styles from "@/styles/Header.module.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Plus_Jakarta_Sans } from "next/font/google";
import Link from 'next/link';
import { useAuth } from "../context/AuthContext";

const brandFont = Plus_Jakarta_Sans({ subsets: ["latin"], weight: ["600"] });

export default function Header() {
  const [q, setQ] = useState("");
  const router = useRouter();
  const { user, logout } = useAuth();

  const onSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (q.trim()) {
      router.push(`/search?name=${encodeURIComponent(q.trim())}`);
    }
  };

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const goToHome = () => {
    router.push("/");
  };

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        {/* Logo */}
        <div className={styles.left} onClick={goToHome} style={{ cursor: 'pointer' }}>
          <Image src="/logo.svg" alt="NauciMe.ba" width={32} height={32} />
          <span className={`${styles.brandText} ${brandFont.className}`}>NauciMe.ba</span>
        </div>

        {/* Search */}
        <div className={styles.center}>
          <form className={styles.search} onSubmit={onSearch}>
            <input
              type="text"
              placeholder="Pretraži instruktore po imenu, prezimenu ili predmetu..."
              value={q}
              onChange={(e) => setQ(e.target.value)}
              aria-label="Pretraži instruktore"
            />
            <button type="submit" className={styles.searchBtn}>
              <span className={styles.searchText}>Traži</span>
            </button>
          </form>
        </div>

        {/* User actions - različito za različite uloge */}
        <div className={styles.right}>
          {user ? (
            <div className={styles.userMenu}>
              <span className={styles.welcome}>Dobrodošao/la, {user.fullName}</span>
              <div className={styles.dropdown}>
                <button className={styles.userBtn}>
                  <div className={styles.userAvatar}>
                    {user.fullName.split(' ').map(n => n[0]).join('')}
                  </div>
                </button>
                <div className={styles.dropdownContent}>
                  <Link href="/profile">Moj profil</Link>
                  <button onClick={handleLogout} className={styles.logoutBtn}>
                    Odjava
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <>
              <Link href="/login" passHref>
                <button className={styles.linkBtn}>Prijavi se</button>
              </Link>
              <Link href="/register" passHref>
                <button className={styles.primaryBtn}>Registracija</button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}