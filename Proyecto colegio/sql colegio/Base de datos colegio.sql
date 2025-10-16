
CREATE DATABASE colegio;



CREATE TABLE colegio.Usuarios (
    idUsuarios INT AUTO_INCREMENT PRIMARY KEY,
    Nombre VARCHAR(100) NOT NULL,
    correo VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    reset_token_hash VARCHAR(150) DEFAULT NULL,
    reset_expires DATETIME DEFAULT NULL
);
 
CREATE TABLE colegio.tipo_documento (
    Tipo_documento INT AUTO_INCREMENT PRIMARY KEY,
    Nombre_Tipo VARCHAR(10) NOT NULL
    
);
Después creamos la tabla exalumnos
CREATE TABLE colegio.exalumno (
    ID_EXAlumno INT AUTO_INCREMENT PRIMARY KEY,
    Numero_Documento VARCHAR(20) NOT NULL UNIQUE,
    Tipo_documento INT DEFAULT NULL,
    Nombre VARCHAR(100) NOT NULL,
    Apellido VARCHAR(100) NOT NULL,
    Fecha_Nacimiento DATE DEFAULT NULL,
    Direccion VARCHAR(255) DEFAULT NULL,
    Telefono VARCHAR(255) DEFAULT NULL,
    Correo_Electronico VARCHAR(100) DEFAULT NULL,
    Numero VARCHAR(50) NOT NULL,
    Lugar_Expedicion VARCHAR(100) DEFAULT NULL,

    CONSTRAINT fk_exalumno_tipo_documento FOREIGN KEY (Tipo_documento)
        REFERENCES tipo_documento(Tipo_documento)
        ON UPDATE CASCADE
        ON DELETE SET NULL
);
Después se crea la tabla curso
CREATE TABLE colegio.curso (
    ID_Curso INT AUTO_INCREMENT PRIMARY KEY,
    Nombre_Curso VARCHAR(100) NOT NULL,
    Descripcion TEXT DEFAULT NULL,
    year INT DEFAULT NULL
);

CREATE TABLE colegio.base_materia (
    ID_Base_Materia INT AUTO_INCREMENT PRIMARY KEY,
    Creditos DOUBLE DEFAULT NULL,
    Nombre VARCHAR(50) DEFAULT NULL
);

CREATE TABLE colegio.materias (
    ID_EXAlumno INT NOT NULL,
    ID_Curso INT NOT NULL,
    ID_Base_Materia INT NOT NULL,
    Estado_Aprobacion VARCHAR(50) DEFAULT NULL,
    Nota DOUBLE DEFAULT NULL,
    PRIMARY KEY (ID_EXAlumno, ID_Curso, ID_Base_Materia),
    CONSTRAINT fk_materias_exalumno FOREIGN KEY (ID_EXAlumno)
        REFERENCES exalumno(ID_EXAlumno)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    CONSTRAINT fk_materias_curso FOREIGN KEY (ID_Curso)
        REFERENCES curso(ID_Curso)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    CONSTRAINT fk_materias_base_materia FOREIGN KEY (ID_Base_Materia)
        REFERENCES base_materia(ID_Base_Materia)
        ON UPDATE CASCADE
        ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE colegio.Registro (
    idRegistro INT AUTO_INCREMENT PRIMARY KEY,
    nom_Usuario VARCHAR(255) NOT NULL,
    Fecha_creacion DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    Id_Alumno INT NOT NULL,
    Descripcion VARCHAR(255) DEFAULT NULL
);
