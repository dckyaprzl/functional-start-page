import SearchInput from "./components/SearchInput";
import MacroMenu from "./components/MacroMenu";
import { useMacroHotKeys } from "./hooks/useMacroHotkeys";
import Ribbons from "./components/Ribbons/Ribbons";
import LightRays from './components/LightRays/LightRays';
import DailyQuote from "./components/DailyQuote";
import Clock from "./components/Clock";
import "./index.css";

function App() {
  useMacroHotKeys();

  return (
    <div className="app-wrapper">
      <div className="lightrays-background">
        <LightRays
          raysOrigin="top-center"
          raysColor="#ffffff"
          raysSpeed={1}
          lightSpread={0.5}
          rayLength={3}
          followMouse={true}
          mouseInfluence={0.2}
          noiseAmount={0}
          distortion={0}
          className="custom-rays"
          pulsating={false}
          fadeDistance={1}
          saturation={0.5}
        />
      </div>
      <div className="ribbons-background">
        <Ribbons
          baseThickness={30}
          colors={["#20861b", "#085807", "#4a8f58", "#085807", "#20861b"]}
          speedMultiplier={0.45}
          maxAge={400}
          enableFade={false}
          enableShaderEffect={false}
        />
      </div>
      <div className="app">
        <Clock />
        <DailyQuote />
        <SearchInput />
        <MacroMenu />
      </div>
    </div>

  );
}

export default App;