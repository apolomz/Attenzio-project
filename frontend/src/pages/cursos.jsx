import { useState, useEffect } from 'react';
import axios from 'axios';
import { PlusIcon } from '@heroicons/react/24/outline';

export default function Cursos() {
  const [cursos, setCursos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [nuevoCurso, setNuevoCurso] = useState({
    nombre: '',
    descripcion: '',
    codigo: ''
  });

  useEffect(() => {
    fetchCursos();
  }, []);

  const fetchCursos = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/cursos/');
      setCursos(response.data);
    } catch (error) {
      console.error('Error al cargar cursos:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/api/cursos/', nuevoCurso);
      setShowModal(false);
      fetchCursos();
    } catch (error) {
      console.error('Error al crear curso:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Mis Cursos</h1>
          <button
            onClick={() => setShowModal(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
          >
            <PlusIcon className="-ml-1 mr-2 h-5 w-5" />
            Nuevo Curso
          </button>
        </div>

        <div className="mt-8 grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {cursos.map((curso) => (
            <div key={curso.id} className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium text-gray-900">{curso.nombre}</h3>
                <p className="mt-1 text-sm text-gray-500">{curso.descripcion}</p>
                <p className="mt-2 text-sm text-gray-600">Código: {curso.codigo}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal para nuevo curso */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white rounded-lg p-8 max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Nuevo Curso</h2>
            <form onSubmit={handleSubmit}>
              {/* Formulario aquí */}
            </form>
          </div>
        </div>
      )}
    </div>
  );
}