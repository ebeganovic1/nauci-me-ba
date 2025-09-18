// app/components/FiltersModal.tsx

import styles from "@/styles/FiltersModal.module.css";
import { useState } from "react";

type FiltersModalProps = {
  onClose: () => void;
  onApplyFilters: (newFilters: { years: string; city: string }) => void;
};

export default function FiltersModal({ onClose, onApplyFilters }: FiltersModalProps) {
  const [years, setYears] = useState("");
  const [city, setCity] = useState("");

  const handleApply = () => {
    onApplyFilters({ years, city });
    onClose();
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>
        <h2 className={styles.title}>Ostali filteri</h2>
        
        <div className={styles.grid}>
          <div className={styles.field}>
            <label>Godine iskustva</label>
            <select value={years} onChange={(e) => setYears(e.target.value)}>
              <option value="">Sve</option>
              <option value="1">1+ godina</option>
              <option value="3">3+ godine</option>
              <option value="5">5+ godina</option>
            </select>
          </div>
          
          <div className={styles.field}>
            <label>Grad</label>
            <select value={city} onChange={(e) => setCity(e.target.value)}>
              <option value="">Svi gradovi</option>
              <option value="Sarajevo">Sarajevo</option>
              <option value="Tuzla">Tuzla</option>
              <option value="Mostar">Mostar</option>
            </select>
          </div>
        </div>

        <div className={styles.actions}>
          <button className={styles.applyBtn} onClick={handleApply}>
            Primijeni filtere
          </button>
        </div>
      </div>
    </div>
  );
}