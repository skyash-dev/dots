import { useState } from "react";
import { ForceGraph2D } from "react-force-graph";

function DotsGraph() {
  const [graphData, setGraphData] = useState({
    nodes: [
      { id: 0, name: "zero" },
      { id: 1, name: "one" },
      { id: 2, name: "two" },
    ],
    links: [{ source: 0, target: 2 }],
  });

  return (
    <div>
      <ForceGraph2D
        graphData={graphData}
        linkColor={() => "rgba(255, 255, 255, 0.87)"}
      />
    </div>
  );
}

export default DotsGraph;
