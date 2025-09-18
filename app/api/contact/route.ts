// app/api/contact/route.ts
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { tutorId, message } = await request.json();
    
    // Simulacija slanja poruke
    // U pravoj aplikaciji, ovo bi slalo email ili notifikaciju
    return NextResponse.json({ 
      success: true, 
      message: 'Poruka uspješno poslana' 
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Greška pri slanju poruke' },
      { status: 500 }
    );
  }
}