import "./App.css";

function App() {
  return (
    <>
      <span>welcome to</span>
      <h1>dots</h1>
      <div className="card">
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/UF8uR6Z6KLc?si=K08_niJijYQE_EUB&amp;start=288"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerpolicy="strict-origin-when-cross-origin"
          allowfullscreen
        ></iframe>
      </div>
      <a href="/dots">
        <button>connect dots!</button>
      </a>
    </>
  );
}

export default App;
