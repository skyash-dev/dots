import DotsGraph from "../components/DotsGraph";

function Dots() {
  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <span className="text-lg my-1">Connect Dots</span>
        <DotsGraph></DotsGraph>
      </div>
    </>
  );
}

export default Dots;
