import { StreamTheme, useCall } from "@stream-io/video-react-sdk";
import { useState } from "react";

interface CallUIProps {
  meetingName: string;
}

function CallUI({ meetingName }: CallUIProps) {
  const call = useCall();
  const [show, setShow] = useState<"lobby" | "call" | "ended">("lobby");
  const handleJoin = async () => {
    if (!call) return;
    await call.join();
    setShow("call");
  };
  const handleLeave = async () => {
    if (!call) return;
    await call.endCall();
    setShow("ended");
  };
  return (
    <StreamTheme className="h-full">
      {show === "lobby" && <p>Lobby</p>}
      {show === "call" && <p>Call in progress</p>}
      {show === "ended" && <p>Call has ended</p>}
    </StreamTheme>
  );
}

export default CallUI;
