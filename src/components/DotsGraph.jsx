import { useRef, useState, useEffect } from "react";
import { ForceGraph2D } from "react-force-graph";
import CreateNode from "./CreateNode";
import * as d3 from "d3-force";

function DotsGraph() {
  const [isCreateNode, setIsCreateNode] = useState(false);
  const fgRef = useRef();
  const [note, setNote] = useState();
  const [imageURL, setImageURL] = useState();
  const [target, setTarget] = useState();
  const [isEditable, setIsEditable] = useState(true);
  const [graphData, setGraphData] = useState({
    nodes: [
      {
        id: 0,
        name: "zero",
        img: "https://images.pexels.com/photos/28010646/pexels-photo-28010646/free-photo-of-a-building-with-a-red-door-and-a-green-plant.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      },
      {
        id: 1,
        name: "one",
        img: "https://images.pexels.com/photos/28010646/pexels-photo-28010646/free-photo-of-a-building-with-a-red-door-and-a-green-plant.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      },
      {
        id: 2,
        name: "two",
        img: "https://images.pexels.com/photos/28010646/pexels-photo-28010646/free-photo-of-a-building-with-a-red-door-and-a-green-plant.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      },
      {
        id: 3,
        name: "three",
        img: "https://images.pexels.com/photos/28010646/pexels-photo-28010646/free-photo-of-a-building-with-a-red-door-and-a-green-plant.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      },
    ],
    links: [
      { source: 0, target: 2 },
      { source: 0, target: 3 },
      { source: 0, target: 1 },
    ],
  });
  const [id, setId] = useState(graphData.nodes ? graphData.nodes.length : 0);

  const deleteNode = (node) => {
    setId(node.id);
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

  const drawNodeWithImage = (node, ctx) => {
    const imgSize = 60;
    const img = loadImage(node.img);

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

  const modalRef = useRef();

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      console.log("fcuk");

      setIsCreateNode(false);
    }
  };

  useEffect(() => {
    if (isCreateNode) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      setIsCreateNode(false);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isCreateNode]);

  return (
    <>
      {isCreateNode ? (
        <CreateNode
          modalRef={modalRef}
          setIsCreateNode={setIsCreateNode}
          graphData={graphData}
          setGraphData={setGraphData}
          note={note}
          imageURL={imageURL}
          target={target}
          setNote={setNote}
          setImageURL={setImageURL}
          setTarget={setTarget}
          isEditable={isEditable}
          id={id}
        />
      ) : null}
      <div>
        <button
          style={{ marginLeft: 20 }}
          onClick={() => fgRef.current.zoomToFit(1000, 100)}
          className="mr-4 my-4 cursor-pointer bg-white text-[#242424] rounded-md px-3 py-1 hover:border-[#242424] hover:scale-x-110 transition-all border-2"
        >
          zoomToFit
        </button>
        <button
          style={{ marginLeft: 20 }}
          onClick={() => {
            setId(graphData.nodes ? graphData.nodes.length : 0);
            setNote("");
            setImageURL("");
            setIsEditable(true);
            setIsCreateNode(true);
          }}
          className="mr-4 my-4 cursor-pointer bg-white text-[#242424] rounded-md px-3 py-1 hover:border-[#242424] hover:scale-x-110 transition-all border-2"
        >
          New Dot
        </button>
      </div>
      <div>
        <ForceGraph2D
          ref={fgRef}
          graphData={graphData}
          linkColor={() => "rgba(255, 255, 255, 0.87)"}
          width={1000}
          onNodeRightClick={deleteNode}
          onNodeClick={(node) => {
            setId(node.id);
            setNote(node.name);
            setImageURL(node.img);
            setIsEditable(false);
            setIsCreateNode(true);
          }}
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
            const imgSize = 60;
            // Ensure clickable area is defined
            ctx.fillStyle = color;
            ctx.fillRect(
              node.x - imgSize / 2,
              node.y - imgSize / 2 + 30,
              imgSize,
              imgSize
            );
          }}
          enableNodeDrag={true}
        />
      </div>
    </>
  );
}

export default DotsGraph;
