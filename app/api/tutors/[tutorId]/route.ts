// app/api/tutors/[tutorId]/route.ts
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
        tags: ["Algebra", "Geometrija", "Analiza"],
        price: 25,
        avatar: "/avatars/marko.jpg",
        bio: "Zdravo! Ja sam Marko, apsolvent matematike. Nudim individualne i grupne instrukcije iz svih oblasti matematike za osnovce, srednjoškolce i studente. Kroz mojih 5 godina iskustva, pomogao sam desetinama učenika da savladaju gradivo i postignu uspjeh.",
        education: ["Magistar Matematike, PMF"],
    },
    // Dodajte detalje za ostale tutore
    {
        id: 'ana-jovanovic-121',
        name: "Ana Jovanović",
        title: "Programiranje · ETF",
        city: "Sarajevo",
        years: 3,
        rating: 4.8,
        reviews: 28,
        tags: ["Python", "Java", "C++"],
        price: 30,
        avatar: "/avatars/ana.jpg",
        bio: "Kao softverska inženjerka, pomažem studentima da razumiju koncepte programiranja i pripreme se za ispite. Moj cilj je da programiranje učinim zabavnim i jednostavnim.",
        education: ["Inženjer elektrotehnike, ETF"],
    },
    {
        id: 'stefan-nikolic-314',
        name: "Stefan Nikolić",
        title: "Fizika · PMF",
        city: "Sarajevo",
        years: 4,
        rating: 4.7,
        reviews: 24,
        tags: ["Mehanika", "Termodinamika", "Optika"],
        price: 22,
        avatar: "/avatars/stefan.jpg",
        bio: "Fizika može biti izazovna, ali ja sam ovdje da vam pokažem da je uz pravi pristup sve moguće. Instrukcije držim za sve nivoe, od srednje škole do fakulteta.",
        education: ["Magistar Fizike, PMF"],
    },
    {
        id: 'bilal-jovic-441',
        name: "Bilal Jović",
        title: "Razvoj softvera · IUS",
        city: "Sarajevo",
        years: 2,
        rating: 5.0,
        reviews: 15,
        tags: ["Web", "Baze", "Algoritmi"],
        price: 35,
        avatar: "/avatars/bilal.jpg",
        bio: "Specijalista za web tehnologije. Ako želite da naučite kako napraviti modernu web stranicu, na pravom ste mjestu. Fokusiram se na praktične primjere i projekte.",
        education: ["Diplomirani inženjer softvera, IUS"],
    },
    {
        id: 'ivana-kovac-512',
        name: "Ivana Kovač",
        title: "Engleski jezik · Filozofski",
        city: "Sarajevo",
        years: 7,
        rating: 4.9,
        reviews: 45,
        tags: ["Gramatika", "Konverzacija", "Testovi"],
        price: 20,
        avatar: "/avatars/ivana.jpg",
        bio: "Kao profesor engleskog jezika, pomažem studentima da poboljšaju svoje jezičke vještine. Pripremam za TOEFL i IELTS ispite.",
        education: ["Magistar engleskog jezika i književnosti"],
    },
    {
        id: 'nikola-simic-625',
        name: "Nikola Simić",
        title: "Statistika · Ekonomski",
        city: "Sarajevo",
        years: 6,
        rating: 4.6,
        reviews: 18,
        tags: ["Ekonometrija", "Vjerojatnoća", "Analiza"],
        price: 28,
        avatar: "/avatars/nikola.jpg",
        bio: "Statistika ne mora biti dosadna. Pomažem u razumijevanju kompleksnih statističkih modela i analizi podataka. Iskustvo u radu sa softverima poput R i SPSS.",
        education: ["Magistar Ekonomije, smjer Statistika"],
    },
    {
        id: 'dzejla-halilovic-733',
        name: "Džejla Halilović",
        title: "Hemija · PMF",
        city: "Sarajevo",
        years: 3,
        rating: 4.8,
        reviews: 21,
        tags: ["Opća hemija", "Organska hemija", "Biohemija"],
        price: 24,
        avatar: "/avatars/dzejla.jpg",
        bio: "Hemija je zabavna i logična, ako znate kako je pristupiti. Sa mnom ćete savladati sve formule i reakcije. Pripremam za prijemne ispite i maturu.",
        education: ["Magistar Hemije, PMF"],
    }
];

export async function GET(request: Request, context: { params: { tutorId: string } }) {
    const tutorId = context.params.tutorId;
    const tutor = DUMMY_TUTORS.find(t => t.id === tutorId);

    if (!tutor) {
        return new NextResponse(null, { status: 404, statusText: "Tutor not found" });
    }

    return NextResponse.json({ tutor });
}