"use client"; // Obavezno za interaktivne komponente

import styles from "@/styles/Home.module.css";
import Hero from "./components/Hero";
import FiltersCard from "./components/FiltersCard";
import TutorCard from "./components/TutorCard";
import Link from 'next/link';
import { useState, useEffect } from 'react';

// Tip tutora za sigurnost (TypeScript)
type Tutor = {
  id: string;
  name: string;
  title: string;
  city: string;
  years: number;
  rating: number;
  reviews: number;
  tags: string[];
  price: number;
  avatar: string;
};

export default function HomePage() {
  const [tutors, setTutors] = useState<Tutor[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Dohvaćanje podataka s mock API-ja
  useEffect(() => {
    async function fetchTutors() {
      try {
        const response = await fetch('/api/tutors'); // Pretpostavljeni API endpoint
        if (!response.ok) {
          throw new Error('Failed to fetch tutors');
        }
        const data = await response.json();
        
        // Ograničite prikaz na prva tri tutora
        setTutors(data.tutors.slice(0, 3)); 
      } catch (error) {
        console.error("Greška pri dohvaćanju tutora:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchTutors();
  }, []);

  return (
    <main className={styles.main}>
      <Hero />
      <section className={styles.filtersWrap}>
        <FiltersCard />
      </section>

      <section className={styles.bestSection}>
        <h2 className={styles.title}>NAJBOLJE OCIJENJENI TUTORI</h2>
        <p className={styles.subtitle}>
          Pronađite najbolje instruktore za vaš predmet i počnite učiti već danas
        </p>

        <div className={styles.cardsGrid}>
          {isLoading ? (
            <p>Učitavanje tutora...</p>
          ) : (
            tutors.map((tutor) => (
              <TutorCard
                key={tutor.id}
                id={tutor.id}
                name={tutor.name}
                title={tutor.title}
                city={tutor.city}
                years={tutor.years}
                rating={tutor.rating}
                reviews={tutor.reviews}
                tags={tutor.tags}
                price={tutor.price}
                avatar={tutor.avatar}
              />
            ))
          )}
        </div>

        <div className={styles.center}>
          <Link href="/search" passHref>
            <button className={styles.outlineBtn}>Pogledaj sve tutore</button>
          </Link>
        </div>
      </section>
    </main>
  );
}
