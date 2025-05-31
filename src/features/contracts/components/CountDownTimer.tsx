import { secondsToHMS, toPersianDigits } from "@/lib/utils";
import { useEffect, useState } from "react";

type CountDownTimerProps = {
  initialMinute?: number;
  initialSeconds?: number;
  disableTimer?: () => void;
  styles?: React.CSSProperties;
};

const CountDownTimer = (props: CountDownTimerProps) => {
  const {
    initialMinute = 0,
    initialSeconds = 0,
    disableTimer,
    styles = {},
  } = props;
  const [minutes, setMinutes] = useState(initialMinute);
  const [seconds, setSeconds] = useState(initialSeconds);
  const [renderCounter, setRenderCounter] = useState(false);

  useEffect(() => {
    const initTime = secondsToHMS(initialSeconds);
    setMinutes(initTime.minute);
    setSeconds(initTime.second);
    setRenderCounter(true);
  }, [initialSeconds]);

  useEffect(() => {
    if (renderCounter) {
      let myInterval = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        }
        if (seconds === 0) {
          if (minutes === 0) {
            clearInterval(myInterval);
            disableTimer && disableTimer();
          } else {
            setMinutes(minutes - 1);
            setSeconds(59);
          }
        }
      }, 1000);

      return () => {
        clearInterval(myInterval);
      };
    }
  });

  return (
    <div className="flex items-center border rounded-2xl min-w-42 justify-center h-14 mt-9 mb-auto flex-1">
      {minutes === 0 && seconds === 0 ? (
        <span>
          {minutes === 0 && seconds === 0 && toPersianDigits("00:00")}
        </span>
      ) : (
        <div>
          <span>
            {minutes < 1
              ? `${toPersianDigits("00")}`
              : toPersianDigits(minutes)}
            :
            {seconds < 10
              ? seconds === 0
                ? `${toPersianDigits("00")}`
                : `${toPersianDigits(0)}${toPersianDigits(seconds)}`
              : toPersianDigits(seconds)}
          </span>
        </div>
      )}
    </div>
  );
};

export default CountDownTimer;
