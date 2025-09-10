"use client";

import styles from "../../styles/FiltersCard.module.css";
import { useState } from "react";
import { Plus_Jakarta_Sans } from "next/font/google";

const uiFont = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export default function FiltersCard() {
  const [faculty, setFaculty] = useState("Elektrotehnički fakultet");
  const [subject, setSubject] = useState("Fizika");
  const [helpType, setHelpType] = useState("");
  const [price, setPrice] = useState(50);

  const onSearch = () => {
    console.log({ faculty, subject, helpType, price });
    alert("Pretraga (demo) — vidi konzolu");
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
          onClick={() => alert("Ostali filteri (demo)")}
        >
          Ostali filteri
        </button>
      </div>
    </div>
  );
}
