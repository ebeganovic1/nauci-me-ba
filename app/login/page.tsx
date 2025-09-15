"use client";

import { useState } from 'react';
import styles from '@/styles/AuthForm.module.css';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Plus_Jakarta_Sans } from "next/font/google";

const brandFont = Plus_Jakarta_Sans({ subsets: ["latin"], weight: ["600"] });

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('Prijava u toku...');

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // Ne šaljemo ulogu pri prijavi, backend je provjerava
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      setMessage(data.message);

      if (response.ok) {
        // Ovdje možete dobiti ulogu korisnika i preusmjeriti ga na različite stranice
        setTimeout(() => {
          router.push('/');
        }, 1500);
      }
    } catch (error) {
      console.error(error);
      setMessage('Greška pri prijavi. Pokušajte ponovo.');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <Image src="/logo.svg" alt="NauciMe.ba" width={48} height={48} className={styles.logo} />
        <h1 className={`${styles.title} ${brandFont.className}`}>Prijava</h1>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.field}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className={styles.field}>
            <label htmlFor="password">Lozinka</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className={styles.submitBtn}>Prijavi se</button>
        </form>
        {message && <p className={styles.message}>{message}</p>}
        <p className={styles.linkText}>
          Nemaš račun? <Link href="/register">Registruj se</Link>
        </p>
      </div>
    </div>
  );
}