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

interface UIDriverDataItem {
  id: string;
  phone: string;
  email: string | null;
  name: string;
  index: number;
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

const ListDriver = () => {
  const [drivers, setDrivers] = useState<DriverResponse[]>([]);

  const [driverName, setDriverName] = useState("");
  const [driverEmail, setDriverEmail] = useState("");
  const [driverPhone, setDriverPhone] = useState("");
  const [driverRidesHistory, setDriverRidesHistory] = useState<RideHistory[]>(
    []
  );
  const [driverRating, setDriverRating] = useState(5.0);

  const fetchDrivers = async () => {
    const response = await fetch("/api/drivers");
    try {
      const data = response.json();
      return data;
    } catch (err) {
      console.log(err);
    }
  };

  const fetchDriverRides = async (driverId: string) => {
    const response = await fetch(`/api/drivers/rides?driver_id=${driverId}`);
    try {
      const data = await response.json();
      return data;
    } catch (err) {
      console.log(err);
    }
  };

  const fetchDriverRating = async (driverId: string) => {
    const response = await fetch(`/api/drivers/rating?driver_id=${driverId}`);
    try {
      const data = await response.json();
      return data;
    } catch (err) {
      console.log(err);
    }
  };

  const handleRowClick: GridEventListener<"rowClick"> = async (params) => {
    const rides: RideHistoryResponse[] = await fetchDriverRides(params.row.id);
    const rating = await fetchDriverRating(params.row.id);
    if (params.row) {
      setDriverName(params.row.name);
      setDriverPhone(params.row.phone);
      setDriverEmail(params.row.email);
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
      setDriverRidesHistory(rideInfos);
    }
    if (rating) {
      setDriverRating(rating);
    }
  };

  useEffect(() => {
    const fetchedDrivers = fetchDrivers();
    try {
      fetchedDrivers.then((data) => {
        const handledData: UIDriverDataItem[] = data.map(
          (item: DriverResponse, idx: number) => ({
            ...item,
            index: idx,
          })
        );
        setDrivers(handledData);
      });
    } catch (err) {
      console.log(err);
    }
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
      <UserView
        name={driverName}
        phone={driverPhone}
        email={driverEmail}
        rating={driverRating}
        rides={driverRidesHistory}
      />
    </StyledMainView>
  );
};

export default ListDriver;
