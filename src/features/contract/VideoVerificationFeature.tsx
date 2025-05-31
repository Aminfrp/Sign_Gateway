import { FaceStructureIcon } from "@/assets/images";
import { useEffect, useRef, useState } from "react";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { useGetFVCaptcha } from "./contract.hooks";
import { STAGE, VideoVerificationFeatureProps } from "./contract.type";

export const VideoVerificationFeature: React.FC<
  VideoVerificationFeatureProps
> = (props) => {
  const { setVideoBlob, setStage, setTrackerId } = props;

  const { data: fvCaptcha } = useGetFVCaptcha();
  const mediaRecorderRef = useRef<any>(null);
  const [recording, setRecording] = useState(false);
  const [seconds, setSeconds] = useState(30);
  const [isActive, setIsActive] = useState(true);
  const [hasPermission, setHasPermission] = useState(true);
  const [error, setError] = useState("");

  const [currentArrowIndex, setCurrentArrowIndex] = useState<number>(0);
  const [arrowTimeout, setArrowTimeout] = useState<null | number>(null);

  const videoRef = useRef(null);
  useEffect(() => {
    const startWebcam = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "user" },
        });
        if (videoRef.current) {
          (videoRef.current as any).srcObject = stream;
        }
      } catch (err) {
        setHasPermission(false);
        console.error("Error accessing webcam:", err);
      }
    };

    startWebcam();
    return () => {
      if (videoRef.current && (videoRef.current as any).srcObject) {
        const stream = (videoRef.current as any).srcObject;
        const tracks = stream.getTracks();
        tracks.forEach((track: any) => track.stop());
      }
    };
  }, []);

  useEffect(() => {
    let interval: number | undefined;

    if (isActive) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isActive]);

  useEffect(() => {
    if (seconds === 0) {
      stopRecording();
      setTimeout(() => {
        setVideoBlob(null);
      }, 300);
    }
  }, [seconds]);

  useEffect(() => {
    if (fvCaptcha) {
      setTrackerId(fvCaptcha.tracker);
    }
  }, [fvCaptcha]);

  const startRecording = async () => {
    if (videoRef.current && (videoRef.current as any).srcObject) {
      const stream = (videoRef.current as any).srcObject;
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      setIsActive(true);

      const chunks: any = [];
      mediaRecorder.ondataavailable = (event) => {
        chunks.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: "video/webm" });
        setVideoBlob(blob);
        setStage(STAGE.VERIFICATION_VIDEO);
        chunks.pop();
      };

      mediaRecorder.start();
      setRecording(true);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      if (mediaRecorderRef.current.state !== "inactive") {
        mediaRecorderRef.current.stop();
        setRecording(false);
        setIsActive(false);
      }
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedSeconds = time % 60 < 10 ? `0${time % 60}` : time % 60;
    return `${formattedMinutes}:${formattedSeconds}`;
  };

  if (!hasPermission) {
    return <p>لطفا اجازه دسترسی به دوربین را بدهید</p>;
  }

  useEffect(() => {
    if (!fvCaptcha?.motionCaptcha) return;

    const arrowsList = fvCaptcha.motionCaptcha.split(",");

    const showNextArrow = (index: number) => {
      const delay = index === 0 ? 0 : 2000;
      const showTime = 1000;

      if (index < arrowsList.length) {
        setCurrentArrowIndex(index);

        const timeoutId = setTimeout(() => {
          setCurrentArrowIndex(-1);
          const nextTimeout = setTimeout(() => {
            showNextArrow(index + 1);
          }, 2000);
          setArrowTimeout(nextTimeout);
        }, showTime);

        if (arrowTimeout) clearTimeout(arrowTimeout);
        setArrowTimeout(timeoutId);
      }
    };

    showNextArrow(0);

    return () => {
      if (arrowTimeout) clearTimeout(arrowTimeout);
    };
  }, [fvCaptcha?.motionCaptcha, recording]);

  const arrowsList = fvCaptcha?.motionCaptcha.split(",");

  return (
    <div className="bg-black rounded-2xl flex flex-col overflow-hidden">
      <div className="flex-1 relative ">
        {recording &&
          arrowsList?.map((arrow, index) => (
            <span
              key={index}
              className={`absolute top-[40%] z-10 ${
                arrow === "L" ? "left-12" : "right-12"
              } transform -translate-x-1/2 -translate-y-1/2 ${
                index === currentArrowIndex ? "opacity-100 " : "opacity-0"
              } transition-opacity ease-in-out`}
            >
              {arrow === "L" ? (
                <FiArrowLeft size={35} color="white" />
              ) : (
                <FiArrowRight size={35} color="white" />
              )}
            </span>
          ))}

        <video
          ref={videoRef}
          autoPlay
          playsInline
          className="rounded-2xl overflow-hidden !max-w-full  transform scale-x-[-1]"
        ></video>
        <span className="absolute top-[10%] h-[50%] w-[25%]  left-1/2 transform -translate-x-1/2">
          <FaceStructureIcon />
        </span>
      </div>
      <div className="flex flex-col items-center gap-5 pt-3 pb-1 justify-between h-max">
        {!recording ? (
          <>
            <div className="text-white font-yekan-bold">ضبط ویدئو</div>
            <div className="text-white text-sm">
              صورت خود را داخل کادر قرار داده و دکمه ضبط را لمس کنید
            </div>
            <div className="flex gap-3">
              {arrowsList?.reverse()?.map((arrow, index) => (
                <div className="flex items-center text-white gap-3">
                  {index !== 0 && <span> - </span>}
                  <p className="text-white">{arrow === "L" ? "چپ" : "راست"}</p>
                </div>
              ))}
            </div>
          </>
        ) : (
          <>
            <div className="flex gap-3">
              <div className="flex gap-3">
                {arrowsList?.reverse()?.map((arrow, index) => (
                  <div className="flex items-center text-white gap-3">
                    {index !== 0 && <span> - </span>}
                    <p className="text-white">
                      {arrow === "L" ? "چپ" : "راست"}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className="text-white">{formatTime(seconds)}</div>
          </>
        )}
        {!recording ? (
          <div
            className={`size-12 min-w-12 min-h-12 ring ring-white bg-red-600
             rounded-full
             cursor-pointer`}
            onClick={startRecording}
          ></div>
        ) : (
          <div
            className={`size-12  bg-[#FFFFFF] rounded-full cursor-pointer flex justify-center items-center`}
            onClick={stopRecording}
          >
            <div className="size-4 bg-red-600 rounded"></div>
          </div>
        )}
      </div>
    </div>
  );
};
