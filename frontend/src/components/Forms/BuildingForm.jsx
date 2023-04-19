import React, { useState } from 'react';
import { Box, TextField, Button } from "@mui/material";
import Grid2 from '@mui/material/Unstable_Grid2';
import { postBuilding } from '../../services/requests';
import { useQueryClient, useMutation } from 'react-query';
import { showSuccessSubmit, showErrorSubmit} from '../../../utils/react-toastify';

export const BuildingForm = () => {
    const [formBuilding, setFormBuilding] = useState({
        nomeEdificio: "",
        enderecoEdificio: "",
        qtdAndarEdificio: "",
        qtdApartPorAndar: ""
    });
    const handleChangeTextField = (e) => {
        const { name, value } = e.target;
        setFormBuilding((prevState) => ({
            ...prevState,
            [name]: value
        }))
        console.log(e.target.value);
    };
    const queryClient = useQueryClient();
    const { mutate, isLoading, isSuccess, isError, error, reset } = useMutation(
        postBuilding,
        {
            onSuccess: (data) => {
                const {nomeEdificio} = data;
                showSuccessSubmit(nomeEdificio)
                setFormBuilding({
                    nomeEdificio: "",
                    enderecoEdificio: "",
                    qtdAndarEdificio: "",
                    qtdApartPorAndar: ""
                })
            },
            onError: (error) => {
                console.error(error);
            },
            onSettled: () => {
                queryClient.invalidateQueries("management-apartments");
            },
        }
    );
    const handleSubmitBuilding = async (event) => {
        event.preventDefault();
        mutate(formBuilding);
    }
    return (
        <Box
            component="form"
            autoComplete="off"
            onSubmit={handleSubmitBuilding}
            sx={{ flexGrow: 1 }}
        >
            <Grid2 container spacing={2}>
                <Grid2 xs={12} sm={12} md={6} lg={6} xl={3}>
                    <TextField
                        name='nomeEdificio'
                        id="nomeEdificio"
                        label="Nome do edificio"
                        type='text'
                        value={formBuilding.nomeEdificio}
                        onChange={(e) => handleChangeTextField(e)}
                        error={isError && error?.response?.data?.errors.some((e) => e.path === 'nomeEdificio')}
                        helperText={
                            isError &&
                            error?.response?.data?.errors.find((e) => e.path === 'nomeEdificio')?.message
                        }
                    />
                </Grid2>
                <Grid2 xs={12} sm={12} md={6} lg={6} xl={3}>
                    <TextField
                        name='enderecoEdificio'
                        id="enderecoEdificio"
                        label="Endereço do edificio"
                        type='text'
                        value={formBuilding.enderecoEdificio}
                        onChange={(e) => handleChangeTextField(e)}
                        error={isError && error?.response?.data?.errors.some((e) => e.path === 'enderecoEdificio')}
                        helperText={
                            isError &&
                            error?.response?.data?.errors.find((e) => e.path === 'enderecoEdificio')?.message
                        }
                    />
                </Grid2>
                <Grid2 xs={12} sm={12} md={6} lg={6} xl={3}>
                    <TextField
                        name='qtdAndarEdificio'
                        id="qtdAndarEdificio"
                        label="Quantidade de andar"
                        type='number'
                        value={formBuilding.qtdAndarEdificio}
                        onChange={(e) => handleChangeTextField(e)}
                        error={isError && error?.response?.data?.errors.some((e) => e.path === 'qtdAndarEdificio')}
                        helperText={
                            isError &&
                            error?.response?.data?.errors.find((e) => e.path === 'qtdAndarEdificio')?.message
                        }
                    />
                </Grid2>
                <Grid2 xs={12} sm={12} md={6} lg={6} xl={3}>
                    <TextField
                        name='qtdApartPorAndar'
                        id="qtdApartPorAndar"
                        label="Quantidade de apartamento"
                        type='number'
                        value={formBuilding.qtdApartPorAndar}
                        onChange={(e) => handleChangeTextField(e)}
                        error={isError && error?.response?.data?.errors.some((e) => e.path === 'qtdApartPorAndar')}
                        helperText={
                            isError &&
                            error?.response?.data?.errors.find((e) => e.path === 'qtdApartPorAndar')?.message
                        }
                    />
                </Grid2>
                <Grid2 xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Button type="submit" variant="contained"
                        color="primary" disabled={isLoading}>
                        {isLoading ? 'Enviando...' : 'Enviar'}
                    </Button>
                </Grid2>
            </Grid2>
        </Box>
    )
}
