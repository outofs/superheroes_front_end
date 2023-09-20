import { Outlet } from 'react-router';

function App() {
  return (
    <div className="App">
      <div className="container">
        {
          <Outlet/>
        }
      </div>
    </div>
  );
}

export default App;
