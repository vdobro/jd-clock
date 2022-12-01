import { Timer } from "./components/timer";

const standardTime = 5 * 60;

function App() {
  return (
    <>
      <div className="container">
        <Timer startTime={standardTime} name="Už 1" color="green"/>
        <Timer startTime={standardTime} name="Prieš 1" color="darkred"/>
      </div>
      <div className="container">
        <Timer startTime={standardTime} name="Už 2" color="green"/>
        <Timer startTime={standardTime} name="Prieš 2" color="darkred"/>
      </div>
    </>
  );
}

export default App;
