// app/login/page.tsx - primjer korištenja
"use client";

import { useState } from 'react';
import styles from '@/styles/AuthForm.module.css';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Plus_Jakarta_Sans } from "next/font/google";
import { useAuth } from '../context/AuthContext';

const brandFont = Plus_Jakarta_Sans({ subsets: ["latin"], weight: ["600"] });

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setMessage('Prijava u toku...');

  try {
    const success = await login(email, password);
    
    if (success) {
      setMessage('Prijava uspješna!');
      setTimeout(() => {
        router.push('/');
      }, 1500);
    } else {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        setMessage(errorData.message || 'Pogrešni podaci za prijavu');
      } else {
        setMessage('Pogrešni podaci za prijavu');
      }
    }
  } catch (error) {
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