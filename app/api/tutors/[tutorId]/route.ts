import { NextRequest, NextResponse } from 'next/server';
import { DUMMY_TUTORS } from '@/app/data/tutors';

export async function GET(
  request: NextRequest,
  { params }: { params: { tutorId: string } }
) {
  const { tutorId } = params;
  const tutor = DUMMY_TUTORS.find(t => t.id === tutorId);

  if (!tutor) {
    return NextResponse.json({ error: 'Tutor not found' }, { status: 404 });
  }

  return NextResponse.json({ tutor });
}
