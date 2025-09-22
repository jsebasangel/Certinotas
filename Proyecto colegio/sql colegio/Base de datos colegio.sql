

CREATE TABLE colegio.Tipo_Documento (
    ID_Documento double PRIMARY KEY,
    Tipo_Documento double  NOT NULL,
    Numero VARCHAR(50) NOT NULL,
    Lugar_Expedicion VARCHAR(100) NOT NULL
);

-- Crear tabla Profesor
CREATE TABLE colegio.Profesor (
    ID_Profesor INT PRIMARY KEY AUTO_INCREMENT,
    Nombre VARCHAR(100) NOT NULL,
    Departamento VARCHAR(100),
    Correo_Electronico VARCHAR(100)
);
-- Crear tabla Notas
CREATE TABLE colegio.Notas (
    ID_Nota INT PRIMARY KEY AUTO_INCREMENT,
    Periodo VARCHAR(50),
    Nota1 DECIMAL(5, 2),
    Nota2 DECIMAL(5, 2),
    Nota3 DECIMAL(5, 2),
    Nota4 DECIMAL(5, 2)
);
-- Crear tabla Curso
CREATE TABLE colegio.Curso (
    ID_Curso INT PRIMARY KEY AUTO_INCREMENT,
    Nombre_Curso VARCHAR(100) NOT NULL,
    Descripcion TEXT,
    Año INT
);
-- Crear tabla EXAlumno
CREATE TABLE colegio.EXAlumno (
    ID_EXAlumno double PRIMARY KEY AUTO_INCREMENT,
    ID_Documento double,
    Nombre VARCHAR(100) NOT NULL,
    Fecha_Nacimiento DATE,
    Direccion VARCHAR(255),
    Telefono VARCHAR(255),
    Correo_Electronico VARCHAR(100),
FOREIGN KEY (ID_Documento) REFERENCES colegio.tipo_documento(ID_Documento)
);
CREATE TABLE colegio.Materias (
    ID_Materias INT PRIMARY KEY AUTO_INCREMENT,
    ID_Curso INT,
    ID_EXAlumno double,
    ID_Profesor INT,
    Creditos INT,
    Nota DECIMAL(5, 2),
    Fecha_Inscripcion DATE,
    Nombre VARCHAR(100),
    Periodo VARCHAR(50),
    Estado_Aprobacion VARCHAR(50),
    FOREIGN KEY (ID_Curso) REFERENCES Curso(ID_Curso),
    FOREIGN KEY (ID_EXAlumno) REFERENCES EXAlumno(ID_EXAlumno),
    FOREIGN KEY (ID_Profesor) REFERENCES Profesor(ID_Profesor)
);

-- Crear tabla Certificado
CREATE TABLE colegio.Certificado (
    ID_Certificado INT PRIMARY KEY AUTO_INCREMENT,
    Fecha_Emision DATE,
    Detalles TEXT,
    ID_EXAlumno double,
    ID_Curso INT,
    FOREIGN KEY (ID_EXAlumno) REFERENCES EXAlumno(ID_EXAlumno),
    FOREIGN KEY (ID_Curso) REFERENCES Curso(ID_Curso)
);
