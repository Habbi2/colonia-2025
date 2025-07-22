'use client';

import { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import Link from 'next/link';

export default function RegistrationPage() {
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  
  const { register, handleSubmit, control, watch, formState: { errors } } = useForm({
    defaultValues: {
      childName: '',
      childLastName: '',
      birthdate: '',
      age: '',
      dni: '',
      schoolGrade: '',
      parentName: '',
      parentLastName: '',
      relationship: '',
      phone: '',
      email: '',
      address: '',
      healthInsurance: '',
      affiliateNumber: '',
      allergies: '',
      medications: '',
      specialDiet: '',
      emergencyContact: {
        name: '',
        phone: '',
        relationship: ''
      },
      weeks: [],
      mealPlan: false,
      dietaryRestrictions: '',
      authorizedPersons: [{ name: '', relationship: '', phone: '', dni: '' }],
      additionalInfo: '',
      photoConsent: false
    }
  });
  
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'authorizedPersons'
  });
  
  const mealPlan = watch('mealPlan');
  
  const onSubmit = async (data: any) => {
    setSubmitting(true);
    setError('');
    
    try {
      const response = await fetch('/api/registration', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.message || 'Error al enviar el formulario');
      }
      
      setSuccess(true);
      window.scrollTo(0, 0);
    } catch (err: any) {
      setError(err.message || 'Ocurrió un error al procesar su solicitud');
    } finally {
      setSubmitting(false);
    }
  };
  
  if (success) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-50">
        <div className="w-full max-w-3xl bg-white rounded-xl shadow-lg p-8 text-center">
          <div className="mb-6">
            <svg className="mx-auto h-16 w-16 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          
          <h1 className="text-3xl font-bold text-gray-800 mb-4">¡Inscripción Exitosa!</h1>
          
          <p className="text-lg text-gray-600 mb-6">
            Gracias por inscribir a su hijo/a en la Colonia de Verano AMM 2025. 
            Hemos enviado un correo electrónico de confirmación con los detalles de su registro.
          </p>
          
          <p className="text-gray-600 mb-8">
            Si no recibe el correo electrónico dentro de los próximos minutos, por favor revise su carpeta de spam 
            o contáctenos directamente.
          </p>
          
          <Link href="/" className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-all">
            Volver al Inicio
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Formulario de Inscripción - Colonia de Verano AMM 2025
          </h1>
          <p className="mt-2 text-gray-600">
            Complete todos los campos requeridos para inscribir a su hijo/a
          </p>
        </div>
        
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1-9a1 1 0 112 0v4a1 1 0 11-2 0V9z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}
        
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white shadow-md rounded-lg p-6 mb-10">
          {/* Sección: Información del Niño/a */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 pb-2 border-b border-gray-200 mb-4">
              Información del Niño/a
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="childName" className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="childName"
                  {...register('childName', { required: 'El nombre es obligatorio' })}
                  className={`w-full px-3 py-2 border ${errors.childName ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                />
                {errors.childName && <p className="mt-1 text-sm text-red-600">{errors.childName.message}</p>}
              </div>
              
              <div>
                <label htmlFor="childLastName" className="block text-sm font-medium text-gray-700 mb-1">
                  Apellido <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="childLastName"
                  {...register('childLastName', { required: 'El apellido es obligatorio' })}
                  className={`w-full px-3 py-2 border ${errors.childLastName ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                />
                {errors.childLastName && <p className="mt-1 text-sm text-red-600">{errors.childLastName.message}</p>}
              </div>
              
              <div>
                <label htmlFor="birthdate" className="block text-sm font-medium text-gray-700 mb-1">
                  Fecha de Nacimiento <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  id="birthdate"
                  {...register('birthdate', { required: 'La fecha de nacimiento es obligatoria' })}
                  className={`w-full px-3 py-2 border ${errors.birthdate ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                />
                {errors.birthdate && <p className="mt-1 text-sm text-red-600">{errors.birthdate.message}</p>}
              </div>
              
              <div>
                <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">
                  Edad <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  id="age"
                  min="3"
                  max="12"
                  {...register('age', { 
                    required: 'La edad es obligatoria',
                    min: { value: 3, message: 'La edad mínima es 3 años' },
                    max: { value: 12, message: 'La edad máxima es 12 años' }
                  })}
                  className={`w-full px-3 py-2 border ${errors.age ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                />
                {errors.age && <p className="mt-1 text-sm text-red-600">{errors.age.message}</p>}
              </div>
              
              <div>
                <label htmlFor="dni" className="block text-sm font-medium text-gray-700 mb-1">
                  DNI <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="dni"
                  {...register('dni', { required: 'El DNI es obligatorio' })}
                  className={`w-full px-3 py-2 border ${errors.dni ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                />
                {errors.dni && <p className="mt-1 text-sm text-red-600">{errors.dni.message}</p>}
              </div>
              
              <div>
                <label htmlFor="schoolGrade" className="block text-sm font-medium text-gray-700 mb-1">
                  Grado Escolar <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="schoolGrade"
                  {...register('schoolGrade', { required: 'El grado escolar es obligatorio' })}
                  className={`w-full px-3 py-2 border ${errors.schoolGrade ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                />
                {errors.schoolGrade && <p className="mt-1 text-sm text-red-600">{errors.schoolGrade.message}</p>}
              </div>
            </div>
          </div>
          
          {/* Sección: Información del Padre/Madre/Tutor */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 pb-2 border-b border-gray-200 mb-4">
              Información del Padre/Madre/Tutor
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="parentName" className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="parentName"
                  {...register('parentName', { required: 'El nombre es obligatorio' })}
                  className={`w-full px-3 py-2 border ${errors.parentName ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                />
                {errors.parentName && <p className="mt-1 text-sm text-red-600">{errors.parentName.message}</p>}
              </div>
              
              <div>
                <label htmlFor="parentLastName" className="block text-sm font-medium text-gray-700 mb-1">
                  Apellido <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="parentLastName"
                  {...register('parentLastName', { required: 'El apellido es obligatorio' })}
                  className={`w-full px-3 py-2 border ${errors.parentLastName ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                />
                {errors.parentLastName && <p className="mt-1 text-sm text-red-600">{errors.parentLastName.message}</p>}
              </div>
              
              <div>
                <label htmlFor="relationship" className="block text-sm font-medium text-gray-700 mb-1">
                  Relación con el niño/a <span className="text-red-500">*</span>
                </label>
                <select
                  id="relationship"
                  {...register('relationship', { required: 'La relación es obligatoria' })}
                  className={`w-full px-3 py-2 border ${errors.relationship ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                >
                  <option value="">Seleccione...</option>
                  <option value="Madre">Madre</option>
                  <option value="Padre">Padre</option>
                  <option value="Tutor/a">Tutor/a</option>
                  <option value="Otro">Otro</option>
                </select>
                {errors.relationship && <p className="mt-1 text-sm text-red-600">{errors.relationship.message}</p>}
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Teléfono <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="phone"
                  {...register('phone', { required: 'El teléfono es obligatorio' })}
                  className={`w-full px-3 py-2 border ${errors.phone ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                />
                {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>}
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  {...register('email', { 
                    required: 'El email es obligatorio',
                    pattern: { 
                      value: /^\S+@\S+\.\S+$/,
                      message: 'Ingrese un email válido'
                    }
                  })}
                  className={`w-full px-3 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                />
                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
              </div>
              
              <div className="md:col-span-2">
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                  Dirección <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="address"
                  {...register('address', { required: 'La dirección es obligatoria' })}
                  className={`w-full px-3 py-2 border ${errors.address ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                />
                {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address.message}</p>}
              </div>
            </div>
          </div>
          
          {/* Sección: Información Médica */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 pb-2 border-b border-gray-200 mb-4">
              Información Médica
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="healthInsurance" className="block text-sm font-medium text-gray-700 mb-1">
                  Obra Social <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="healthInsurance"
                  {...register('healthInsurance', { required: 'La obra social es obligatoria' })}
                  className={`w-full px-3 py-2 border ${errors.healthInsurance ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                />
                {errors.healthInsurance && <p className="mt-1 text-sm text-red-600">{errors.healthInsurance.message}</p>}
              </div>
              
              <div>
                <label htmlFor="affiliateNumber" className="block text-sm font-medium text-gray-700 mb-1">
                  Número de Afiliado <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="affiliateNumber"
                  {...register('affiliateNumber', { required: 'El número de afiliado es obligatorio' })}
                  className={`w-full px-3 py-2 border ${errors.affiliateNumber ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                />
                {errors.affiliateNumber && <p className="mt-1 text-sm text-red-600">{errors.affiliateNumber.message}</p>}
              </div>
              
              <div>
                <label htmlFor="allergies" className="block text-sm font-medium text-gray-700 mb-1">
                  Alergias
                </label>
                <textarea
                  id="allergies"
                  {...register('allergies')}
                  rows={2}
                  placeholder="Detalle si el niño/a tiene alergias"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                ></textarea>
              </div>
              
              <div>
                <label htmlFor="medications" className="block text-sm font-medium text-gray-700 mb-1">
                  Medicamentos
                </label>
                <textarea
                  id="medications"
                  {...register('medications')}
                  rows={2}
                  placeholder="Medicamentos que toma regularmente"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                ></textarea>
              </div>
              
              <div className="md:col-span-2">
                <label htmlFor="specialDiet" className="block text-sm font-medium text-gray-700 mb-1">
                  Dieta Especial
                </label>
                <textarea
                  id="specialDiet"
                  {...register('specialDiet')}
                  rows={2}
                  placeholder="Restricciones alimenticias o dieta especial"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                ></textarea>
              </div>
            </div>
            
            {/* Contacto de Emergencia */}
            <div className="mt-6">
              <h3 className="text-lg font-medium text-gray-800 mb-4">
                Contacto de Emergencia <span className="text-red-500">*</span>
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="emergencyContactName" className="block text-sm font-medium text-gray-700 mb-1">
                    Nombre <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="emergencyContactName"
                    {...register('emergencyContact.name', { required: 'El nombre del contacto es obligatorio' })}
                    className={`w-full px-3 py-2 border ${errors.emergencyContact?.name ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                  />
                  {errors.emergencyContact?.name && <p className="mt-1 text-sm text-red-600">{errors.emergencyContact.name.message}</p>}
                </div>
                
                <div>
                  <label htmlFor="emergencyContactPhone" className="block text-sm font-medium text-gray-700 mb-1">
                    Teléfono <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="emergencyContactPhone"
                    {...register('emergencyContact.phone', { required: 'El teléfono del contacto es obligatorio' })}
                    className={`w-full px-3 py-2 border ${errors.emergencyContact?.phone ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                  />
                  {errors.emergencyContact?.phone && <p className="mt-1 text-sm text-red-600">{errors.emergencyContact.phone.message}</p>}
                </div>
                
                <div>
                  <label htmlFor="emergencyContactRelationship" className="block text-sm font-medium text-gray-700 mb-1">
                    Relación <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="emergencyContactRelationship"
                    {...register('emergencyContact.relationship', { required: 'La relación del contacto es obligatoria' })}
                    className={`w-full px-3 py-2 border ${errors.emergencyContact?.relationship ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                  />
                  {errors.emergencyContact?.relationship && <p className="mt-1 text-sm text-red-600">{errors.emergencyContact.relationship.message}</p>}
                </div>
              </div>
            </div>
          </div>
          
          {/* Sección: Opciones de Inscripción */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 pb-2 border-b border-gray-200 mb-4">
              Opciones de Inscripción
            </h2>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Semanas <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="week1"
                    value="1 al 5 de Enero"
                    {...register('weeks', { required: 'Debe seleccionar al menos una semana' })}
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="week1" className="ml-2 block text-sm text-gray-700">
                    1 al 5 de Enero
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="week2"
                    value="8 al 12 de Enero"
                    {...register('weeks')}
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="week2" className="ml-2 block text-sm text-gray-700">
                    8 al 12 de Enero
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="week3"
                    value="15 al 19 de Enero"
                    {...register('weeks')}
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="week3" className="ml-2 block text-sm text-gray-700">
                    15 al 19 de Enero
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="week4"
                    value="22 al 26 de Enero"
                    {...register('weeks')}
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="week4" className="ml-2 block text-sm text-gray-700">
                    22 al 26 de Enero
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="week5"
                    value="29 de Enero al 2 de Febrero"
                    {...register('weeks')}
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="week5" className="ml-2 block text-sm text-gray-700">
                    29 de Enero al 2 de Febrero
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="week6"
                    value="5 al 9 de Febrero"
                    {...register('weeks')}
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="week6" className="ml-2 block text-sm text-gray-700">
                    5 al 9 de Febrero
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="week7"
                    value="12 al 16 de Febrero"
                    {...register('weeks')}
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="week7" className="ml-2 block text-sm text-gray-700">
                    12 al 16 de Febrero
                  </label>
                </div>
              </div>
              {errors.weeks && <p className="mt-2 text-sm text-red-600">{errors.weeks.message}</p>}
            </div>
            
            <div className="mb-6">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="mealPlan"
                  {...register('mealPlan')}
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="mealPlan" className="ml-2 block text-sm text-gray-700">
                  Incluir plan de comida
                </label>
              </div>
              
              {mealPlan && (
                <div className="mt-4">
                  <label htmlFor="dietaryRestrictions" className="block text-sm font-medium text-gray-700 mb-1">
                    Restricciones Alimentarias
                  </label>
                  <textarea
                    id="dietaryRestrictions"
                    {...register('dietaryRestrictions')}
                    rows={2}
                    placeholder="Especifique si tiene restricciones alimentarias adicionales"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  ></textarea>
                </div>
              )}
            </div>
          </div>
          
          {/* Sección: Personas Autorizadas a Retirar */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 pb-2 border-b border-gray-200 mb-4">
              Personas Autorizadas a Retirar al Niño/a
            </h2>
            
            {fields.map((field, index) => (
              <div key={field.id} className="mb-6 p-4 border border-gray-200 rounded-lg bg-gray-50">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-md font-medium text-gray-800">Persona {index + 1}</h3>
                  
                  {index > 0 && (
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Eliminar
                    </button>
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nombre Completo
                    </label>
                    <input
                      type="text"
                      {...register(`authorizedPersons.${index}.name`)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Relación
                    </label>
                    <input
                      type="text"
                      {...register(`authorizedPersons.${index}.relationship`)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Teléfono
                    </label>
                    <input
                      type="text"
                      {...register(`authorizedPersons.${index}.phone`)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      DNI
                    </label>
                    <input
                      type="text"
                      {...register(`authorizedPersons.${index}.dni`)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>
            ))}
            
            <button
              type="button"
              onClick={() => append({ name: '', relationship: '', phone: '', dni: '' })}
              className="flex items-center text-blue-600 hover:text-blue-800"
            >
              <svg className="h-5 w-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
              </svg>
              Agregar otra persona autorizada
            </button>
          </div>
          
          {/* Sección: Información Adicional */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 pb-2 border-b border-gray-200 mb-4">
              Información Adicional
            </h2>
            
            <div>
              <label htmlFor="additionalInfo" className="block text-sm font-medium text-gray-700 mb-1">
                Información Adicional Relevante
              </label>
              <textarea
                id="additionalInfo"
                {...register('additionalInfo')}
                rows={3}
                placeholder="Cualquier información adicional que considere importante"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              ></textarea>
            </div>
            
            <div className="mt-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="photoConsent"
                  {...register('photoConsent')}
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="photoConsent" className="ml-2 block text-sm text-gray-700">
                  Doy consentimiento para el uso de fotografías de mi hijo/a en medios de comunicación de la colonia
                </label>
              </div>
            </div>
          </div>
          
          {/* Botón de envío */}
          <div className="flex justify-center">
            <button
              type="submit"
              disabled={submitting}
              className={`bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-lg transition-all ${submitting ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {submitting ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Enviando...
                </span>
              ) : 'Enviar Inscripción'}
            </button>
          </div>
        </form>
        
        <div className="text-center">
          <Link href="/" className="text-blue-600 hover:underline">
            Volver al Inicio
          </Link>
        </div>
      </div>
    </div>
  );
}
