import styles from "@/styles/Hero.module.css";
import { Outfit } from "next/font/google";

const heroFont = Outfit({ subsets: ["latin"], weight: ["400","500","600","700"] });

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.center}>
        <h1 className={heroFont.className}>Tražiš instrukcije?</h1>
        <p className={styles.subtitle}>Odaberi!</p>
      </div>
    </section>
  );
}
