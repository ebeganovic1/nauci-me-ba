import { NextResponse } from 'next/server';

const DUMMY_TUTORS = [
  {
    id: 'marko-petrovic-223',
    name: "Marko Petrović",
    title: "Matematika · PMF",
    city: "Sarajevo",
    years: 5,
    rating: 4.9,
    reviews: 32,
    tags: ["Algebra", "Geometrija", "Analiza", "Fizika", "Priprema za ispit", "Redovna nastava", "Pomoć pri domaćim zadaćama"],
    price: 25,
    avatar: "/avatars/marko.jpg",
  },
  {
    id: 'ana-jovanovic-121',
    name: "Ana Jovanović",
    title: "Programiranje · ETF",
    city: "Sarajevo",
    years: 3,
    rating: 4.8,
    reviews: 28,
    tags: ["Python", "Java", "C++", "Programiranje", "Online konsultacije"],
    price: 30,
    avatar: "/avatars/ana.jpg",
  },
  {
    id: 'stefan-nikolic-314',
    name: "Stefan Nikolić",
    title: "Fizika · PMF",
    city: "Sarajevo",
    years: 4,
    rating: 4.7,
    reviews: 24,
    tags: ["Mehanika", "Termodinamika", "Optika", "Fizika", "Priprema za ispit"],
    price: 22,
    avatar: "/avatars/stefan.jpg",
  },
  {
    id: 'bilal-jovic-441',
    name: "Bilal Jović",
    title: "Razvoj softvera · ETF",
    city: "Mostar",
    years: 2,
    rating: 5.0,
    reviews: 15,
    tags: ["Web", "Baze", "Algoritmi", "Programiranje", "Pisanje seminarskih radova"],
    price: 35,
    avatar: "/avatars/bilal.jpg",
  },
  {
    id: 'ivana-kovac-512',
    name: "Ivana Kovač",
    title: "Engleski jezik · Filozofski",
    city: "Tuzla",
    years: 7,
    rating: 4.9,
    reviews: 45,
    tags: ["Gramatika", "Konverzacija", "Testovi", "Engleski", "Redovna nastava"],
    price: 20,
    avatar: "/avatars/ivana.jpg",
  },
  {
    id: 'nikola-simic-625',
    name: "Nikola Simić",
    title: "Statistika · Ekonomski",
    city: "Sarajevo",
    years: 6,
    rating: 4.6,
    reviews: 18,
    tags: ["Ekonometrija", "Vjerojatnoća", "Analiza", "Statistika", "Pomoć pri domaćim zadaćama"],
    price: 28,
    avatar: "/avatars/nikola.jpg",
  },
  {
    id: 'dzejla-halilovic-733',
    name: "Džejla Halilović",
    title: "Hemija · PMF",
    city: "Sarajevo",
    years: 3,
    rating: 4.8,
    reviews: 21,
    tags: ["Opća hemija", "Organska hemija", "Biohemija", "Hemija", "Redovna nastava"],
    price: 24,
    avatar: "/avatars/dzejla.jpg",
  },
  {
    id: 'amar-mehic-815',
    name: "Amar Mehić",
    title: "Informatika · ETF",
    city: "Mostar",
    years: 4,
    rating: 4.7,
    reviews: 26,
    tags: ["Algoritmi", "Strukture podataka", "OOP", "Programiranje", "Priprema za ispit"],
    price: 32,
    avatar: "/avatars/amar.jpg",
  },
  {
    id: 'jelena-popovic-902',
    name: "Jelena Popović",
    title: "Biologija · PMF",
    city: "Tuzla",
    years: 5,
    rating: 4.9,
    reviews: 31,
    tags: ["Botanika", "Zoologija", "Genetika", "Biologija", "Redovna nastava"],
    price: 26,
    avatar: "/avatars/jelena.jpg",
  },
  {
    id: 'haris-dedic-107',
    name: "Haris Dedić",
    title: "Elektrotehnika · ETF",
    city: "Sarajevo",
    years: 3,
    rating: 4.5,
    reviews: 17,
    tags: ["Struja", "Magnetizam", "Elektronika", "Elektrotehnika", "Online konsultacije"],
    price: 27,
    avatar: "/avatars/haris.jpg",
  },
  {
    id: 'marija-todorovic-118',
    name: "Marija Todorović",
    title: "Njemački jezik · Filozofski",
    city: "Zenica",
    years: 6,
    rating: 4.8,
    reviews: 29,
    tags: ["Gramatika", "Konverzacija", "Poslovni njemački", "Njemački", "Redovna nastava"],
    price: 23,
    avatar: "/avatars/marija.jpg",
  },
  {
    id: 'kenan-hasanovic-129',
    name: "Kenan Hasanović",
    title: "Računovodstvo · Ekonomski",
    city: "Sarajevo",
    years: 8,
    rating: 4.9,
    reviews: 38,
    tags: ["Finansijsko računovodstvo", "Porezi", "Menadžersko računovodstvo", "Ekonomija", "Pomoć pri domaćim zadaćama"],
    price: 33,
    avatar: "/avatars/kenan.jpg",
  },
  {
    id: 'tijana-lakic-134',
    name: "Tijana Lakić",
    title: "Psihologija · Filozofski",
    city: "Sarajevo",
    years: 4,
    rating: 4.7,
    reviews: 22,
    tags: ["Opća psihologija", "Razvojna psihologija", "Socijalna psihologija", "Filozofija", "Pisanje seminarskih radova"],
    price: 25,
    avatar: "/avatars/tijana.jpg",
  },
  {
    id: 'dario-milakovic-145',
    name: "Dario Milaković",
    title: "Mašinstvo · Mašinski fakultet",
    city: "Banja Luka",
    years: 5,
    rating: 4.6,
    reviews: 19,
    tags: ["Mehanika", "Termodinamika", "Konstrukcije", "Mašinstvo", "Redovna nastava"],
    price: 29,
    avatar: "/avatars/dario.jpg",
  },
  {
    id: 'ajla-hrustanovic-156',
    name: "Ajla Hrustanović",
    title: "Arhitektura · Arhitektonski fakultet",
    city: "Sarajevo",
    years: 3,
    rating: 4.8,
    reviews: 16,
    tags: ["Crtež", "Dizajn", "Historija arhitekture", "Arhitektura", "Online konsultacije"],
    price: 31,
    avatar: "/avatars/ajla.jpg",
  }
];

