import { Router } from 'express';
import animalController  from '../controllers/animals.js';

const router = Router();

// define routes and hook them up to appropriate controller functions

router.get('/animals', animalController.getAllAnimals);
router.get('/animals/:recNum', animalController.getAnimalByRecNumber);
router.get('/animals/rescue/:rescueType', animalController.getAnimalsByRescueType);
router.post('/animals', animalController.postAnimal);
router.put('/animals/:recNum', animalController.putAnimal);
router.delete('/animals/:recNum', animalController.deleteAnimal);

export default router;