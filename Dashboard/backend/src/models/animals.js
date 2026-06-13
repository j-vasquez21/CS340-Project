import Pool from '../db/db.js';

// model to interact with the database for animal-related operations

const AnimalModel = {

    // READ database queries

    readAllAnimals: async () => {
        try {
            const result = await Pool.query('SELECT * FROM animal_outcomes');
            return result.rows;
        } catch (err) {
            console.error('Error fetching animals:', err);
            throw err;
        }
    },

    readAnimalByRecNumber: async (recNum) => {
        try {
            const result = await Pool.query(
                {
                    name: 'fetch-animal-by-recnum',
                    // prepared statement
                    text: 'SELECT * FROM animal_outcomes WHERE rec_num = $1',
                    // value to replace $1
                    values: [recNum],
                }
            );
            return result.rows[0];
        } catch (err) {
            console.error('Error fetching animal by record number:', err);
            throw err;
        }
    },

    readAnimalsByRescueType: async (rescueType) => {

        // filter criteria based on rescue type
        let breeds = [];
        let sex = '';
        let minAge = 0;
        let maxAge = 0;

        // set filter criteria based on rescue type
        if (rescueType === 'Water') {
            breeds = ['Labrador Retriever Mix', 'Chesapeake Bay Retriever', 'Newfoundland'];
            sex = 'Intact Female';
            minAge = 26;
            maxAge = 156;
        } else if (rescueType === 'Mountain or Wilderness') {
            breeds = ['German Shepherd', 'Alaskan Malamute', 'Old English Sheepdog', 'Siberian Husky', 'Rottweiler'];
            sex = 'Intact Male';
            minAge = 26;
            maxAge = 156;
        } else if (rescueType === 'Disaster or Individual Tracking') {
            breeds = ['Doberman Pinscher', 'German Shepherd', 'Golden Retriever', 'Bloodhound', 'Rottweiler'];
            sex = 'Intact Male';
            minAge = 20;
            maxAge = 300;
        } else {
            // invalid rescue type
            throw new Error("Invalid rescue type: " + rescueType);
        }


        try {
            const result = await Pool.query(
                {
                    name: 'fetch-animals-by-rescue-type',
                    // prepared statement
                    text: 'SELECT * FROM animal_outcomes WHERE breed = ANY($1) AND sex_upon_outcome = $2 AND age_upon_outcome_weeks BETWEEN $3 AND $4',
                    // values to replace $1, $2, $3, and $4
                    values: [breeds, sex, minAge, maxAge]
                }
            )
            return result.rows;
        } catch (err) {
            console.error('Error fetching animals by rescue type:', err);
            throw err;
        }

    },

    // CREATE database queries

    createAnimal: async (animalData) => {
        // destruct animalData object 
        const {
            age_upon_outcome,
            animal_id,
            animal_type,
            breed,
            color,
            date_of_birth,
            datetime,
            monthyear,
            name,
            outcome_subtype,
            outcome_type,
            sex_upon_outcome,
            latitude,
            longitude,
            age_upon_outcome_weeks
        } = animalData;

        try {
            const result = await Pool.query(
                {
                    name: 'create-new-animal',
                    text: 'INSERT INTO animal_outcomes (age_upon_outcome, animal_id, animal_type, breed, color, date_of_birth, datetime, monthyear, name, outcome_subtype, outcome_type, sex_upon_outcome, latitude, longitude, age_upon_outcome_weeks) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15) RETURNING *',
                    values: [age_upon_outcome, animal_id, animal_type, breed, color, date_of_birth, datetime, monthyear, name, outcome_subtype, outcome_type, sex_upon_outcome, latitude, longitude, age_upon_outcome_weeks]
                }
            )
            return result.rows[0];
        } catch (err) {
            console.error('Error creating animal:', err);
            throw err;
        }
    },

    // UPDATE database queries

    updateAnimal: async (recNum, updatedData) => {
        // destruct updatedData object
        const {
            age_upon_outcome,
            animal_id,
            animal_type,
            breed,
            color,
            date_of_birth,
            datetime,
            monthyear,
            name,
            outcome_subtype,
            outcome_type,
            sex_upon_outcome,
            latitude,
            longitude,
            age_upon_outcome_weeks
        } = updatedData;

        try {
            const result = await Pool.query(
                {
                    name: 'update-existing-animal',
                    text: 'UPDATE animal_outcomes SET age_upon_outcome = $1, animal_id = $2, animal_type = $3, breed = $4, color = $5, date_of_birth = $6, datetime = $7, monthyear = $8, name = $9, outcome_subtype = $10, outcome_type = $11, sex_upon_outcome = $12, latitude = $13, longitude = $14, age_upon_outcome_weeks = $15 WHERE rec_num = $16 RETURNING *',
                    values: [age_upon_outcome, animal_id, animal_type, breed, color, date_of_birth, datetime, monthyear, name, outcome_subtype, outcome_type, sex_upon_outcome, latitude, longitude, age_upon_outcome_weeks, recNum]
                }
            );
            return result.rows[0];
        } catch (err) {
            console.error('Error updating animal:', err);
            throw err;
        }
    },

    // DELETE database queries

    deleteAnimal: async (recNum) => {
        try {
            const result = await Pool.query(
                {
                    name: 'delete-animal',
                    text: 'DELETE FROM animal_outcomes WHERE rec_num = $1 RETURNING *',
                    values: [recNum]
                }
            );
            return result.rows[0];
        } catch (err) {
            console.error('Error deleting animal:', err);
            throw err;
        }
    }

};

export default AnimalModel;