"use client";

import { useState } from 'react';
import styles from '@/styles/AuthForm.module.css';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Plus_Jakarta_Sans } from "next/font/google";

const brandFont = Plus_Jakarta_Sans({ subsets: ["latin"], weight: ["600"] });

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student'); // Dodajte stanje za ulogu
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('Registracija u toku...');

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // Pošaljite ulogu na backend
        body: JSON.stringify({ email, password, role }),
      });

      const data = await response.json();
      setMessage(data.message);

      if (response.ok) {
        setTimeout(() => {
          router.push('/login');
        }, 1500);
      }
    } catch (error) {
      console.error(error);
      setMessage('Greška pri registraciji. Pokušajte ponovo.');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <Image src="/logo.svg" alt="NauciMe.ba" width={48} height={48} className={styles.logo} />
        <h1 className={`${styles.title} ${brandFont.className}`}>Registracija</h1>
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
          {/* Dodajte izbor uloge */}
          <div className={styles.field}>
            <label>Želim se registrovati kao:</label>
            <div className={styles.radioGroup}>
              <label>
                <input
                  type="radio"
                  name="role"
                  value="tutor"
                  checked={role === 'tutor'}
                  onChange={() => setRole('tutor')}
                />
                Tutor
              </label>
              <label>
                <input
                  type="radio"
                  name="role"
                  value="student"
                  checked={role === 'student'}
                  onChange={() => setRole('student')}
                />
                Učenik
              </label>
            </div>
          </div>
          <button type="submit" className={styles.submitBtn}>Registruj se</button>
        </form>
        {message && <p className={styles.message}>{message}</p>}
        <p className={styles.linkText}>
          Već imaš račun? <Link href="/login">Prijavi se</Link>
        </p>
      </div>
    </div>
  );
}