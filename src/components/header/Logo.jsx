import { useNavigate } from "react-router-dom";

export default function Logo() {
  const navigate = useNavigate();

  return (
    <div className="text-xl flex items-center gap-2 font-bold tracking-tight relative">
      <button
        className="z-10 cursor-pointer bg-transparent border-none p-0 font-inherit"
        onClick={() => {
          navigate("/");
        }}
        aria-label="Navigate to home page"
      >
        <span className="text-[#00D8FF]">Cyber</span>{" "}
        <span className="drop-shadow-[0px_0px_5px_#00D8FF]">Hunter</span>
        <span className="text-[#00D8FF] font-medium">{"  "} X {"  "} </span>{" "}
        <span className="text-[#EC268F]">Qunatum</span>{" "}
        <span className="text-[#fff]">University</span>
      </button>
      <div className="h-40 w-40 bg-[#00D8FF] overflow-hidden absolute top-0 -translate-y-1/2 right-0 translate-x-1/4 rounded-full opacity-45 blur-2xl"></div>
    </div>
  );
}
