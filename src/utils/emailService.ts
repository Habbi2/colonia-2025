import nodemailer from 'nodemailer';

interface EmailAttachment {
  filename?: string;
  content?: Buffer | string;
  path?: string;
  contentType?: string;
}

interface EmailData {
  to: string;
  subject: string;
  html: string;
  attachments?: EmailAttachment[];
}

interface RegistrationData {
  childName: string;
  childLastName: string;
  birthdate: string;
  age: number;
  parentName: string;
  parentLastName: string;
  email: string;
  phone: string;
  weeks: string[];
  mealPlan?: boolean;
  authorizedPersons?: Array<{
    name: string;
    relationship: string;
    phone: string;
  }>;
  emergencyContact: {
    name: string;
    relationship: string;
    phone: string;
  };
  healthInsurance: string;
  allergies?: string;
  medications?: string;
  additionalInfo?: string;
}

export async function sendEmail({ to, subject, html, attachments = [] }: EmailData) {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_SERVER_HOST,
    port: Number(process.env.EMAIL_SERVER_PORT) || 587,
    auth: {
      user: process.env.EMAIL_SERVER_USER,
      pass: process.env.EMAIL_SERVER_PASSWORD,
    },
  });

  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to,
      subject,
      html,
      attachments,
    });

    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error };
  }
}

export function generateConfirmationEmail(data: RegistrationData) {
  // Format date
  let formattedDate = 'N/A';
  if (data.birthdate) {
    formattedDate = new Date(data.birthdate).toLocaleDateString('es-AR');
  }

  // Format authorized persons
  let authorizedPersonsHtml = '';
  if (data.authorizedPersons && Array.isArray(data.authorizedPersons) && data.authorizedPersons.length > 0) {
    authorizedPersonsHtml = '<h3>Personas Autorizadas:</h3><ul>';
    data.authorizedPersons.forEach((person) => {
      authorizedPersonsHtml += `<li>${person.name} (${person.relationship}) - ${person.phone}</li>`;
    });
    authorizedPersonsHtml += '</ul>';
  }

  return `
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Confirmación de Inscripción - Colonia de Verano AMM 2025</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background-color: #f9f9f9;
            }
            .container {
                background-color: white;
                padding: 30px;
                border-radius: 10px;
                box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            }
            .header {
                text-align: center;
                margin-bottom: 30px;
                padding-bottom: 20px;
                border-bottom: 2px solid #4a90e2;
            }
            .header h1 {
                color: #4a90e2;
                margin: 0;
                font-size: 24px;
            }
            .header h2 {
                color: #666;
                margin: 5px 0 0 0;
                font-size: 18px;
                font-weight: normal;
            }
            .success-message {
                background-color: #d4edda;
                color: #155724;
                padding: 15px;
                border-radius: 5px;
                margin-bottom: 20px;
                border-left: 4px solid #28a745;
            }
            .info-section {
                margin-bottom: 25px;
            }
            .info-section h3 {
                color: #4a90e2;
                margin-bottom: 15px;
                font-size: 18px;
                border-bottom: 1px solid #eee;
                padding-bottom: 5px;
            }
            .info-table {
                width: 100%;
                border-collapse: collapse;
                margin-bottom: 15px;
            }
            .info-table td {
                padding: 8px;
                border-bottom: 1px solid #eee;
                vertical-align: top;
            }
            .info-table td:first-child {
                font-weight: bold;
                color: #666;
                width: 40%;
            }
            .weeks-list {
                background-color: #f8f9fa;
                padding: 10px;
                border-radius: 5px;
                margin: 10px 0;
            }
            .weeks-list ul {
                margin: 0;
                padding-left: 20px;
            }
            .footer {
                margin-top: 30px;
                padding-top: 20px;
                border-top: 1px solid #eee;
                text-align: center;
                color: #666;
                font-size: 14px;
            }
            .contact-info {
                background-color: #f8f9fa;
                padding: 15px;
                border-radius: 5px;
                margin-top: 20px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>¡Inscripción Confirmada!</h1>
                <h2>Colonia de Verano AMM 2025</h2>
            </div>

            <div class="success-message">
                <strong>¡Felicitaciones!</strong> La inscripción de ${data.childName} ${data.childLastName} ha sido confirmada exitosamente.
            </div>

            <div class="info-section">
                <h3>Información del Niño/a</h3>
                <table class="info-table">
                    <tr>
                        <td>Nombre Completo:</td>
                        <td>${data.childName} ${data.childLastName}</td>
                    </tr>
                    <tr>
                        <td>Fecha de Nacimiento:</td>
                        <td>${formattedDate}</td>
                    </tr>
                    <tr>
                        <td>Edad:</td>
                        <td>${data.age} años</td>
                    </tr>
                </table>
            </div>

            <div class="info-section">
                <h3>Información del Responsable</h3>
                <table class="info-table">
                    <tr>
                        <td>Nombre:</td>
                        <td>${data.parentName} ${data.parentLastName}</td>
                    </tr>
                    <tr>
                        <td>Email:</td>
                        <td>${data.email}</td>
                    </tr>
                    <tr>
                        <td>Teléfono:</td>
                        <td>${data.phone}</td>
                    </tr>
                </table>
            </div>

            <div class="info-section">
                <h3>Información Médica</h3>
                <table class="info-table">
                    <tr>
                        <td>Obra Social:</td>
                        <td>${data.healthInsurance}</td>
                    </tr>
                    <tr>
                        <td>Contacto de Emergencia:</td>
                        <td>${data.emergencyContact.name} (${data.emergencyContact.relationship}) - ${data.emergencyContact.phone}</td>
                    </tr>
                    ${data.allergies ? `
                    <tr>
                        <td>Alergias:</td>
                        <td>${data.allergies}</td>
                    </tr>
                    ` : ''}
                    ${data.medications ? `
                    <tr>
                        <td>Medicamentos:</td>
                        <td>${data.medications}</td>
                    </tr>
                    ` : ''}
                </table>
            </div>

            <div class="info-section">
                <h3>Semanas Seleccionadas</h3>
                <div class="weeks-list">
                    <ul>
                        ${data.weeks.map(week => `<li>${week}</li>`).join('')}
                    </ul>
                </div>
                ${data.mealPlan ? '<p><strong>✓ Plan de comida incluido</strong></p>' : ''}
            </div>

            ${authorizedPersonsHtml}

            ${data.additionalInfo ? `
            <div class="info-section">
                <h3>Información Adicional</h3>
                <p>${data.additionalInfo}</p>
            </div>
            ` : ''}

            <div class="contact-info">
                <h3>Información Importante</h3>
                <p>Conserve este email como comprobante de inscripción. Recibirá más información sobre horarios, actividades y preparación antes del inicio de la colonia.</p>
                <p>Si tiene alguna consulta, no dude en contactarnos.</p>
            </div>

            <div class="footer">
                <p>Este email fue generado automáticamente. Por favor, no responda a este mensaje.</p>
                <p><strong>Colonia de Verano AMM 2025</strong></p>
            </div>
        </div>
    </body>
    </html>
  `;
}
