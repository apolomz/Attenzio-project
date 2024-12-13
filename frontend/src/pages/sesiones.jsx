import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function Sesiones() {
  const { cursoId } = useParams();
  const [sesiones, setSesiones] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSesiones();
  }, [cursoId]);

  const fetchSesiones = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/sesiones/?curso=${cursoId}`);
      setSesiones(response.data);
    } catch (error) {
      console.error('Error al cargar sesiones:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900">Sesiones de Clase</h1>
        
        <div className="mt-8">
          {sesiones.map((sesion) => (
            <div key={sesion.id} className="bg-white shadow overflow-hidden sm:rounded-lg mb-4">
              <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Sesión del {new Date(sesion.fecha).toLocaleDateString()}
                </h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  {sesion.hora_inicio} - {sesion.hora_fin}
                </p>
              </div>
              <div className="border-t border-gray-200">
                <dl>
                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Material de clase</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {sesion.material_clase ? (
                        <a href={sesion.material_clase} className="text-indigo-600 hover:text-indigo-900">
                          Descargar material
                        </a>
                      ) : (
                        'No hay material disponible'
                      )}
                    </dd>
                  </div>
                  <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Código QR</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {sesion.codigo_qr && (
                        <img src={sesion.codigo_qr} alt="Código QR" className="h-32 w-32" />
                      )}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}