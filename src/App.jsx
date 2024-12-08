import "./App.css";
import DotsGraph from "./components/DotsGraph";

function App() {
  return (
    <>
      <div className="h-screen flex flex-col justify-center items-center gap-4 absolute top-0 bottom-0 right-0 left-0 z-10">
        <span className="text-xl">welcome to</span>
        <h1 className="text-4xl font-bold">dots</h1>
        <div className="card ">
          <iframe
            className="w-[300px] h-[180px] md:w-[560px] md:h-[315px] "
            src="https://www.youtube.com/embed/UF8uR6Z6KLc?si=K08_niJijYQE_EUB&amp;start=288"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
          ></iframe>
        </div>
        <a href="/dots">
          <button className="bg-white text-[#242424] rounded-md px-3 py-2 hover:border-[#242424] hover:scale-x-110 transition-all border-2">
            connect dots!
          </button>
        </a>
        <span className="w-1/3 text-center text-sm opacity-50 cursor-pointer hover:opacity-80 transition-opacity">
          You can't connect the dots looking forward; you can only connect them
          looking backwards. So you have to trust that the dots will somehow
          connect in your future
        </span>
      </div>
      <div className="opacity-50">
        <DotsGraph isLanding={true} />
      </div>
    </>
  );
}

export default App;
