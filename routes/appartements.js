const express = require('express');
const router = express.Router();
const pool = require('../db');

// Récupérer tous les appartements
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM appartement');
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur serveur lors de la récupération' });
  }
});

// Ajouter un appartement
router.post('/', async (req, res) => {
  const { design, loyer } = req.body;
  if (!design || loyer === undefined) {
    return res.status(400).json({ error: 'Les champs design et loyer sont requis' });
  }
  
  try {
    const [result] = await pool.query(
      'INSERT INTO appartement (design, loyer) VALUES (?, ?)',
      [design, loyer]
    );
    res.status(201).json({ 
      numpapp: result.insertId, 
      design, 
      loyer 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la création de l\'appartement' });
  }
});

// Modifier un appartement
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { design, loyer } = req.body;
  
  try {
    const [result] = await pool.query(
      'UPDATE appartement SET design = ?, loyer = ? WHERE numpapp = ?',
      [design, loyer, id]
    );
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Appartement non trouvé' });
    }
    
    res.json({ message: 'Appartement mis à jour', numpapp: parseInt(id), design, loyer });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la mise à jour' });
  }
});

// Supprimer un appartement
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  
  try {
    const [result] = await pool.query(
      'DELETE FROM appartement WHERE numpapp = ?',
      [id]
    );
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Appartement non trouvé' });
    }
    
    res.json({ message: 'Appartement supprimé avec succès' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la suppression' });
  }
});

module.exports = router;
