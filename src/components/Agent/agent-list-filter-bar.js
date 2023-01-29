import React from 'react';
import { Toolbar, Tooltip, IconButton, InputLabel, Box, Select, TextField, AppBar } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';

export default function AgentListFilterBar({
    onChangeAgent,
    onChangeFrom,
    onChangeTo,
    onApplyFilters,
    currentFilters,
}) {
    const { agentId, from, to } = currentFilters;
    const agents = [{ id: 1, name: 'Shiva Kiaee' }, { id: 2, name: 'Eva King' },];

    return (
        <AppBar position="static">
            <Toolbar style={{ flex: '1 1 auto', overflow: 'auto', padding: 20, display: 'block' }} >
                <form style={{ display: 'flex', textAlign: 'center' }} onSubmit={onApplyFilters}>
                    <div style={{ display: 'flex', textAlign: 'center', justifyContent: 'flex-start' }}>
                        <Box style={{ float: 'left' }}>
                            <TextField
                                name='from'
                                variant='outlined'
                                id='from'
                                type='date'
                                label='Date from'
                                onChange={onChangeFrom}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                value={from}
                                autoComplete='off'
                            />
                            <TextField
                                name='to'
                                variant='outlined'
                                id='to'
                                type='date'
                                label='Date to'
                                onChange={onChangeTo}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                autoComplete='off'
                                value={to}
                            />
                            <Select
                                native
                                labelId='agent-label'
                                id='agent'
                                name='agent'
                                label='Agent'
                                onChange={onChangeAgent}
                            >
                                <option key={0} value={0}>
                                    Select Agent
                                </option>
                                {agents.map((agent) => (
                                    <option key={agent.id} value={agent.id}
                                        defaultValue={agentId}>
                                        {agent.name}
                                    </option>
                                ))}
                            </Select>
                        </Box>
                    </div>

                    <Tooltip title="Apply Filter">
                        <IconButton
                            type='submit'
                            aria-label="filter"
                            size="medium"
                            data-utid="apply-filter"
                        >
                            <FilterListIcon />
                        </IconButton>
                    </Tooltip>
                </form>
            </Toolbar>
        </AppBar >
    );
}
