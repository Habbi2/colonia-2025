import { NextRequest, NextResponse } from 'next/server';
import { adminDb } from '@/firebase/adminApp';
import { sendEmail, generateConfirmationEmail } from '@/utils/emailService';

export async function POST(req: NextRequest) {
  try {
    // Parse the request body
    const formData = await req.json();
    
    // Add timestamp
    const registrationData = {
      ...formData,
      createdAt: new Date(),
    };
    
    // Create a new registration in Firestore
    const docRef = await adminDb.collection('registrations').add(registrationData);
    
    // Send confirmation email to user (temporarily disabled)
    try {
      const emailHtml = generateConfirmationEmail(formData);
      
      await sendEmail({
        to: formData.email,
        subject: 'Confirmación de inscripción - Colonia de Verano AMM 2025',
        html: emailHtml,
      });
      
      // Send notification email to admin
      await sendEmail({
        to: process.env.ADMIN_EMAIL || '',
        subject: `Nueva inscripción: ${formData.childName} ${formData.childLastName}`,
        html: `
          <h2>Nueva inscripción para la Colonia de Verano 2025</h2>
          <p><strong>Niño/a:</strong> ${formData.childName} ${formData.childLastName}</p>
          <p><strong>Edad:</strong> ${formData.age}</p>
          <p><strong>Padre/Madre/Tutor:</strong> ${formData.parentName} ${formData.parentLastName}</p>
          <p><strong>Email:</strong> ${formData.email}</p>
          <p><strong>Teléfono:</strong> ${formData.phone}</p>
          <p>Consulte el panel de administración para ver todos los detalles.</p>
        `
      });
    } catch (emailError) {
      console.log('Email sending failed (continuing without email):', emailError);
      // Continue without failing the registration
    }

    return NextResponse.json({
      success: true,
      message: 'Registro creado exitosamente',
      id: docRef.id
    }, { status: 201 });
    
  } catch (error: any) {
    console.error('Error en la API de registro:', error);
    
    return NextResponse.json({
      success: false,
      message: 'Error al crear el registro',
      error: error.message
    }, { status: 500 });
  }
}
