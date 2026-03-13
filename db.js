const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST || "bfjicnug7oezu3kse6nd-mysql.services.clever-cloud.com",
  user: process.env.DB_USER || "u97xo4utkbc3vyjy",
  password: process.env.DB_PASSWORD || "QiG9l8FM1wlVGPAHDvZk",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Initialise la base de données et la table au démarrage
const initDb = async () => {
    try {
        // 1. Connexion sans spécifier la BDD pour pouvoir la créer
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST || "bfjicnug7oezu3kse6nd-mysql.services.clever-cloud.com",
            user: process.env.DB_USER || "u97xo4utkbc3vyjy",
            password: process.env.DB_PASSWORD || "QiG9l8FM1wlVGPAHDvZk",
        });
        
        await connection.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\``);
        await connection.end();

        // 2. Maintentant que la BDD existe, on met à jour le pool avec la BDD
        pool.pool.config.connectionConfig.database = process.env.DB_NAME || "bfjicnug7oezu3kse6nd";
        
        const dbConnection = await pool.getConnection();
        await dbConnection.query(`USE \`${process.env.DB_NAME || "bfjicnug7oezu3kse6nd"}\``);
        await dbConnection.query(`
            CREATE TABLE IF NOT EXISTS appartement (
                numpapp INT AUTO_INCREMENT PRIMARY KEY,
                design VARCHAR(255) NOT NULL,
                loyer DECIMAL(10,2) NOT NULL
            )
        `);
        dbConnection.release();
        console.log("Base de données 'appartements_db' et table 'appartement' vérifiées/créées avec succès.");
    } catch (err) {
        console.error("Erreur lors de l'initialisation de la base de données :", err);
    }
};

initDb();

module.exports = pool;
