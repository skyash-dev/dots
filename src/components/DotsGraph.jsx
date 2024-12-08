import { useRef, useState, useEffect } from "react";
import { ForceGraph2D } from "react-force-graph";
import CreateNode from "./CreateNode";
import * as d3 from "d3-force";

function DotsGraph() {
  const [IsCreateNode, setIsCreateNode] = useState(false);
  const fgRef = useRef();
  const [graphData, setGraphData] = useState({
    nodes: [
      {
        id: 0,
        name: "zero",
      },
      { id: 1, name: "one" },
      { id: 2, name: "two" },
      { id: 3, name: "three" },
    ],
    links: [
      { source: 0, target: 2 },
      { source: 0, target: 3 },
      { source: 0, target: 1 },
    ],
  });

  const deleteNode = (node) => {
    let id = node.id;
    let nodes = [];
    let links = [];

    graphData.nodes.map((node) => {
      if (node.id != id) {
        nodes.push(node);
      }
    });
    graphData.links.map((link) => {
      if (link.source.id != id && link.target.id != id) {
        links.push(link);
      }
    });

    let newData = {
      nodes: nodes,
      links: links,
    };
    setGraphData(newData);
  };

  // Cache to store loaded images
  const imageCache = {};

  const loadImage = (url) => {
    if (imageCache[url]) {
      return imageCache[url]; // Return cached image if available
    }
    const img = new Image();
    img.src = url;
    imageCache[url] = img; // Cache the image
    return img;
  };

  // const drawNodeWithImage = (node, ctx) => {
  //   // Define the size of the image
  //   const imgSize = 40;

  //   // Load and draw the image
  //   const img = new Image();
  //   img.src = node.name;

  //   img.onload = () => {
  //     ctx.save();
  //     // Draw the image slightly below the node's center
  //     ctx.drawImage(img, node.x - imgSize / 2, node.y, imgSize, imgSize);
  //     ctx.restore();
  //   };
  // };

  const drawNodeWithImage = (node, ctx) => {
    const imgSize = 60;
    const img = loadImage(
      "https://images.pexels.com/photos/28010646/pexels-photo-28010646/free-photo-of-a-building-with-a-red-door-and-a-green-plant.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    );

    if (img.complete) {
      // If image is already loaded, draw it

      ctx.save();
      ctx.drawImage(img, node.x - imgSize / 2, node.y, imgSize, imgSize);
      ctx.restore();
    }
  };

  useEffect(() => {
    const forceGraph = fgRef.current;

    // Apply forces for node spacing
    forceGraph.d3Force("charge", d3.forceManyBody().strength(-500)); // Repulsion
    forceGraph.d3Force("link").distance(100); // Minimum link distance
  }, []);

  return (
    <>
      {IsCreateNode ? (
        <CreateNode
          setIsCreateNode={setIsCreateNode}
          graphData={graphData}
          setGraphData={setGraphData}
        />
      ) : null}
      <button
        style={{ marginLeft: 20 }}
        onClick={() => fgRef.current.zoomToFit(400)}
        className="mr-4 my-4 cursor-pointer bg-white text-[#242424] rounded-md px-3 py-1 hover:border-[#242424] hover:scale-x-110 transition-all border-2"
      >
        zoomToFit
      </button>
      <div>
        <ForceGraph2D
          ref={fgRef}
          graphData={graphData}
          linkColor={() => "rgba(255, 255, 255, 0.87)"}
          onBackgroundRightClick={() => setIsCreateNode(true)}
          width={1000}
          onNodeRightClick={deleteNode}
          nodeCanvasObject={(node, ctx) => {
            // Customize node rendering
            drawNodeWithImage(node, ctx);

            // Optionally draw default node (circle or something else)
            ctx.beginPath();
            ctx.arc(node.x, node.y, 5, 0, 2 * Math.PI, false);
            ctx.fillStyle = "blue";
            ctx.fill();
            ctx.strokeStyle = "white";
            ctx.stroke();
          }}
          nodePointerAreaPaint={(node, color, ctx) => {
            // Define pointer area for interactivity
            ctx.beginPath();
            ctx.arc(node.x, node.y, 20, 0, 2 * Math.PI, false);
            ctx.fillStyle = color;
            ctx.fill();
          }}
        />
      </div>
    </>
  );
}

export default DotsGraph;
