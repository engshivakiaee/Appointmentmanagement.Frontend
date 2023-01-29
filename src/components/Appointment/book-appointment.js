import { React, useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { TextField, Typography, Box, Button, Paper, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import Agent from '../Agent/agent';
import TimeSlot from '../TimeSlot/timeslot';
import { createAppointment, getAgentAvailabilityById } from '../../services/api-services';


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const BookAppointment = () => {
    const [appointment, setAppointment] = useState({});
    const [agentAvailability, setAgentAvailability] = useState({});
    const { agentAvailabilityId } = useParams();

    const navigate = useNavigate();

    const fetchAgentAvailabilityById = useCallback(async () => {
        try {
            const response = await getAgentAvailabilityById(agentAvailabilityId)
            setAgentAvailability(response);
            setAppointment((appointment) => ({ ...appointment, agentAvailabilityId }));
        } catch (error) {
            throw error;
        }
    }, []);

    useEffect(() => {
        fetchAgentAvailabilityById()
    }, [fetchAgentAvailabilityById]);

    const handleNameChange = (event) => {
        event.persist();
        setAppointment((appointment) => ({
            ...appointment,
            customerName: event.target.value,
        }));
    }

    const handleMessageChange = (event) => {
        event.persist();
        setAppointment((appointment) => ({
            ...appointment,
            customerMessage: event.target.value,
        }));
    }

    const handleSubmitAppointment = () => {
        setAppointment((appointment) => ({
            ...appointment,
            agentAvailabilityId,
        }));

        createAppointment(appointment)
            .then((appointmentId) => {
                alert('Your appointment has submitted successfully');
                navigate('../agentList');
            })
            .catch((error) => {
                if (error.response && error.response.data) {
                    const { data } = error.response;
                    const errMessage = data.errors ? `${data.title}\n---\n${Object.keys(data.errors)}` : `${data}`;
                    alert(errMessage);
                } else {
                    throw error;
                }
            })
            .finally(() => {
            });
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
                <Grid item xs={6} md={4}>
                    <Item>{agentAvailability.agentDto &&
                        <Agent agent={agentAvailability.agentDto} />
                    }
                        <br />
                        {agentAvailability.date &&
                            <Typography style={{ fontWeight: 'bold', float: 'left' }}>
                                {agentAvailability.date.split('T')[0]}
                            </Typography>
                        }
                        <br />
                        {agentAvailability.timeSlotDto &&
                            <TimeSlot timeSlot={agentAvailability.timeSlotDto} />
                        }
                    </Item>
                </Grid>
                <Grid item xs={6} md={8}>
                    <Item>
                        <Box
                            component="form"
                            sx={{
                                '& > :not(style)': { m: 1 },
                            }}
                            noValidate
                            autoComplete="off"
                        >
                            <TextField id="outlined-basic" label="Name" variant="outlined"
                                defaultValue={appointment.customerName}
                                onChange={handleNameChange} />
                            <TextField fullWidth label="Message" id="fullWidth"
                                defaultValue={appointment.customerMessage}
                                onChange={handleMessageChange} />
                            <Button variant='contained'
                                onClick={handleSubmitAppointment}
                            >Submit</Button>
                        </Box>
                    </Item>
                </Grid>
            </Grid>
        </Box>
    );
};

export default BookAppointment;
