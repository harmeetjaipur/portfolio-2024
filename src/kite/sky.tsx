import { useEffect, useRef } from "react";
import { fightRoster } from "../content";
import { KiteEngine, type FightStatus } from "./engine";

type SkyProps = {
  fight: boolean;
  sound: boolean;
  onCut: (id: string) => void;
  onStatus: (status: FightStatus) => void;
  onDone: () => void;
};

/** The canvas the kite flies on, plus the invisible handle you grab it by. */
const Sky: React.FC<SkyProps> = (props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const handleRef = useRef<HTMLButtonElement>(null);
  const engineRef = useRef<KiteEngine | null>(null);
  const latest = useRef(props);
  latest.current = props;

  useEffect(() => {
    const canvas = canvasRef.current;
    const handle = handleRef.current;
    if (!canvas || !handle) return;
    const engine = new KiteEngine(canvas, handle, {
      onCut: (id) => latest.current.onCut(id),
      onStatus: (status) => latest.current.onStatus(status),
      onDone: () => latest.current.onDone(),
    });
    engineRef.current = engine;
    engine.start();
    return () => {
      engine.destroy();
      engineRef.current = null;
    };
  }, []);

  useEffect(() => {
    const engine = engineRef.current;
    if (!engine) return;
    if (props.fight) engine.startFight(fightRoster);
    else engine.stopFight();
  }, [props.fight]);

  useEffect(() => {
    engineRef.current?.setSound(props.sound);
  }, [props.sound]);

  return (
    <>
      <canvas className="sky" ref={canvasRef} aria-hidden="true" />
      <button
        type="button"
        className="kite-handle"
        ref={handleRef}
        aria-label="Kite. Drag it anywhere, or use the arrow keys to fly it."
      />
    </>
  );
};

export default Sky;
