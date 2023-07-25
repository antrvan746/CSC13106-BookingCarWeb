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
}

interface UIUserDataItem {
  index: number,
  id: string;
  email: string | null;
  phone: string;
  name: string;
  is_vip: boolean;
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
        const handledData : UIUserDataItem[] = data.map(
          (item : UsersResponse, idx : number) => ({
            ...item,
            index: idx, 
          })
        )
        setUsers(handledData);
      }
    });
  }, []);

  const columns: GridColDef[] = [
    { field: "index", headerName: "Id", width: 50 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "name", headerName: "Name", width: 180 },
    { field: "phone", headerName: "Phone", width: 150 },
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