function toKey(s: string) {
  return (s || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '');
}

function mapFacultyLabelToKeyword(label: string) {
  // UI šalje puni naziv, u title/education koristiš kratice/ključne riječi
  const k = toKey(label);
  if (k.includes('elektrotehnick')) return 'etf';
  if (k.includes('prirodno') || k.includes('matematick')) return 'pmf';
  if (k.includes('ekonom')) return 'ekonomski';
  if (k.includes('filozof')) return 'filozofski';
  if (k.includes('masinsk')) return 'mašinski';
  if (k.includes('arhitekton')) return 'arhitektonski';
  if (k.includes('pravni')) return 'pravni';
  if (k.includes('medicinsk')) return 'medicinski';
  return label;
}

function parseMinYears(label: string) {
  // "3+ godine" -> 3
  const m = (label || '').match(/(\d+)\s*\+/);
  return m ? Number(m[1]) : 0;
}

function parseMinRating(label: string) {
  // "5 zvjezdica" / "4+ zvjezdice" -> 5 / 4
  const m = (label || '').match(/(\d+)/);
  return m ? Number(m[1]) : 0;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const faculty = searchParams.get('faculty');        // "Elektrotehnički fakultet"
  const subject = searchParams.get('subject');        // "Fizika", "Programiranje"...
  const helpType = searchParams.get('helpType');      // "Priprema za ispit"...
  const price = searchParams.get('price');            // max cijena (slider)
  const studyYear = searchParams.get('studyYear');    // (trenutno ne koristimo)
  const instructorRating = searchParams.get('instructorRating'); // "4+ zvjezdice"
  const experience = searchParams.get('experience');  // "3+ godine"
  const city = searchParams.get('city');              // "Sarajevo"...

  const qFacultyKey = faculty ? toKey(mapFacultyLabelToKeyword(faculty)) : '';
  const qSubject = toKey(subject || '');
  const qHelp = toKey(helpType || '');
  const qCity = toKey(city || '');

  const maxPrice = price ? Number(price) : Number.MAX_SAFE_INTEGER;
  const minYears = parseMinYears(experience || '');
  const minRating = parseMinRating(instructorRating || '');

  let filteredTutors = DUMMY_TUTORS.filter((tutor) => {
    const titleN = toKey(tutor.title);
    const tagsN = (tutor.tags || []).map(toKey);
    const cityN = toKey(tutor.city);

    const facultyMatch = qFacultyKey ? titleN.includes(qFacultyKey) : true;
    const subjectMatch = qSubject
      ? titleN.includes(qSubject) || tagsN.some(t => t.includes(qSubject))
      : true;
    const helpMatch = qHelp ? tagsN.some(t => t.includes(qHelp)) : true;
    const cityMatch = qCity ? cityN.includes(qCity) : true;

    const priceMatch = (tutor.price ?? 0) <= maxPrice;
    const yearsMatch = (tutor.years ?? 0) >= minYears;
    const ratingMatch = (tutor.rating ?? 0) >= minRating;

    return facultyMatch && subjectMatch && helpMatch && cityMatch && priceMatch && yearsMatch && ratingMatch;
  });

  return NextResponse.json({ tutors: filteredTutors });
}
