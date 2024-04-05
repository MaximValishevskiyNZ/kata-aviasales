import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchSearchIdAndTickets } from './features/tickets.js';
import Filter from './components/Filter/Filter.jsx';
import Logo from './components/Logo/Logo.jsx';
import TicketList from './components/TicketList/TicketList.jsx';
import './App.css';
import TicketsSorting from './components/TicketsSorting/TicketsSorting.jsx';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSearchIdAndTickets());
  }, [dispatch]);

  return (
    <>
      <div className="app-container">
        <Logo />
        <div className="tickets-search">
          <Filter />
          <div className="tickets-output">
            <TicketsSorting />
            <TicketList />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
