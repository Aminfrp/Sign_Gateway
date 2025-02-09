import { FaceStructureIcon } from "@/assets/images";
import { useEffect, useRef, useState } from "react";
import { STAGE, VideoVerificationFeatureProps } from "./contract.type";

export const VideoVerificationFeature: React.FC<
  VideoVerificationFeatureProps
> = (props) => {
  const { setVideoBlob, setStage } = props;
  const mediaRecorderRef = useRef<any>(null);
  const [recording, setRecording] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(true);
  const [hasPermission, setHasPermission] = useState(true);
  const [error, setError] = useState("");
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
        setSeconds((prevSeconds) => prevSeconds + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isActive]);

  const startRecording = () => {
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
    return (
      <p>
        Permission to access webcam is denied. Please allow access to use the
        webcam.
      </p>
    );
  }

  return (
    <div className="bg-black rounded-2xl flex flex-col overflow-hidden">
      <div className="flex-1 relative ">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          className="rounded-2xl overflow-hidden !max-w-full "
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
          </>
        ) : (
          <div className="text-white">{formatTime(seconds)}</div>
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
