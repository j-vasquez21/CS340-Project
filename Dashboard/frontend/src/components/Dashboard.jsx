import  { useState, useEffect } from 'react';
import { AllCommunityModule } from 'ag-grid-community';
import { AgGridReact, AgGridProvider } from 'ag-grid-react';
import axios from 'axios';
import Map from './Map';
import Chart from './Chart';

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
        { field: "latitude" },
        { field: "longitude" },
        { field: "age_upon_outcome_weeks" }
    ]);

    const [selectedAnimal, setSelectedAnimal] = useState(null);

    // fetch the data and set the state for row data on mount
    useEffect(() => {

        // if no rescue type filter is selected, show all data
        if (!selectedRescueType) {
            // make get request to backend api to fetch all animal data
            axios.get('http://localhost:3000/api/animals')
                .then((response) => {
                    setRowData(response.data); // set row data to response json data of all animals
                })
                .catch((error) => console.error('Error fetching data:', error));
            return;
        }

        // filter data based on rescue type filter
        axios.get(`http://localhost:3000/api/animals/rescue/${selectedRescueType}`)
            .then((response) => {
                setRowData(response.data);
            })
            .catch((error) => console.error('Error fetching data:', error));
    }, [selectedRescueType]);


    const onRowSelection = (event) => {
        const selectedNodes = event.api.getSelectedNodes();
        const selectedData = selectedNodes.map(node => node.data);
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