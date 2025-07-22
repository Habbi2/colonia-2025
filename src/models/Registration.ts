import mongoose, { Schema, models } from 'mongoose';

const RegistrationSchema = new Schema({
  // Child Information
  childName: {
    type: String,
    required: [true, 'El nombre del niño/a es obligatorio'],
  },
  childLastName: {
    type: String,
    required: [true, 'El apellido del niño/a es obligatorio'],
  },
  birthdate: {
    type: Date,
    required: [true, 'La fecha de nacimiento es obligatoria'],
  },
  age: {
    type: Number,
    required: [true, 'La edad es obligatoria'],
  },
  dni: {
    type: String,
    required: [true, 'El DNI es obligatorio'],
  },
  schoolGrade: {
    type: String,
    required: [true, 'El grado escolar es obligatorio'],
  },

  // Parent Information
  parentName: {
    type: String,
    required: [true, 'El nombre del padre/madre/tutor es obligatorio'],
  },
  parentLastName: {
    type: String,
    required: [true, 'El apellido del padre/madre/tutor es obligatorio'],
  },
  relationship: {
    type: String,
    required: [true, 'La relación con el niño/a es obligatoria'],
  },
  phone: {
    type: String,
    required: [true, 'El teléfono es obligatorio'],
  },
  email: {
    type: String,
    required: [true, 'El email es obligatorio'],
    match: [/^\S+@\S+\.\S+$/, 'Email inválido'],
  },
  address: {
    type: String,
    required: [true, 'La dirección es obligatoria'],
  },

  // Medical Information
  healthInsurance: {
    type: String,
    required: [true, 'La obra social es obligatoria'],
  },
  affiliateNumber: {
    type: String,
    required: [true, 'El número de afiliado es obligatorio'],
  },
  allergies: {
    type: String,
  },
  medications: {
    type: String,
  },
  specialDiet: {
    type: String,
  },
  emergencyContact: {
    name: {
      type: String,
      required: [true, 'El nombre del contacto de emergencia es obligatorio'],
    },
    phone: {
      type: String,
      required: [true, 'El teléfono del contacto de emergencia es obligatorio'],
    },
    relationship: {
      type: String,
      required: [true, 'La relación del contacto de emergencia es obligatoria'],
    },
  },

  // Registration Options
  weeks: {
    type: [String],
    required: [true, 'Debe seleccionar al menos una semana'],
  },
  mealPlan: {
    type: Boolean,
    default: false,
  },
  dietaryRestrictions: {
    type: String,
  },
  
  // Authorized people to pick up child
  authorizedPersons: [{
    name: String,
    relationship: String,
    phone: String,
    dni: String
  }],
  
  // Additional information
  additionalInfo: {
    type: String,
  },
  
  // Consent
  photoConsent: {
    type: Boolean,
    default: false,
  },
  
  // Submission date
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

export default models.Registration || mongoose.model('Registration', RegistrationSchema);
