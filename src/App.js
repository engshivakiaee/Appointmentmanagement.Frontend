import { Routes, Route } from 'react-router-dom';
import { React } from 'react';
import NavBar from './components/General/navbar';
import Home from './components/General/home';
import AgentList from './components/Agent/agent-list'
import BookAppointment from './components/Appointment/book-appointment';

const App = () => {

  return (
    <>
      <NavBar />
      <hr />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/agentList" element={<AgentList />} />
        <Route path="/bookAppointment/:agentAvailabilityId" element={<BookAppointment />} />
      </Routes>
    </>
  );
};

export default App;