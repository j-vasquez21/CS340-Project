import  { useState, useEffect } from 'react';
import { AllCommunityModule } from 'ag-grid-community';
import { AgGridReact, AgGridProvider } from 'ag-grid-react';

import Map from './Map';
import Chart from './Chart';
// temp data until backend is ready 
import data from '../data/sample-animals.json';

export default function Dashboard({ rescueTypes, selectedRescueType }) {
    // setup state for row data and columns
    const [rowData, setRowData] = useState([]);
    const [columnDefs, setColumnDefs] = useState([
        { field: "rec_num" },
        { field: "age_upon_outcome" },
        { field: "animal_id" },
        { field: "animal_type" },
        { field: "breed" },
        { field: "color" },
        { field: "date_of_birth" },
        { field: "datetime" },
        { field: "monthyear" },
        { field: "name" },
        { field: "outcome_subtype" },
        { field: "outcome_type" },
        { field: "sex_upon_outcome" },
        { field: "location_lat" },
        { field: "location_long" },
        { field: "age_upon_outcome_in_weeks" }
    ]);

    const [selectedAnimal, setSelectedAnimal] = useState(null);

    // fetch the data and set the state for row data on mount
    useEffect(() => {

        // switch to fetch when api is ready 
        // const data = async () => await fetch('/api/animals').then((response) => response.json()).catch((error) => console.error('Error fetching data:', error));

        // if no rescue type filter is selected, show all data
        if (!selectedRescueType) {
            setRowData(data);
            return;
        }

        // filter data based on rescue type filter
        const rescueTypePreferences = rescueTypes[selectedRescueType];
        const filteredData = data.filter((animal) => {
            const breedMatch = rescueTypePreferences.preferred_breeds.includes(animal.breed);
            const sexMatch = animal.sex_upon_outcome === rescueTypePreferences.preferred_sex;
            const ageMatch = animal.age_upon_outcome_in_weeks >= rescueTypePreferences.training_age[0] && animal.age_upon_outcome_in_weeks <= rescueTypePreferences.training_age[1];
            return breedMatch && sexMatch && ageMatch;
        })

        setRowData(filteredData);

    }, [selectedRescueType]);


    const onRowSelection = (event) => {
        const selectedNodes = event.api.getSelectedNodes();
        const selectedData = selectedNodes.map(node => node.data);
        // console.log('Selected data:', selectedData[0]); test
        setSelectedAnimal(selectedData[0]);
    }

    const modules = [AllCommunityModule];

    // table customization options
    const gridOptions = {
        pagination: true,
        paginationPageSize: 10,
        paginationPageSizeSelector: [10, 20 ],
        rowSelection: {
            mode: 'singleRow',
        }
    };

    // return the table component with row data and columns
    return (
        <AgGridProvider modules={modules}>
            <div className="table-container">
                <AgGridReact
                    rowData={rowData}
                    columnDefs={columnDefs}
                    gridOptions={gridOptions}
                    onRowSelected={onRowSelection}
                />
            </div>
            <hr/>
            <div className="graphics-container">
                <Chart rescueTypes={rescueTypes} selectedRescueType={selectedRescueType} rowData={rowData} />
                <Map selectedAnimal={selectedAnimal} />
            </div>
        </AgGridProvider>
    );
};