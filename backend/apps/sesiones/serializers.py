from rest_framework import serializers
from .models import Sesion, Pregunta, Opcion, Asistencia

class OpcionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Opcion
        fields = ['id', 'texto', 'es_correcta']

class PreguntaSerializer(serializers.ModelSerializer):
    opciones = OpcionSerializer(many=True, read_only=True)

    class Meta:
        model = Pregunta
        fields = ['id', 'texto', 'codigo_qr', 'opciones']

class SesionSerializer(serializers.ModelSerializer):
    preguntas = PreguntaSerializer(many=True, read_only=True)

    class Meta:
        model = Sesion
        fields = ['id', 'curso', 'fecha', 'hora_inicio', 'hora_fin', 
                 'material_clase', 'codigo_qr', 'preguntas']

class AsistenciaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Asistencia
        fields = ['id', 'estudiante', 'sesion', 'fecha', 'latitud', 'longitud']