# Rescue Animal Dashboard Backend

The backend serves to facilitate communication and data exchange between the user interface and the database via a REST API. The backend was created using ExpressJS and PostgreSQL was used for the database. An sql file is included in the backend/src/db directory with steps and queries to set up the PostgreSQL database locally. 

## Local Database Set Up

1. Create the database
2. Create the table 
3. Populate the table using the aac_shelter_outcomes.csv file from the cs340-project-dataset folder found in the root directory of this repository
4. Create indexes


## Create an .env file in the /backend directory

Use the .env file to hide sensitive information such as database credentials. The .env file may look as such:

```
DB_USER=user123
DB_PASSWORD=password123
DB_HOST=localhost
DB_PORT=db_port_number_here
DB_NAME=db_name_here
PORT=server_port_number_here
```

## Starting the Server

1. Open up a terminal shell and navigate to the /backend directory
2. Use the following command to install all necessary dependencies
```bash
 npm install
``` 
3. Use the following command to start the server
```bash 
npm run dev
```