import { CountdownCircleTimer } from "react-countdown-circle-timer";

interface RestTimerProps {
  duration: number; // seconds
  isPlaying: boolean;
  onComplete?: () => void;
}

export const RestTimer = ({
  duration,
  isPlaying,

  onComplete,
}: RestTimerProps) => {
  return (
    <CountdownCircleTimer
      isPlaying={isPlaying}
      duration={duration}
      size={260}
      strokeWidth={8}
      colors={["#16a34a", "#facc15", "#dc2626"]}
      colorsTime={[duration, duration / 2, 0]}
      onComplete={() => {
        onComplete?.();
        return { shouldRepeat: false };
      }}
    >
      {({ remainingTime }) => (
        <div
          style={{
            fontSize: "24px",
            fontWeight: "bold",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            color: "black",
          }}
        >
          <span>Rest time:</span>
          <span>{remainingTime}s</span>
        </div>
      )}
    </CountdownCircleTimer>
  );
};
