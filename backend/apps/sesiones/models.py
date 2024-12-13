from django.db import models
from apps.cursos.models import Curso
from apps.usuarios.models import Usuario

class Sesion(models.Model):
    curso = models.ForeignKey(Curso, on_delete=models.CASCADE)
    fecha = models.DateField()
    hora_inicio = models.TimeField()
    hora_fin = models.TimeField()
    material_clase = models.FileField(upload_to='material_clase/', null=True, blank=True)
    codigo_qr = models.ImageField(upload_to='codigos_qr/', null=True, blank=True)

    class Meta:
        db_table = 'sesion'

class Pregunta(models.Model):
    sesion = models.ForeignKey(Sesion, on_delete=models.CASCADE)
    texto = models.TextField()
    codigo_qr = models.ImageField(upload_to='codigos_qr_preguntas/')

    class Meta:
        db_table = 'pregunta'

class Opcion(models.Model):
    pregunta = models.ForeignKey(Pregunta, on_delete=models.CASCADE)
    texto = models.TextField()
    es_correcta = models.BooleanField(default=False)

    class Meta:
        db_table = 'opcion'

class Asistencia(models.Model):
    estudiante = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    sesion = models.ForeignKey(Sesion, on_delete=models.CASCADE)
    fecha = models.DateTimeField(auto_now_add=True)
    latitud = models.DecimalField(max_digits=10, decimal_places=6)
    longitud = models.DecimalField(max_digits=10, decimal_places=6)

    class Meta:
        db_table = 'estudiante_sesion'
        unique_together = ('estudiante', 'sesion')