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

