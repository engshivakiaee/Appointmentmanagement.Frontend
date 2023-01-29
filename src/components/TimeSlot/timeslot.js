import * as React from 'react';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const TimeSlot = (props) => {
    return (
        <Item style={{ width: 100 }}>{`${props.timeSlot.from.substring(0, 5)}-${props.timeSlot.to.substring(0, 5)}`}</Item>
    );
};

export default TimeSlot;
