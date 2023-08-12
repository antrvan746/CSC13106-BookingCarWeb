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
import UserView from "./UserView";

interface UsersResponse {
  id: string;
  email: string | null;
  phone: string;
  name: string;
  is_vip: boolean;
}

interface RideHistoryResponse {
  id: string;
  start_place_id: string;
  start_place_name: string;
  end_place_id: string;
  end_place_name: string;
  fee: number;
  vehicle: Vehicle;
}

interface Vehicle {
  plate_number: string;
  model: string;
  type: string;
}

interface UIUserDataItem {
  index: number;
  id: string;
  email: string | null;
  phone: string;
  name: string;
  is_vip: boolean;
}

interface RideHistory {
  id: string;
  vehicleType: string;
  startPlaceName: string;
  endPlaceName: string;
  fee: number;
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
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [userRidesHistory, setUserRidesHistory] = useState<RideHistory[]>([]);
  const [userRating, setUserRating] = useState(5.0);

  const fecthUsers = async () => {
    const response = await fetch("/api/users");
    try {
      const data = response.json();
      return data;
    } catch (err) {
      console.log(err);
    }
  };

  const fetchUserRides = async (userId: string) => {
    const response = await fetch(`/api/users/rides?user_id=${userId}`);
    try {
      const data = await response.json();
      return data;
    } catch (err) {
      console.log(err);
    }
  };

  const fetchUserRating = async (userId: string) => {
    const response = await fetch(`/api/users/rating?user_id=${userId}`);
    try {
      const data = await response.json();
      return data;
    } catch (err) {
      console.log(err);
    }
  };

  const handleRowClick: GridEventListener<"rowClick"> = async (params) => {
    const rides: RideHistoryResponse[] = await fetchUserRides(params.row.id);
    const rating = await fetchUserRating(params.row.id);

    if (params.row) {
      setUserName(params.row.name);
      setUserPhone(params.row.phone);
      setUserEmail(params.row.email);
    }
    if (rides) {
      const rideInfos: RideHistory[] = rides.map((item) => {
        return {
          id: item.id,
          vehicleType: item.vehicle.type,
          startPlaceName: item.start_place_name,
          endPlaceName: item.end_place_name,
          fee: item.fee,
        };
      });
      setUserRidesHistory(rideInfos);
    }
    if (rating) {
      setUserRating(rating);
    }
  };

  useEffect(() => {
    const fetchedUsers = fecthUsers();
    fetchedUsers.then((data) => {
      if (data) {
        const handledData: UIUserDataItem[] = data.map(
          (item: UsersResponse, idx: number) => ({
            ...item,
            index: idx,
          })
        );
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
    <StyledMainView>
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
      <UserView
        name={userName}
        phone={userPhone}
        email={userEmail}
        rating={userRating}
        rides={userRidesHistory}
      />
    </StyledMainView>
  );
};

export default ListUser;
