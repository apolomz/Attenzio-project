from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Curso
from .serializers import CursoSerializer

class CursoViewSet(viewsets.ModelViewSet):
    serializer_class = CursoSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if hasattr(user, 'rol') and user.rol.nombre == 'Profesor':
            return Curso.objects.filter(profesor=user)
        return Curso.objects.filter(estudiantes=user)

    @action(detail=True, methods=['post'])
    def inscribir_estudiante(self, request, pk=None):
        curso = self.get_object()
        estudiante_id = request.data.get('estudiante_id')
        curso.estudiantes.add(estudiante_id)
        return Response({'status': 'Estudiante inscrito'})