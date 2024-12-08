import { useState } from "react";

function CreateNode({
  setIsCreateNode,
  graphData,
  setGraphData,
  modalRef,
  note,
  imageURL,
  target,
  setNote,
  setImageURL,
  setTarget,
  isEditable,
  id,
}) {
  return (
    <div className="absolute top-0 bg-[#242424] z-10 w-full h-full flex flex-col justify-center items-center bg-opacity-80 ">
      <div
        ref={modalRef}
        className="flex flex-col gap-6 justify-center items-center"
      >
        <span>id: {id}</span>
        <div className="flex flex-col">
          <span className="">note</span>
          <input
            contentEditable={isEditable}
            type="text"
            placeholder="i learn't calligraphy"
            value={note}
            onChange={(e) => {
              setNote(e.target.value);
            }}
            className="rounded-lg px-4 w-[300px] py-2 outline-none text-[#242424]"
          />
        </div>
        <div className="flex flex-col">
          <span className="">image</span>
          <input
            contentEditable={isEditable}
            type="text"
            placeholder="https://images.pexels.com/photos/28010646/pexels-photo-28010646/free-photo-of-a-building-with-a-red-door-and-a-green-plant.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            value={imageURL}
            onChange={(e) => {
              setImageURL(e.target.value);
            }}
            className="rounded-lg px-4 w-[300px] py-2 outline-none text-[#242424]"
          />
        </div>
        <div className="flex flex-col">
          <span className="">connect to id</span>
          <input
            contentEditable={isEditable}
            type="text"
            placeholder="2"
            value={target}
            onChange={(e) => {
              setTarget(Number(e.target.value));
            }}
            className="rounded-lg px-4 w-[300px] py-2 outline-none text-[#242424]"
          />
        </div>
        <button
          className="mr-4 my-4 cursor-pointer bg-white text-[#242424] rounded-md px-3 py-1 hover:border-[#242424] hover:scale-x-110 transition-all border-2"
          onClick={() => {
            if (note && imageURL) {
              let newData = {
                node: { id: id, name: note, img: imageURL },
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
    </div>
  );
}

export default CreateNode;
