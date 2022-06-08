const { Router } = require('express');
const router = Router();
const { getTypeDb, setTypes } = require('./middleware/getTypes');
//GET: /types -> Obtenes todos los tipos de pokemon posibles
//En una primera instancia deberan traerlos desde pokeapi y guardarlos en su propia
//base de datos y luego utilizarlos desde alli
router.post('/', async (req, res) => {
  try {
    const tipardos = await setTypes();
    res.send(tipardos);
  } catch (error) {
    console.log(e);
  }
});

router.get('/', async (req, res) => {
  try {
    const type = await getTypeDb();
    type ? res.status(200).send(type) : res.status(404).send('Types not found');
  } catch (e) {
    throw new Error(e);
  }
});

module.exports = router;
