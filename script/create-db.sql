-- 1. Creazione del Database
CREATE DATABASE [futuro-lab];
GO

USE [futuro-lab];
GO

-- 2. Creazione della tabella Personale
CREATE TABLE Personale (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Nome NVARCHAR(50) NOT NULL,
    Cognome NVARCHAR(50) NOT NULL,
    Societa NVARCHAR(100),
    DataInizio DATE,
    DataFine DATE
);
GO

-- 3. Creazione della tabella AnagraficaRifiuti
CREATE TABLE AnagraficaRifiuti (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Tipo NVARCHAR(100) NOT NULL,
    Descrizione NVARCHAR(MAX),
    LuogoProduzione NVARCHAR(255),
    DataProduzione DATE,
    Note NVARCHAR(MAX)
);
GO

-- 4. Creazione del Login (a livello di Server) e dell'Utente (a livello di Database)
-- Il Login serve per l'autenticazione, l'User per i permessi sul DB specifico.
USE [master];
GO

CREATE LOGIN [futurolab-user] WITH PASSWORD = N'futurolab-pwd';
GO

USE [futuro-lab];
GO

CREATE USER [futurolab-user] FOR LOGIN [futurolab-user];
GO

-- Assegnazione del ruolo db_owner
ALTER ROLE db_owner ADD MEMBER [futurolab-user];
GO