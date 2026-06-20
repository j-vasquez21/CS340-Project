-- Script of commands used to create the postgreSQL database 

DROP TABLE IF EXISTS animal_outcomes;

--  1. Table creation for animal outcomes
CREATE TABLE animal_outcomes (
    rec_num SERIAL PRIMARY KEY,
    age_upon_outcome VARCHAR(50),               
    animal_id VARCHAR(50),                      
    animal_type VARCHAR(50),                    
    breed VARCHAR(100),
    color VARCHAR(50),
    date_of_birth DATE,                        
    datetime TIMESTAMP,                         
    monthyear VARCHAR(50),                      
    name VARCHAR(100),
    outcome_subtype VARCHAR(50),
    outcome_type VARCHAR(50),
    sex_upon_outcome VARCHAR(50),
    latitude NUMERIC(9,6),                      
    longitude NUMERIC(9,6),                     
    age_upon_outcome_weeks NUMERIC(6,2)         
);

-- 2. used pgAdmin4 to import CSV data into table

EXPLAIN ANALYZE
SELECT * FROM animal_outcomes
WHERE breed IN ('Labrador Retriever Mix', 'Chesapeake Bay Retriever', 'Newfoundland')
  AND sex_upon_outcome = 'Intact Female'
  AND age_upon_outcome_weeks BETWEEN 26 AND 156;

-- Execution time: 2.693 ms

-- water rescue index creation
CREATE INDEX idx_rescue_type_water 
ON animal_outcomes (breed, sex_upon_outcome, age_upon_outcome_weeks)
WHERE breed IN ('Labrador Retriever Mix', 'Chesapeake Bay Retriever', 'Newfoundland')
  AND sex_upon_outcome = 'Intact Female'
  AND age_upon_outcome_weeks BETWEEN 26 AND 156;

-- after index creation
EXPLAIN ANALYZE
SELECT * FROM animal_outcomes
WHERE breed IN ('Labrador Retriever Mix', 'Chesapeake Bay Retriever', 'Newfoundland')
  AND sex_upon_outcome = 'Intact Female'
  AND age_upon_outcome_weeks BETWEEN 26 AND 156;

-- Execution time: 0.084 ms

-- mountain/wilderness rescue index creation
CREATE INDEX idx_rescue_type_Mountain_Wilderness 
ON animal_outcomes (breed, sex_upon_outcome, age_upon_outcome_weeks)
WHERE breed IN ('German Shepherd', 'Alaskan Malamute', 'Old English Sheepdog', 'Siberian Husky', 'Rottweiler')
  AND sex_upon_outcome = 'Intact Male'
  AND age_upon_outcome_weeks BETWEEN 26 AND 156;


-- disaster/individual tracking index creation
CREATE INDEX idx_rescue_type_disaster_individual_tracking 
ON animal_outcomes (breed, sex_upon_outcome, age_upon_outcome_weeks)
WHERE breed IN ('Doberman Pinscher', 'German Shepherd', 'Golden Retriever', 'Bloodhound', 'Rottweiler')
  AND sex_upon_outcome = 'Intact Male'
  AND age_upon_outcome_weeks BETWEEN 20 AND 300;