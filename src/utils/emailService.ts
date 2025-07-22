import nodemailer from 'nodemailer';

interface EmailData {
  to: string;
  subject: string;
  html: string;
  attachments?: any[];
}

export async function sendEmail({ to, subject, html, attachments = [] }: EmailData) {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_SERVER_HOST,
    port: Number(process.env.EMAIL_SERVER_PORT) || 587,
    auth: {
      user: process.env.EMAIL_SERVER_USER,
      pass: process.env.EMAIL_SERVER_PASSWORD,
    },
    secure: Boolean(process.env.EMAIL_SERVER_SECURE) || false,
  });

  try {
    const info = await transporter.sendMail({
      from: `"Colonia de Verano AMM" <${process.env.EMAIL_FROM}>`,
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

export function generateConfirmationEmail(data: any) {
  // Format date - handle Firestore timestamp or regular Date
  let formattedDate = 'N/A';
  if (data.birthdate) {
    const date = data.birthdate.toDate ? data.birthdate.toDate() : new Date(data.birthdate);
    formattedDate = date.toLocaleDateString('es-AR');
  }
  
  // Format weeks
  const weeksText = Array.isArray(data.weeks) ? data.weeks.join(', ') : data.weeks;
  
  // Format authorized persons
  let authorizedPersonsHtml = '<p>No hay personas autorizadas registradas.</p>';
  if (data.authorizedPersons && data.authorizedPersons.length > 0) {
    authorizedPersonsHtml = '<ul>';
    data.authorizedPersons.forEach((person: any) => {
      authorizedPersonsHtml += `<li>${person.name} (${person.relationship}, ${person.phone}, DNI: ${person.dni})</li>`;
    });
    authorizedPersonsHtml += '</ul>';
  }

  return `
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          h1 { color: #0077cc; }
          h2 { color: #444; margin-top: 20px; }
          .section { margin-bottom: 30px; }
          table { width: 100%; border-collapse: collapse; }
          table td { padding: 8px; border-bottom: 1px solid #eee; }
          .label { font-weight: bold; width: 40%; }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Confirmación de Inscripción - Colonia de Verano AMM 2025</h1>
          <p>Gracias por inscribir a su hijo/a en la Colonia de Verano AMM 2025. A continuación encontrará los detalles de su registro:</p>
          
          <div class="section">
            <h2>Datos del Niño/a</h2>
            <table>
              <tr>
                <td class="label">Nombre completo:</td>
                <td>${data.childName} ${data.childLastName}</td>
              </tr>
              <tr>
                <td class="label">Fecha de nacimiento:</td>
                <td>${formattedDate}</td>
              </tr>
              <tr>
                <td class="label">Edad:</td>
                <td>${data.age} años</td>
              </tr>
              <tr>
                <td class="label">DNI:</td>
                <td>${data.dni}</td>
              </tr>
              <tr>
                <td class="label">Grado escolar:</td>
                <td>${data.schoolGrade}</td>
              </tr>
            </table>
          </div>
          
          <div class="section">
            <h2>Datos del Padre/Madre/Tutor</h2>
            <table>
              <tr>
                <td class="label">Nombre completo:</td>
                <td>${data.parentName} ${data.parentLastName}</td>
              </tr>
              <tr>
                <td class="label">Relación:</td>
                <td>${data.relationship}</td>
              </tr>
              <tr>
                <td class="label">Teléfono:</td>
                <td>${data.phone}</td>
              </tr>
              <tr>
                <td class="label">Email:</td>
                <td>${data.email}</td>
              </tr>
              <tr>
                <td class="label">Dirección:</td>
                <td>${data.address}</td>
              </tr>
            </table>
          </div>
          
          <div class="section">
            <h2>Información Médica</h2>
            <table>
              <tr>
                <td class="label">Obra Social:</td>
                <td>${data.healthInsurance}</td>
              </tr>
              <tr>
                <td class="label">Número de Afiliado:</td>
                <td>${data.affiliateNumber}</td>
              </tr>
              <tr>
                <td class="label">Alergias:</td>
                <td>${data.allergies || 'No informado'}</td>
              </tr>
              <tr>
                <td class="label">Medicamentos:</td>
                <td>${data.medications || 'No informado'}</td>
              </tr>
              <tr>
                <td class="label">Dieta Especial:</td>
                <td>${data.specialDiet || 'No informado'}</td>
              </tr>
              <tr>
                <td class="label">Contacto de Emergencia:</td>
                <td>${data.emergencyContact.name} (${data.emergencyContact.relationship}) - ${data.emergencyContact.phone}</td>
              </tr>
            </table>
          </div>
          
          <div class="section">
            <h2>Opciones de Inscripción</h2>
            <table>
              <tr>
                <td class="label">Semanas:</td>
                <td>${weeksText}</td>
              </tr>
              <tr>
                <td class="label">Plan de Comida:</td>
                <td>${data.mealPlan ? 'Sí' : 'No'}</td>
              </tr>
              <tr>
                <td class="label">Restricciones Alimentarias:</td>
                <td>${data.dietaryRestrictions || 'No informado'}</td>
              </tr>
            </table>
          </div>
          
          <div class="section">
            <h2>Personas Autorizadas a Retirar</h2>
            ${authorizedPersonsHtml}
          </div>
          
          <div class="section">
            <h2>Información Adicional</h2>
            <p>${data.additionalInfo || 'No se proporcionó información adicional.'}</p>
          </div>
          
          <hr>
          <p>Pronto nos comunicaremos para proporcionarle información adicional sobre la colonia.</p>
          <p>Para cualquier consulta o modificación, por favor contáctenos por email o teléfono.</p>
          <p>¡Gracias por confiar en la Colonia de Verano AMM 2025!</p>
        </div>
      </body>
    </html>
  `;
}
