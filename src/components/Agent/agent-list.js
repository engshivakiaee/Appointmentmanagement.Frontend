import { useState, useEffect, useCallback } from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Agent from './agent';
import AgentAvailabilityList from '../AgentAvailability/agent-availability-list';
import AgentListFilterBar from '../Agent/agent-list-filter-bar';
import { postAgentList } from '../../services/api-services';
import { getThisWeek } from '../../services/week-service';


const AgentList = () => {
  const [agentList, setAgentList] = useState([]);
  const [datesOfThisWeekDays, setDatesOfThisWeekDays] = useState([]);
  const [filters, setFilters] = useState({ agentId: null, from: null, to: null });

  const fetchAgentList = () => {
    postAgentList(filters)
      .then((response) => {
        setAgentList(response);
      })
      .catch((error) => {
        throw error;
      })
      .finally(() => {
      });
  };

  const handleAgentchange = (e) => {
    setFilters({ agentId: e.target.value == 0 ? null: e.target.value });
  };

  const handleFromChange = (e) => {
    setFilters((filters) => ({
      ...filters,
      from: e.target.value == "" ? null : e.target.value,
    }));
  }
  const handleToChange = (e) => {
    setFilters((filters) => ({
      ...filters,
      to: e.target.value == "" ? null : e.target.value,
    }));
  }
  const handleApplyFilter = (e) => {
    e.preventDefault();
    setAgentList([]);
    fetchAgentList();
  };

  useEffect(() => {
    setDatesOfThisWeekDays(getThisWeek());
    // fetchAgentList();
  }, []);

  return (
    <>
      <AgentListFilterBar
        onChangeAgent={handleAgentchange}
        onChangeFrom={handleFromChange}
        onChangeTo={handleToChange}
        onApplyFilters={handleApplyFilter}
        currentFilters={filters}
      />
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              {datesOfThisWeekDays && agentList.length !== 0
                &&
                datesOfThisWeekDays.map((date) =>
                  <TableCell width={200}>{date}</TableCell>
                )
              }
            </TableRow>
          </TableHead>
          <TableBody>
            {agentList
              &&
              agentList.map((agent) =>
                <TableRow key={agent.Id}>
                  <TableCell>
                    <Agent agent={agent} />
                  </TableCell>
                  {datesOfThisWeekDays.map((date) =>
                    < TableCell >
                      <AgentAvailabilityList agentavailabilitylist={agent.agentAvailabilityDtos} date={date} />
                    </TableCell>
                  )}
                </TableRow>
              )
            }
          </TableBody>
        </Table>
      </TableContainer >
    </>
  );
};

export default AgentList;
