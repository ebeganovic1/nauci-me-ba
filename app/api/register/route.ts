// app/api/register/route.ts
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { email, password, role } = await request.json(); // Dodajte 'role'

    if (!email || !password || !role) {
      return NextResponse.json({ message: 'Email, password, and role are required' }, { status: 400 });
    }

    // U stvarnoj aplikaciji, ovdje biste pohranili korisnika i njegovu ulogu u bazu podataka.
    console.log(`Nova registracija: ${email}, Uloga: ${role}`);

    return NextResponse.json({ message: 'Uspješna registracija!' }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Greška na serveru' }, { status: 500 });
  }
}