import styles from "../styles/Home.module.css";
import Hero from "./components/Hero";
import FiltersCard from "./components/FiltersCard";
import TutorCard from "./components/TutorCard";

export default function HomePage() {
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
          <TutorCard
            name="Marko Petrović"
            title="Matematika · PMF"
            city="Sarajevo"
            years={5}
            rating={4.9}
            reviews={32}
            tags={["Algebra", "Geometrija", "Analiza"]}
            price={25}
            avatar="/avatars/marko.jpg"
          />
          <TutorCard
            name="Ana Jovanović"
            title="Programiranje · ETF"
            city="Sarajevo"
            years={3}
            rating={4.8}
            reviews={28}
            tags={["Python", "Java", "C++"]}
            price={30}
            avatar="/avatars/ana.jpg"
          />
          <TutorCard
            name="Stefan Nikolić"
            title="Fizika · PMF"
            city="Sarajevo"
            years={4}
            rating={4.7}
            reviews={24}
            tags={["Mehanika", "Termodinamika", "Optika"]}
            price={22}
            avatar="/avatars/stefan.jpg"
          />
        </div>

        <div className={styles.center}>
          <button className={styles.outlineBtn}>Pogledaj sve tutore</button>
        </div>
      </section>
    </main>
  );
}
