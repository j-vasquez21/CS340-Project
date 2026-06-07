import AnimalModel from '../models/animals.js';

// controller to handle request/response

const AnimalController = {
    getAllAnimals: async (req, res) => {
        try {
            const result = await AnimalModel.readAllAnimals();
            res.json(result);
        }
        catch (err) {
            console.error('Error in getAllAnimals controller: ', err);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    getAnimalByRecNumber: async (req, res) => {
        const { recNum } = req.params;
        try {
            const result = await AnimalModel.readAnimalByRecNumber(recNum);
            if (result) {
                res.json(result);
            } 
            else {
                res.status(404).json({ error: 'Animal not found' });
            }
        }
        catch (err) {
            console.error('Error in getAnimalByRecNumber controller: ', err);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    getAnimalsByRescueType: async (req, res) => {
        const { rescueType } = req.params;
        try {
            const result = await AnimalModel.readAnimalsByRescueType(rescueType);
            res.json(result);
        }
        catch (err) {
            console.error('Error in getAnimalsByRescueType controller: ', err);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    postAnimal: async (req, res) => {
        try {
            const result = await AnimalModel.createAnimal(req.body);
            if (result) {
                res.status(201).json(result);
            }
            else {
                res.status(400).json({ error: 'Bad Request' });
            }
        }
        catch (err) {
            console.error('Error in postAnimal controller: ', err);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    putAnimal: async (req, res) => {
        const { recNum } = req.params;
        try {
            const result = await AnimalModel.updateAnimal(recNum, req.body);    
            if (result) {
                res.json(result);
            }
            else {
                res.status(404).json({ error: 'Animal not found' });
            }
        }
        catch (err) {
            console.error('Error in putAnimal controller: ', err);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    deleteAnimal: async (req, res) => {
        const { recNum } = req.params;
        try {
            const result = await AnimalModel.deleteAnimal(recNum);
            if (result) {
                res.json({ message: 'Animal deleted successfully' });
            }
            else {
                res.status(404).json({ error: 'Animal not found' });
            }
        }
        catch (err) {
            console.error('Error in deleteAnimal controller: ', err);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

}

export default AnimalController;