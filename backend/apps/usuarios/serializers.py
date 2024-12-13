from rest_framework import serializers
from .models import Usuario, Rol

class RolSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rol
        fields = ['id', 'nombre']

class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 
                 'documento_identidad', 'direccion', 'foto', 'celular',
                 'codigo_estudiante', 'codigo_profesor', 'rol']
        extra_kwargs = {'password': {'write_only': True}}