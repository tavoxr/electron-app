# electron-app
  Aplicación de escritorio creada con electron y mysql.
  Creación de productos y ordernes de las mismas.
  DDL DE LA BASE DE DATOS DEL PROYECTO

CREATE DATABASE IF NOT EXISTS electron1;
USE electron1;

CREATE TABLE IF NOT EXISTS User(
idEmployee INT NOT NULL PRIMARY KEY,
name VARCHAR(100),  
password VARCHAR(45)
); 

CREATE TABLE IF NOT EXISTS Product(
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(100),
description VARCHAR(255),
price FLOAT,
inStock VARCHAR(3),
category VARCHAR(100) NOT NULL,
idEmployee INT NOT NULL,
-- CONSTRAINT FK_Product_Category FOREIGN KEY(idCategory) REFERENCES Category(id),
CONSTRAINT FK_Product_Employee FOREIGN KEY(idEmployee) REFERENCES User(idEmployee)
);

CREATE TABLE IF NOT EXISTS Orders(
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
idProduct INT NOT NULL,
idEmployee INT NOT NULL,
quantity INT DEFAULT 0,
CONSTRAINT FK_Orders_Product FOREIGN KEY(idProduct) REFERENCES Product(id),
CONSTRAINT FK_Orders_User FOREIGN KEY(idEmployee) REFERENCES User(idEmployee)
);


INSERT INTO User(idEmployee,name,password)VALUES
(123,'Gustavo Herrera', 'Evangelion012_'),
(456,'Carlos Guerra','Evangelion012_');


INSERT INTO Product(name, description,price, inStock,category,idEmployee)VALUES
('Dell Inspiron', 'Computadora de escritorio, 4GB RAM, 1TB. ',3500.90, 'Yes', 'Computadoras',123 ),
('Huawei p20', 'Camara 30mpx, huella digital, 80GB memoria interna',4500.00,'Yes', 'Celulares', 456),
('Mouse Optico', 'negro, inalambrico',350.00, 'No', 'Accesorios', 123);


INSERT INTO Orders(idProduct,idEmployee,quantity)VALUES
(1,123,10),
(2,123,30),
(3,456,5);
