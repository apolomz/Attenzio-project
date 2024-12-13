from django.db import models
from apps.usuarios.models import Usuario

class Curso(models.Model):
    nombre = models.CharField(max_length=200)
    descripcion = models.TextField(null=True, blank=True)
    codigo = models.CharField(max_length=50)
    profesor = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    estudiantes = models.ManyToManyField(Usuario, related_name='cursos_inscritos')

    class Meta:
        db_table = 'curso'

    def __str__(self):
        return self.nombre