import { DataGrid, GridToolbar, GridToolbarColumnsButton, GridToolbarContainer, GridToolbarExport, GridToolbarFilterButton } from "@mui/x-data-grid";
import { useDemoData } from "@mui/x-data-grid-generator";
import React from "react";
import styled from "styled-components";

const StyledContainer = styled.div`
	background-color: #f9f9f9;
	border-radius: 5px;
	margin: 3rem 0.5rem 2rem 2rem;
`;

const CustomToolBar = () => {
	return (
		<GridToolbarContainer>
			<GridToolbarColumnsButton />
			<GridToolbarFilterButton />
			<GridToolbarExport/>
		</GridToolbarContainer>
	)
}

const ListUser = () => {
	const {data} = useDemoData({
		dataSet: 'Employee',
		rowLength: 10,
		maxColumns: 6
	})

	return (
        <StyledContainer>
			<DataGrid
				{...data}
				slots={{
					toolbar: CustomToolBar,
				}}
			/>

        </StyledContainer>    
    )
};

export default ListUser;
