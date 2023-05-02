import React, { useState } from 'react';
import { Box, FormControl, FormHelperText, InputLabel, Select, MenuItem, Button } from "@mui/material";
import Grid2 from '@mui/material/Unstable_Grid2';
import { getAllBuildingFloor, getAllBuildingName, getAllApartmentNumber, postApartment } from '../../../services/requests';
import { useMutation, useQueries } from 'react-query';
import { showSuccessSubmit, showErrorSubmit } from '../../../../utils/react-toastify';
import apartmentAnimation from "../Apartment/animations/apartment-animation.json"
import { ResponsivePlayer } from '../../../styles/ResponsivePlayer';

export const ApartmentForm = () => {
  const [selectedBuilding, setSelectedBuilding] = useState("");
  const [selectedFloor, setSelectedFloor] = useState("");
  const [selectedApartment, setSelectedApartment] = useState("");

  const [buildingName, buildingFloor, numberApartment] = useQueries([
    { queryKey: ["buildingName"], queryFn: getAllBuildingName },
    { queryKey: ["buildingFloor", selectedBuilding], queryFn: () => getAllBuildingFloor(selectedBuilding), enabled: !!selectedBuilding },
    { queryKey: ["numberApartment", selectedBuilding, selectedFloor], queryFn: () => getAllApartmentNumber(selectedBuilding, selectedFloor), enabled: !!selectedBuilding && !!selectedFloor }
  ])
  const { data: buildingNameData, isLoading: buildingNameIsLoading } = buildingName;
  const { data: buildingFloorData, isLoading: buildingFloorIsLoading } = buildingFloor;
  const { data: numberApartmentData, isLoading: numberApartmentIsLoading } = numberApartment;

  const handleChangeSelectedBuilding = (e) => {
    const { value } = e.target;
    setSelectedBuilding(value);
    setSelectedFloor("");
    setSelectedApartment("");
  }

  const handleChangeSelectedFloor = (e) => {
    const { value } = e.target;
    setSelectedFloor(value);
  };

  const handleChangeSelectedApartment = (e) => {
    const { value } = e.target;
    setSelectedApartment(value);
  };

  const { mutate, isLoading: isSubmitting, isSuccess, isError, error, reset } = useMutation(
    (newApartment) => postApartment(selectedBuilding, newApartment),
    {
      onSuccess: (data) => {
        console.log("DATA: ", data)
        const { numeroApartamento } = data;
        showSuccessSubmit(`O apartamento ${numeroApartamento} foi criado.`);
        setSelectedBuilding("");
        setSelectedFloor("");
        setSelectedApartment("");
      },
      onError: (error) => {
        showErrorSubmit(error.response.data.message)
        console.error(error);
      }
    }
  );
  const handleSubmitApartment = (event) => {
    event.preventDefault();
    mutate({ andarApartamento: selectedFloor, numeroApartamento: selectedApartment });
  }
  const handleFieldReset = () => {
    setSelectedBuilding("");
    setSelectedFloor("");
    setSelectedApartment("");
  }

  return (
    <Box
      component="form"
      autoComplete="off"
      onSubmit={handleSubmitApartment}
      sx={{ mt: 5, display: 'flex', flexWrap: "wrap", justifyContent: 'center' }}
    >
      <Box>
        <ResponsivePlayer
          loop
          autoplay
          speed={2}
          src={apartmentAnimation}
        />
      </Box>
      <Grid2 container maxWidth="md" spacing={2}>
        <Grid2 xs={12} sm={12} md={12} lg={12} xl={12}>
          <FormControl
            fullWidth
            required
          >
            <InputLabel id="select-edificio-label">Edificio</InputLabel>
            <Select
              required
              labelId="select-edificio-label"
              id="select-edificio"
              value={selectedBuilding}
              onChange={handleChangeSelectedBuilding}
            >
              {buildingNameData?.map((building) => (
                <MenuItem key={building.id} value={building.id}>
                  {building.nomeEdificio}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>
              Edificio que deseja adicionar o apartamento
            </FormHelperText>
          </FormControl>
          <FormControl
            fullWidth
            required
          >
            <InputLabel id="select-andar-label">Andar</InputLabel>
            <Select
              labelId="select-andar-label"
              id="select-andar"
              value={selectedFloor}
              onChange={handleChangeSelectedFloor}
              disabled={!selectedBuilding}
            >
              {buildingFloorData?.map((floor) => (
                <MenuItem key={floor} value={floor}>
                  {floor}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>
              Andar que deseja adicionar o apartamento
            </FormHelperText>
          </FormControl>
          <FormControl
            fullWidth
            required
          >
            <InputLabel id="select-apartamento-label">Numero apartamento</InputLabel>
            <Select
              labelId="select-apartamento-label"
              id="select-apartamento"
              name="numeroApartamento"
              value={selectedApartment}
              onChange={handleChangeSelectedApartment}
              disabled={!selectedBuilding || !selectedFloor}
            >
              {numberApartmentData?.map((apartment) => (
                <MenuItem key={apartment} value={apartment}>
                  {apartment}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>
              Selecione o numero que deseja
            </FormHelperText>
          </FormControl>
        </Grid2>
        <Grid2 xs={12} sm={12} md={12} lg={12} xl={12}>
          <Button type="submit" variant="contained"
            color="primary" disabled={!selectedBuilding || !selectedFloor || !selectedApartment}>
            {isSubmitting ? 'Enviando...' : 'Enviar'}
          </Button>
          <Button
            variant="contained"
            color="inherit"
            sx={{ ml: 5 }}
            onClick={handleFieldReset}
          >
            Limpar
          </Button>
        </Grid2>
      </Grid2>
    </Box>
  )
}
