import {
  DataGrid,
  GridColDef,
  GridEventListener,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import UserView from "./UserView";

interface DriverResponse {
  id: string;
  phone: string;
  email: string | null;
  name: string;
}

interface UIDriverDataItem {
  id: string;
  phone: string;
  email: string | null;
  name: string;
  index: number;
}

const StyledContainer = styled.div`
  background-color: #f9f9f9;
  border-radius: 5px;
  margin: 3rem 0.5rem 2rem 2rem;
`;

const StyledMainView = styled.div`
  display: grid;
  grid-template-columns: 2.5fr 1.5fr;
  max-width: 1280px;
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

  const handleRowClick: GridEventListener<"rowClick"> = (params) => {};

  useEffect(() => {
    const fetchedDrivers = fecthDrivers();
    fetchedDrivers.then((data) => {
      if (data) {
        const handledData: UIDriverDataItem[] = data.map(
          (item: DriverResponse, idx: number) => ({
            ...item,
            index: idx,
          })
        );
        setDrivers(handledData);
      }
    });
  }, []);

  const columns: GridColDef[] = [
    { field: "index", headerName: "Id", width: 50 },
    { field: "email", headerName: "Email", width: 250 },
    { field: "name", headerName: "Name", width: 180 },
    { field: "phone", headerName: "Phone", width: 150 },
  ];

  return (
    <StyledMainView>
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
      <UserView name="" phone="" email="" rating={5} rides={[]} />
    </StyledMainView>
  );
};

export default ListDriver;
