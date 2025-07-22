import ExcelJS from 'exceljs';

export async function generateExcel(registrations: Array<{ id: string; [key: string]: unknown }>) {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Registros Colonia 2025');

  // Define columns
  worksheet.columns = [
    { header: 'Fecha de Registro', key: 'createdAt', width: 20 },
    { header: 'Nombre del Niño/a', key: 'childName', width: 20 },
    { header: 'Apellido del Niño/a', key: 'childLastName', width: 20 },
    { header: 'Fecha de Nacimiento', key: 'birthdate', width: 15 },
    { header: 'Edad', key: 'age', width: 8 },
    { header: 'DNI', key: 'dni', width: 15 },
    { header: 'Grado Escolar', key: 'schoolGrade', width: 15 },
    { header: 'Nombre del Padre/Madre/Tutor', key: 'parentName', width: 20 },
    { header: 'Apellido del Padre/Madre/Tutor', key: 'parentLastName', width: 20 },
    { header: 'Relación', key: 'relationship', width: 15 },
    { header: 'Teléfono', key: 'phone', width: 15 },
    { header: 'Email', key: 'email', width: 25 },
    { header: 'Dirección', key: 'address', width: 30 },
    { header: 'Obra Social', key: 'healthInsurance', width: 20 },
    { header: 'Número de Afiliado', key: 'affiliateNumber', width: 20 },
    { header: 'Alergias', key: 'allergies', width: 20 },
    { header: 'Medicamentos', key: 'medications', width: 20 },
    { header: 'Dieta Especial', key: 'specialDiet', width: 20 },
    { header: 'Contacto de Emergencia - Nombre', key: 'emergencyContactName', width: 20 },
    { header: 'Contacto de Emergencia - Teléfono', key: 'emergencyContactPhone', width: 20 },
    { header: 'Contacto de Emergencia - Relación', key: 'emergencyContactRelationship', width: 20 },
    { header: 'Semanas', key: 'weeks', width: 30 },
    { header: 'Plan de Comida', key: 'mealPlan', width: 15 },
    { header: 'Restricciones Alimentarias', key: 'dietaryRestrictions', width: 20 },
    { header: 'Personas Autorizadas', key: 'authorizedPersons', width: 40 },
    { header: 'Información Adicional', key: 'additionalInfo', width: 30 },
    { header: 'Consentimiento Fotográfico', key: 'photoConsent', width: 15 }
  ];

  // Style the header row
  worksheet.getRow(1).font = { bold: true };
  worksheet.getRow(1).fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: 'FFD3D3D3' }
  };

  // Add rows
  registrations.forEach(registration => {
    // Handle different date formats (Firestore timestamp or regular Date)
    let formattedDate = 'N/A';
    let birthdate = 'N/A';
    
    if (registration.createdAt) {
      const dateValue = registration.createdAt;
      if (typeof dateValue === 'string' || typeof dateValue === 'number' || dateValue instanceof Date) {
        formattedDate = new Date(dateValue).toLocaleDateString('es-AR');
      }
    }
    
    if (registration.birthdate) {
      const dateValue = registration.birthdate;
      if (typeof dateValue === 'string' || typeof dateValue === 'number' || dateValue instanceof Date) {
        birthdate = new Date(dateValue).toLocaleDateString('es-AR');
      }
    }
    
    // Format authorized persons
    let authorizedPersonsText = '';
    if (registration.authorizedPersons && Array.isArray(registration.authorizedPersons) && registration.authorizedPersons.length > 0) {
      authorizedPersonsText = registration.authorizedPersons.map((person: Record<string, unknown>) => 
        `${person.name} (${person.relationship}, ${person.phone}, DNI: ${person.dni})`
      ).join('; ');
    }
    
    // Format weeks
    const weeksText = Array.isArray(registration.weeks) ? registration.weeks.join(', ') : registration.weeks;
    
    worksheet.addRow({
      createdAt: formattedDate,
      childName: registration.childName,
      childLastName: registration.childLastName,
      birthdate: birthdate,
      age: registration.age,
      dni: registration.dni,
      schoolGrade: registration.schoolGrade,
      parentName: registration.parentName,
      parentLastName: registration.parentLastName,
      relationship: registration.relationship,
      phone: registration.phone,
      email: registration.email,
      address: registration.address,
      healthInsurance: registration.healthInsurance,
      affiliateNumber: registration.affiliateNumber,
      allergies: registration.allergies || 'N/A',
      medications: registration.medications || 'N/A',
      specialDiet: registration.specialDiet || 'N/A',
      emergencyContactName: (registration.emergencyContact as { name?: unknown })?.name || 'N/A',
      emergencyContactPhone: (registration.emergencyContact as { phone?: unknown })?.phone || 'N/A',
      emergencyContactRelationship: (registration.emergencyContact as { relationship?: unknown })?.relationship || 'N/A',
      weeks: weeksText,
      mealPlan: registration.mealPlan ? 'Sí' : 'No',
      dietaryRestrictions: registration.dietaryRestrictions || 'N/A',
      authorizedPersons: authorizedPersonsText,
      additionalInfo: registration.additionalInfo || 'N/A',
      photoConsent: registration.photoConsent ? 'Sí' : 'No'
    });
  });

  // Create buffer
  const buffer = await workbook.xlsx.writeBuffer();
  return buffer;
}
