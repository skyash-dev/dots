import { useState } from "react";

function CreateNode({ setIsCreateNode, graphData, setGraphData }) {
  let id = graphData.nodes ? graphData.nodes.length : 0;
  const [note, setNote] = useState();
  const [target, setTarget] = useState();
  return (
    <div className="absolute top-0 bg-[#242424] z-10 w-full h-full flex flex-col gap-6 justify-center items-center bg-opacity-80 overflow-y-clip">
      <input
        type="text"
        placeholder="note"
        value={note}
        onChange={(e) => {
          setNote(e.target.value);
        }}
        className="rounded-lg px-4 w-[300px] py-2 outline-none text-[#242424]"
      />
      <input
        type="text"
        placeholder="connect to"
        value={target}
        onChange={(e) => {
          setTarget(Number(e.target.value));
        }}
        className="rounded-lg px-4 w-[300px] py-2 outline-none text-[#242424]"
      />
      <button
        className="mr-4 my-4 cursor-pointer bg-white text-[#242424] rounded-md px-3 py-1 hover:border-[#242424] hover:scale-x-110 transition-all border-2"
        onClick={() => {
          if (note.length > 0) {
            let newData = {
              node: { id: id, name: note },
              link: { source: id, target: target },
            };
            let newGraphData = {
              nodes: [...graphData.nodes, newData.node],
              links: [...graphData.links, newData.link],
            };
            setGraphData(newGraphData);
          }
          setIsCreateNode(false);
        }}
      >
        Create
      </button>
    </div>
  );
}

export default CreateNode;
