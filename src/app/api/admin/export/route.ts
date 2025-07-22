import { NextRequest, NextResponse } from 'next/server';
import { adminAuth, adminDb } from '@/firebase/adminApp';
import { generateExcel } from '@/utils/excelGenerator';

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

    // Get all registrations
    const snapshot = await adminDb.collection('registrations')
      .orderBy('createdAt', 'desc')
      .get();
    
    const registrations = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    // Generate Excel file
    const excelBuffer = await generateExcel(registrations);
    
    // Generate a filename with current date
    const date = new Date().toISOString().split('T')[0];
    const filename = `Registros_Colonia_AMM_${date}.xlsx`;
    
    // Create response with Excel file
    const response = new NextResponse(excelBuffer);
    
    // Set headers
    response.headers.set('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    response.headers.set('Content-Disposition', `attachment; filename=${filename}`);
    
    return response;
    
  } catch (error: unknown) {
    console.error('Error exporting registrations:', error);
    
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    
    return NextResponse.json({
      success: false,
      message: 'Error al exportar registros',
      error: errorMessage
    }, { status: 500 });
  }
}
