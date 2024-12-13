from django.db import models
from django.contrib.auth.models import AbstractUser

class Usuario(AbstractUser):
    documento_identidad = models.IntegerField(unique=True)
    direccion = models.CharField(max_length=200)
    foto = models.ImageField(upload_to='fotos_usuarios/', null=True, blank=True)
    celular = models.CharField(max_length=20, null=True, blank=True)
    codigo_estudiante = models.CharField(max_length=50, null=True, blank=True)
    codigo_profesor = models.CharField(max_length=50, null=True, blank=True)
    rol = models.ForeignKey('Rol', on_delete=models.SET_NULL, null=True)

    class Meta:
        db_table = 'usuario'

class Rol(models.Model):
    nombre = models.CharField(max_length=100)

    class Meta:
        db_table = 'rol'

    def __str__(self):
        return self.nombre