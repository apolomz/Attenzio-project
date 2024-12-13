from rest_framework import serializers
from .models import Curso
from apps.usuarios.serializers import UsuarioSerializer

class CursoSerializer(serializers.ModelSerializer):
    profesor = UsuarioSerializer(read_only=True)
    estudiantes = UsuarioSerializer(many=True, read_only=True)

    class Meta:
        model = Curso
        fields = ['id', 'nombre', 'descripcion', 'codigo', 'profesor', 'estudiantes']