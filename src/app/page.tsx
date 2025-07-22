import Link from 'next/link';
import React from 'react';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-3xl w-full text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-blue-800">
          Colonia de Verano AMM 2025
        </h1>
        
        <p className="text-xl mb-8 text-gray-700">
          ¡Bienvenido a la inscripción para la Colonia de Verano AMM 2025!
        </p>

        <div className="bg-white rounded-xl shadow-lg p-8 mb-10">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            Información General
          </h2>
          
          <p className="mb-4 text-gray-600">
            La colonia de verano AMM ofrece actividades recreativas, deportivas y educativas 
            para niños y niñas de 3 a 12 años durante el verano 2025.
          </p>
          
          <h3 className="text-xl font-medium mt-6 mb-2 text-gray-800">
            Menú Semanal
          </h3>
          
          <div className="mb-6 text-left">
            <div className="mb-4">
              <h4 className="font-medium text-blue-700">Lunes</h4>
              <p className="text-gray-600">Plato Principal: Pollo / Carne con arroz</p>
              <p className="text-gray-600">Postre: Helado, alfajor, fruta, gelatina o postre vainilla/Chocolate</p>
            </div>
            
            <div className="mb-4">
              <h4 className="font-medium text-blue-700">Martes</h4>
              <p className="text-gray-600">Plato Principal: Tallarines / tirabuzones con salsa, aceite o manteca</p>
              <p className="text-gray-600">Postre: Helado, alfajor, fruta, gelatina o postre vainilla/chocolate</p>
            </div>
            
            <div className="mb-4">
              <h4 className="font-medium text-blue-700">Miércoles</h4>
              <p className="text-gray-600">Plato Principal: Salchichas con puré / Tarta de jamón y queso o verdura</p>
              <p className="text-gray-600">Postre: Helado, alfajor, fruta, gelatina o postre vainilla/chocolate</p>
            </div>
            
            <div className="mb-4">
              <h4 className="font-medium text-blue-700">Jueves</h4>
              <p className="text-gray-600">Plato Principal: Milanesa de ternera / Milanesa de pollo con guarnición</p>
              <p className="text-gray-600">Postre: Helado, alfajor, fruta, gelatina o postre vainilla/chocolate</p>
            </div>
            
            <div className="mb-4">
              <h4 className="font-medium text-blue-700">Viernes</h4>
              <p className="text-gray-600">Plato Principal: Pizzas de varios gustos / empanadas de varios gustos</p>
              <p className="text-gray-600">Postre: Helado, alfajor, fruta, gelatina o postre vainilla/chocolate</p>
            </div>
            
            <p className="text-sm text-gray-500 italic mt-4">
              *Los días que tienen 2 menúes distintos implica que se van alternando cada semana
            </p>
            
            <p className="text-sm text-gray-500 italic mt-2">
              *Guarniciones: Papas fritas, tortilla de papas, arroz, purés y ensaladas; 
              las daremos en forma alternada para generar una variación en el menú.
            </p>
            
            <p className="text-sm text-gray-500 italic mt-2">
              *Los menúes se entregarán en recipientes descartables, junto con tenedores, cuchillos y servilletas descartables.
            </p>
          </div>
          
          <p className="text-gray-700 mt-4">
            <strong>Arancel:</strong> El costo diario del servicio se informará el día de la reunión de padres.
          </p>
          
          <p className="text-gray-700 mt-2">
            <strong>NOTA:</strong> El almuerzo se abonará en el bar por semana adelantada o por día.
          </p>
        </div>
        
        {/* Normas Generales */}
        <div className="bg-orange-50 border-l-4 border-orange-400 p-6 rounded-lg">
          <h2 className="text-2xl font-bold text-orange-800 mb-4">📋 Normas Generales</h2>
          
          <div className="space-y-3 text-gray-700">
            <div>
              <h3 className="font-semibold text-orange-700 mb-2">🕐 Horarios</h3>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li><strong>Entrada:</strong> 9:00 a 9:30 hs</li>
                <li><strong>Salida:</strong> 17:00 a 17:30 hs</li>
                <li>No se permite el ingreso después de las 9:30 hs sin justificativo</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-orange-700 mb-2">👕 Vestimenta</h3>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Remera de la colonia (se entrega el primer día)</li>
                <li>Short o pantalón cómodo</li>
                <li>Zapatillas (NO ojotas)</li>
                <li>Gorra o sombrero</li>
                <li>Malla y toalla para actividades acuáticas</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-orange-700 mb-2">🎒 Elementos a traer</h3>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Botella de agua (identificada con nombre)</li>
                <li>Protector solar</li>
                <li>Medicamentos (si corresponde, con indicaciones por escrito)</li>
                <li>Mochila pequeña para guardar pertenencias</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-orange-700 mb-2">⚠️ Elementos NO permitidos</h3>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Dispositivos electrónicos (celulares, tablets, etc.)</li>
                <li>Dinero</li>
                <li>Objetos de valor</li>
                <li>Juguetes personales</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-orange-700 mb-2">🏥 Salud y Emergencias</h3>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Los niños con fiebre o síntomas de enfermedad NO pueden asistir</li>
                <li>Avisar inmediatamente cualquier cambio en el estado de salud</li>
                <li>Mantener actualizados los contactos de emergencia</li>
                <li>El personal está capacitado en primeros auxilios</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-orange-700 mb-2">👨‍👩‍👧‍👦 Retiro de menores</h3>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Solo podrán retirar a los niños las personas autorizadas en el formulario</li>
                <li>Es obligatorio presentar DNI al momento del retiro</li>
                <li>Para autorizar nuevas personas, debe comunicarse por escrito</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-orange-700 mb-2">📞 Comunicación</h3>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Mantener actualizados los números de contacto</li>
                <li>Responder llamadas del personal de la colonia</li>
                <li>Las reuniones de padres son obligatorias</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-4 p-3 bg-orange-100 rounded-lg">
            <p className="text-orange-800 font-medium text-sm">
              ⚡ <strong>Importante:</strong> El incumplimiento reiterado de las normas puede resultar 
              en la suspensión temporal o definitiva de la colonia.
            </p>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <Link 
            href="/registro" 
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-all"
          >
            Inscribirme Ahora
          </Link>
          <Link 
            href="/admin/login" 
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-3 px-6 rounded-lg transition-all"
          >
            Acceso Administrativo
          </Link>
        </div>
      </div>
    </main>
  );
}
