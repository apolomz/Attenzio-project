-- #######################################################
-- file:schema.sql
-- Database Course 2024
-- Univalle
-- @Apolomz
-- #######################################################

\c pos_project

CREATE TABLE ROL (
    IDRol INTEGER PRIMARY KEY,
    NombreRol VARCHAR(200) NOT NULL
);

CREATE TABLE USUARIO (
    IDusuario INTEGER PRIMARY KEY,
    Contraseña VARCHAR(255) NOT NULL,
    DocumentoIdentidad INTEGER NOT NULL,
    Nombre VARCHAR(200) NOT NULL,
    Apellido VARCHAR(200) NOT NULL,
    CorreoElectronico VARCHAR(200) NOT NULL,
    Registro_Academico VARCHAR(250),
    NumCelular INTEGER,
    CodEstudiante VARCHAR(200),
    Foto VARCHAR(200),
    DireccionResidencia VARCHAR(200),
    CodProfesor VARCHAR(200),
    IDRol INTEGER,
    FOREIGN KEY (IDRol) REFERENCES ROL(IDRol)
);

CREATE TABLE CURSO (
    IDCurso INTEGER PRIMARY KEY,
    NombreCurso VARCHAR(200) NOT NULL,
    Descripcion TEXT,
    CodClase VARCHAR(200),
    IDProfesor INTEGER,
    FOREIGN KEY (IDProfesor) REFERENCES USUARIO(IDusuario)
);

CREATE TABLE SESION (
    IDSesion INTEGER PRIMARY KEY,
    Fecha DATE NOT NULL,
    HoraInicio TIME NOT NULL,
    HoraFin TIME NOT NULL,
    MaterialClase TEXT,
    IDCurso INTEGER,
    FOREIGN KEY (IDCurso) REFERENCES CURSO(IDCurso)
);

CREATE TABLE PREGUNTA (
    IDPregunta INTEGER PRIMARY KEY,
    CodigoQR VARCHAR(250) NOT NULL,
    Pregunta TEXT NOT NULL,
    IDSesion INTEGER,
    FOREIGN KEY (IDSesion) REFERENCES SESION(IDSesion)
);

CREATE TABLE OPCION (
    IDOpcion INTEGER PRIMARY KEY,
    EsCorrecto BOOLEAN NOT NULL,
    Pregunta TEXT NOT NULL,
    IDPregunta INTEGER,
    FOREIGN KEY (IDPregunta) REFERENCES PREGUNTA(IDPregunta)
);

CREATE TABLE ESTUDIANTE_OPCION (
    IDEstudiante INTEGER,
    IDOpciones INTEGER,
    Latitud DECIMAL(10, 6),
    Longitud DECIMAL(10, 6),
    PRIMARY KEY (IDEstudiante, IDOpciones),
    FOREIGN KEY (IDEstudiante) REFERENCES USUARIO(IDusuario),
    FOREIGN KEY (IDOpciones) REFERENCES OPCION(IDOpcion)
);

CREATE TABLE ESTUDIANTE_CURSO (
    IDEstudiante INTEGER,
    IDCurso INTEGER,
    PRIMARY KEY (IDEstudiante, IDCurso),
    FOREIGN KEY (IDEstudiante) REFERENCES USUARIO(IDusuario),
    FOREIGN KEY (IDCurso) REFERENCES CURSO(IDCurso)
);

CREATE TABLE ESTUDIANTE_SESION (
    IDEstudiante INTEGER,
    IDSesion INTEGER,
    Fecha DATE NOT NULL,
    Latitud DECIMAL(10, 6),
    Longitud DECIMAL(10, 6),
    PRIMARY KEY (IDEstudiante, IDSesion),
    FOREIGN KEY (IDEstudiante) REFERENCES USUARIO(IDusuario),
    FOREIGN KEY (IDSesion) REFERENCES SESION(IDSesion)
);
