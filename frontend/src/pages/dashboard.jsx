import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';

export default function Dashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalCursos: 0,
    sesionesHoy: 0,
    asistenciaPromedio: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/usuarios/stats/');
        setStats(response.data);
      } catch (error) {
        console.error('Error al cargar estadísticas:', error);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Bienvenido, {user?.first_name}
        </h1>
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-3">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <dt className="text-sm font-medium text-gray-500 truncate">
                Total de Cursos
              </dt>
              <dd className="mt-1 text-3xl font-semibold text-gray-900">
                {stats.totalCursos}
              </dd>
            </div>
          </div>
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <dt className="text-sm font-medium text-gray-500 truncate">
                Sesiones Hoy
              </dt>
              <dd className="mt-1 text-3xl font-semibold text-gray-900">
                {stats.sesionesHoy}
              </dd>
            </div>
          </div>
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <dt className="text-sm font-medium text-gray-500 truncate">
                Asistencia Promedio
              </dt>
              <dd className="mt-1 text-3xl font-semibold text-gray-900">
                {stats.asistenciaPromedio}%
              </dd>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}