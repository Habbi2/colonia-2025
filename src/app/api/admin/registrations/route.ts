import { NextRequest, NextResponse } from 'next/server';
import { adminAuth, adminDb } from '@/firebase/adminApp';

// API endpoint to get all registrations
export async function GET(req: NextRequest) {
  try {
    // Check if user is authenticated
    const authHeader = req.headers.get('authorization');
    if (!authHeader) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.split('Bearer ')[1];
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
      await adminAuth.verifyIdToken(token);
    } catch {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    // Get all registrations sorted by creation date (newest first)
    const snapshot = await adminDb.collection('registrations')
      .orderBy('createdAt', 'desc')
      .get();
    
    const registrations = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    return NextResponse.json({
      success: true,
      registrations
    });
    
  } catch (error: unknown) {
    console.error('Error fetching registrations:', error);
    
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    
    return NextResponse.json({
      success: false,
      message: 'Error al obtener registros',
      error: errorMessage
    }, { status: 500 });
  }
}
