CREATE DATABASE IF NOT EXISTS Application_projet;

USE Application_projet;

-- Table pour les arrondissements de Paris
CREATE TABLE arrondissements (
    id_arrondissement INT PRIMARY KEY AUTO_INCREMENT,
    numero INT NOT NULL,
    nom VARCHAR(100) NOT NULL
);

-- Table pour les types d'établissements
CREATE TABLE types_etablissement (
    id_type INT PRIMARY KEY AUTO_INCREMENT,
    type VARCHAR(100) NOT NULL
);

-- Table pour les établissements
CREATE TABLE etablissements (
    id_etablissement INT PRIMARY KEY AUTO_INCREMENT,
    nom VARCHAR(255) NOT NULL,
    adresse VARCHAR(255) NOT NULL,
    code_postal VARCHAR(10) NOT NULL,
    id_arrondissement INT,
    id_type INT,
    latitude DECIMAL(9,6),
    longitude DECIMAL(9,6),
    telephone VARCHAR(20),
    site_web VARCHAR(255),
    note DECIMAL(3,2) CHECK (note >= 0 AND note <= 5),
    logo_url VARCHAR(255),
    FOREIGN KEY (id_arrondissement) REFERENCES arrondissements(id_arrondissement) ON DELETE CASCADE,
    FOREIGN KEY (id_type) REFERENCES types_etablissement(id_type)
);

-- Table des utilisateurs
CREATE TABLE users (
    id_user INT PRIMARY KEY AUTO_INCREMENT,
    nom VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL
);

-- Table des restaurants
CREATE TABLE restaurants (
    id_restaurant INT PRIMARY KEY AUTO_INCREMENT,
    id_etablissement INT,
    cuisine VARCHAR(100),
    prix_moyen DECIMAL(10,2),
    FOREIGN KEY (id_etablissement) REFERENCES etablissements(id_etablissement) ON DELETE CASCADE
);

-- Table des bars
CREATE TABLE bars (
    id_bar INT PRIMARY KEY AUTO_INCREMENT,
    id_etablissement INT,
    happy_hour BOOLEAN DEFAULT FALSE,
    capacite INT,
    prix_pinte DECIMAL(10,2),
    FOREIGN KEY (id_etablissement) REFERENCES etablissements(id_etablissement) ON DELETE CASCADE
);

-- Table des boîtes de nuit
CREATE TABLE boites_de_nuit (
    id_boite INT PRIMARY KEY AUTO_INCREMENT,
    id_etablissement INT,
    age_minimum INT CHECK (age_minimum >= 18),
    musique VARCHAR(100),
    prix_entree DECIMAL(10,2),
    FOREIGN KEY (id_etablissement) REFERENCES etablissements(id_etablissement) ON DELETE CASCADE
);

-- Table des avis
CREATE TABLE avis (
    id_avis INT PRIMARY KEY AUTO_INCREMENT,
    id_user INT NOT NULL,
    id_etablissement INT NOT NULL,
    note DECIMAL(3,2) CHECK (note >= 0 AND note <= 5),
    commentaire TEXT,
    date_avis TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_user) REFERENCES users(id_user) ON DELETE CASCADE,
    FOREIGN KEY (id_etablissement) REFERENCES etablissements(id_etablissement) ON DELETE CASCADE
);

-- Table des horaires d'ouverture des établissements
CREATE TABLE horaires (
    id_horaire INT PRIMARY KEY AUTO_INCREMENT,
    id_etablissement INT NOT NULL,
    jour ENUM('Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche') NOT NULL,
    heure_ouverture TIME NOT NULL,
    heure_fermeture TIME NOT NULL,
    FOREIGN KEY (id_etablissement) REFERENCES etablissements(id_etablissement) ON DELETE CASCADE
);

-- Table des favoris des utilisateurs
CREATE TABLE favoris (
    id_favori INT PRIMARY KEY AUTO_INCREMENT,
    id_user INT NOT NULL,
    id_etablissement INT NOT NULL,
    FOREIGN KEY (id_user) REFERENCES users(id_user) ON DELETE CASCADE,
    FOREIGN KEY (id_etablissement) REFERENCES etablissements(id_etablissement) ON DELETE CASCADE
);
