import qrcode
from io import BytesIO
from django.core.files import File
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Sesion, Asistencia
from .serializers import SesionSerializer, AsistenciaSerializer

class SesionViewSet(viewsets.ModelViewSet):
    serializer_class = SesionSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if hasattr(user, 'rol') and user.rol.nombre == 'Profesor':
            return Sesion.objects.filter(curso__profesor=user)
        return Sesion.objects.filter(curso__estudiantes=user)

    def perform_create(self, serializer):
        # Generar código QR para la sesión
        qr = qrcode.QRCode(version=1, box_size=10, border=5)
        qr.add_data(f"sesion_{serializer.validated_data['curso'].id}")
        qr.make(fit=True)
        img = qr.make_image(fill_color="black", back_color="white")
        
        # Guardar imagen QR
        blob = BytesIO()
        img.save(blob, 'PNG')
        sesion = serializer.save()
        sesion.codigo_qr.save(f'qr_sesion_{sesion.id}.png', 
                            File(blob), save=True)

    @action(detail=False, methods=['post'])
    def registrar_asistencia(self, request):
        serializer = AsistenciaSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(estudiante=request.user)
            return Response(serializer.data)
        return Response(serializer.errors, status=400)