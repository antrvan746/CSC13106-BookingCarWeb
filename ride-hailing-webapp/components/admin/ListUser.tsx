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

interface UsersResponse {
  id: string;
  email: string | null;
  phone: string;
  name: string;
  is_vip: boolean;
  rating: number;
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

const ListUser = () => {
  const [users, setUsers] = useState<UsersResponse[]>([]);

  const fecthUsers = async () => {
    const response = await fetch("/api/users");
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
    const fetchedUsers = fecthUsers();
    fetchedUsers.then((data) => {
      if (data) {
        console.log(data)
        setUsers(data);
      }
    });
  }, []);

  const columns: GridColDef[] = [
    { field: "id", headerName: "Id", width: 150 },
    { field: "email", headerName: "Email", width: 150 },
    { field: "name", headerName: "Name", width: 150 },
    { field: "is_vip", headerName: "Vip member", width: 150 },
  ];

  return (
    <StyledContainer>
      <DataGrid
        rows={users}
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

export default ListUser;
