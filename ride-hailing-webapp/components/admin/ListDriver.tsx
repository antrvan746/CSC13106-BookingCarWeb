import {
    DataGrid,
    GridColDef,
    GridEventListener,
    GridRowsProp,
    GridToolbarColumnsButton,
    GridToolbarContainer,
    GridToolbarExport,
    GridToolbarFilterButton,
  } from "@mui/x-data-grid";
  import React, { useEffect, useState } from "react";
  import styled from "styled-components";
  
  interface DriverResponse {
    id: string;
    phone: string;
    email: string | null;
    name: string;
  }
  
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
        <GridToolbarExport />
      </GridToolbarContainer>
    );
  };
  
  const ListDriver = () => {
    const [drivers, setDrivers] = useState<DriverResponse[]>([]);
  
    const fecthDrivers = async () => {
      const response = await fetch("/api/drivers");
      try {
        const data = response.json();
        return data;
      } catch (err) {
        console.log(err);
      }
    };
  
  
    const handleRowClick : GridEventListener<'rowClick'> = (params) => {
      
    }
  
    useEffect(() => {
      const fetchedDrivers = fecthDrivers();
      fetchedDrivers.then((data) => {
        if (data) {
          console.log(data)
          setDrivers(data);
        }
      });
    }, []);
  
    const columns: GridColDef[] = [
      { field: "id", headerName: "Id", width: 150 },
      { field: "email", headerName: "Email", width: 150 },
      { field: "name", headerName: "Name", width: 150 },
      { field: "phone", headerName: "Phone", width: 150 },
    ];
  
    return (
      <StyledContainer>
        <DataGrid
          rows={drivers}
          columns={columns}
          slots={{
            toolbar: CustomToolBar,
          }}
          pagination
          autoPageSize
          onRowClick={handleRowClick}
        />
      </StyledContainer>
    );
  };
  
  export default ListDriver;
  