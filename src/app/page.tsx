import Link from 'next/link';

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
