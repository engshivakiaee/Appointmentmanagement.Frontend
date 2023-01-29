import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TimeSlot from '../TimeSlot/timeslot';

const AgentAvailabilityList = (props) => {
    
    const agentAvailabilityFilteredByDate = props.agentavailabilitylist.filter(function (el) {
        return el.date.split('T')[0] === props.date;
    });

    return (
        <Box>
            {agentAvailabilityFilteredByDate
                && agentAvailabilityFilteredByDate.map((agentAvailability) =>
                    <Button variant="outlined"
                        href={`/bookAppointment/${agentAvailability.id}`}
                        key={agentAvailability.id}>
                        <TimeSlot timeSlot={agentAvailability.timeSlotDto}
                        />
                    </Button>
                )
            }
        </Box>
    );
};

export default AgentAvailabilityList;

