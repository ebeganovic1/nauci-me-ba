
"use client";

import styles from "../../styles/FiltersCard.module.css";
import { useState } from "react";
import { Plus_Jakarta_Sans } from "next/font/google";
import { useRouter } from 'next/navigation'; // Importiramo useRouter

const uiFont = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export default function FiltersCard() {
  const [faculty, setFaculty] = useState("Elektrotehnički fakultet");
  const [subject, setSubject] = useState("Fizika");
  const [helpType, setHelpType] = useState("");
  const [price, setPrice] = useState(50);
  const [showMoreFilters, setShowMoreFilters] = useState(false);
  const [studyYear, setStudyYear] = useState("");
  const [instructorRating, setInstructorRating] = useState("");

  const router = useRouter(); // Inicijaliziramo router

  const onSearch = () => {
    // Kreiranje URL parametara iz trenutnih stanja filtera
    const queryParams = new URLSearchParams();
    if (faculty) queryParams.append('faculty', faculty);
    if (subject) queryParams.append('subject', subject);
    if (helpType) queryParams.append('helpType', helpType); // Dodano
    queryParams.append('price', price.toString()); // Cijena je uvijek broj
    if (studyYear) queryParams.append('studyYear', studyYear); // Dodano
    if (instructorRating) queryParams.append('instructorRating', instructorRating); // Dodano


    // Navigacija na /search putanju sa parametrima
    router.push(`/search?${queryParams.toString()}`);
  };

  return (
    <div className={styles.card}>
      <div className={styles.grid}>
        <div className={styles.field}>
          <label>Fakultet</label>
          <select value={faculty} onChange={(e) => setFaculty(e.target.value)}>
            <option>Elektrotehnički fakultet</option>
            <option>Prirodno-matematički fakultet</option>
            <option>Ekonomski fakultet</option>
            <option>Filozofski fakultet</option>
          </select>
        </div>

        <div className={styles.field}>
          <label>Kurs/Predmet</label>
          <select value={subject} onChange={(e) => setSubject(e.target.value)}>
            <option>Fizika</option>
            <option>Matematika</option>
            <option>Programiranje</option>
            <option>Engleski</option>
          </select>
        </div>

        <div className={styles.field}>
          <label>Vrsta pomoći koju trebam</label>
          <select value={helpType} onChange={(e) => setHelpType(e.target.value)}>
            <option value="">Odaberi</option>
            <option>Priprema za ispit</option>
            <option>Redovna nastava</option>
            <option>Online konsultacije</option>
          </select>
        </div>

        <div className={styles.field}>
          <label>Cjenovni rang</label>
          <div className={styles.rangeWrap}>
            <span>10 KM</span>
            <input
              type="range"
              min={10}
              max={200}
              step={1}
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
            />
            <span>200 KM</span>
          </div>
          <div className={styles.priceValue}>{price} KM</div>
        </div>

        {showMoreFilters && (
          <>
            <div className={styles.field}>
              <label>Godina studija</label>
              <select value={studyYear} onChange={(e) => setStudyYear(e.target.value)}>
                <option value="">Odaberi</option>
                <option>1. godina</option>
                <option>2. godina</option>
                <option>3. godina</option>
                <option>4. godina</option>
                <option>Postdiplomski</option>
              </select>
            </div>

            <div className={styles.field}>
              <label>Ocjena instruktora</label>
              <select value={instructorRating} onChange={(e) => setInstructorRating(e.target.value)}>
                <option value="">Odaberi</option>
                <option>5 zvjezdica</option>
                <option>4+ zvjezdice</option>
                <option>3+ zvjezdice</option>
              </select>
            </div>
          </>
        )}
      </div>

      <div className={styles.actions}>
        <button
          className={`${styles.primary} ${uiFont.className}`}
          onClick={onSearch}
        >
          Pretraži instruktore
        </button>
        <button
          className={`${styles.secondary} ${uiFont.className}`}
          onClick={() => setShowMoreFilters(!showMoreFilters)}
        >
          {showMoreFilters ? "Sakrij filtere" : "Ostali filteri"}
        </button>
      </div>
    </div>
  );
}