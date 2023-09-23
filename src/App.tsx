import { Outlet } from "react-router";

function App() {
  return (
    <div className="App">
      <div className="background"></div>
      <div className="container">
        {
          <Outlet/>
        }
      d</div>
    </div>
  );
}

export default App;
