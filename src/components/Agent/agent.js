import * as React from 'react';
import Box from '@mui/material/Box';
import { getAgentImage } from '../../services/image-service';

const Agent = (props) => {
    return (
        <Box
            key={props.agent.id}
            sx={{
                width: 300,
                height: 300,
            }}
        >
            <img src={getAgentImage(props.agent.id)}></img>
            <br />
            {`${props.agent.firstName} ${props.agent.lastName}`}
            <br />
            {props.agent.phoneNumber}
        </Box>
    );
};

export default Agent;

