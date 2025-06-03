import { CallControls, SpeakerLayout } from "@stream-io/video-react-sdk";
import Image from "next/image";
import Link from "next/link";

interface CallActiveProps {
  onLeave: () => void;
  meetingName: string;
}

function CallActive({ onLeave, meetingName }: CallActiveProps) {
  return (
    <div className="flex flex-col justify-between p-4 h-full text-white">
      <div className="bg-[#101213] rounded-full p-4 flex items-center gap-4">
        <Link
          href={"/"}
          className="flex items-center justify-center p-1 bg-white/10 rounded-full w-fit gap-x-2"
        >
          <Image src={"/logo.svg"} width={22} height={22} alt="logo" />
          <h4 className="text-base">{meetingName}</h4>
        </Link>
      </div>
      <SpeakerLayout />
      <div className="bg-[#101213] rounded-full px-4">
        <CallControls onLeave={onLeave} />
      </div>
    </div>
  );
}

export default CallActive;
