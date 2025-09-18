// app/register/page.tsx - Ažurirana verzija
"use client";

import { useState } from 'react';
import styles from '@/styles/AuthForm.module.css';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Plus_Jakarta_Sans } from "next/font/google";

const brandFont = Plus_Jakarta_Sans({ subsets: ["latin"], weight: ["600"] });

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    role: 'student', // student ili tutor
    phone: '',
  });
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      setMessage('Lozinke se ne podudaraju!');
      return;
    }
    
    setMessage('Registracija u toku...');

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
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
            <label htmlFor="fullName">Ime i prezime</label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              value={formData.fullName}
              onChange={handleInputChange}
              required
              placeholder="Unesite vaše ime i prezime"
            />
          </div>
          
          <div className={styles.field}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              placeholder="Unesite vaš email"
            />
          </div>
          
          <div className={styles.field}>
            <label htmlFor="phone">Broj telefona (opciono)</label>
            <input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="Unesite vaš broj telefona"
            />
          </div>
          
          <div className={styles.field}>
            <label htmlFor="password">Lozinka</label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleInputChange}
              required
              placeholder="Kreirajte lozinku"
            />
          </div>
          
          <div className={styles.field}>
            <label htmlFor="confirmPassword">Potvrdite lozinku</label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              required
              placeholder="Ponovite lozinku"
            />
          </div>
          
          <div className={styles.field}>
            <label>Registrujem se kao:</label>
            <div className={styles.radioGroup}>
              <label>
                <input
                  type="radio"
                  name="role"
                  value="student"
                  checked={formData.role === 'student'}
                  onChange={handleInputChange}
                />
                Učenik
              </label>
              <label>
                <input
                  type="radio"
                  name="role"
                  value="tutor"
                  checked={formData.role === 'tutor'}
                  onChange={handleInputChange}
                />
                Tutor
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