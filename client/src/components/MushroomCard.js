import React, { useState } from "react";
import { MonthsAvailable } from "./MonthsAvailable";
import { GiForkKnifeSpoon } from "react-icons/gi";
import { IoSkullOutline } from "react-icons/io5";
import { GoPencil } from "react-icons/go";
import { Link } from "react-router-dom";
import { DeleteModal } from "./DeleteModal";

export const MushroomCard = (props) => {
  const [showEdibleText, setShowEdibleText] = useState(false);
  const [showPoisonousText, setShowPoisonousText] = useState(false);
  const [showImage, setShowImage] = useState(true);

  /**
   * This method will show the edible or poisonous text when the user hovers over the image.
   * @param {string} trait - The trait to show text for.
   */
  function onHover(trait) {
    if (trait === "edible") {
      setShowImage(false);
      setShowEdibleText(true);
      setShowPoisonousText(false);
    } else if (trait === "poisonous") {
      setShowImage(false);
      setShowEdibleText(false);
      setShowPoisonousText(true);
    }
  }

  /**
   * This method will hide the edible or poisonous text when the user stops hovering over the image.
   * It will also show the image again.
   * @param {string} trait - The trait to hide text for.
   */
  function onLeave() {
    setShowImage(true);
    setShowEdibleText(false);
    setShowPoisonousText(false);
  }

  /**
   * This method will show the delete confirmation modal.
   */
  function showDeleteConfirmation() {
    let id = props.record._id;
    document.getElementById("modal-" + id).showModal();
  }

  return (
    <>
      <DeleteModal
        id={props.record._id}
        name={props.record.name}
        deleteRecord={props.deleteRecord}
        img={props.record.img}
      />
      <div className="flex flex-col min-h-[416px] h-96 w-64 bg-green-200 shadow-2xl z-[3] shadow-white/100">
        <div
          className={`${showImage ? "block" : "hidden"} h-48 w-full relative`}
        >
          <div className="absolute top-0 left-0 flex flex-col gap-1 m-1">
            <button
              className="btn btn-circle btn-sm  focus:outline-none bg-white opacity-70"
              onClick={() => showDeleteConfirmation()}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <Link to={`/edit/${props.record._id}`}>
              <button className="btn btn-circle btn-sm  focus:outline-none bg-white opacity-70">
                <GoPencil />
              </button>
            </Link>
          </div>
          <img src={props.record.img} alt="" className="h-48 w-full" />
        </div>

        <div
          className={`${showEdibleText ? "block" : "hidden"} p-3 shrink-0 h-48`}
        >
          {props.record.edible}
        </div>

        <div
          className={`${
            showPoisonousText ? "block" : "hidden"
          } p-3 shrink-0 h-48`}
        >
          {props.record.poisonous}
        </div>

        <div className="flex flex-col justify-between h-full">
          <div className="flex flex-col railway">
            <h4 className="text-2xl text-center self-center m-0 font-bold">
              {props.record.name}
            </h4>
            <p className="text-xs text-gray-500 italic self-center m-0 font-extralight">
              {props.record.binomial}
            </p>
          </div>
          <div className="grid grid-cols-2">
            <div
              className={`${
                props.record.edible.includes("Yes")
                  ? "hover:bg-green-500/75"
                  : "hover:bg-red-600/75"
              }`}
              onMouseEnter={() => onHover("edible")}
              onMouseLeave={onLeave}
            >
              <GiForkKnifeSpoon className="w-[128px] h-[104px]" />
            </div>
            <div
              className={`${
                props.record.poisonous.includes("Yes")
                  ? "hover:bg-red-600/75"
                  : "hover:bg-green-500/75"
              }`}
              onMouseEnter={() => onHover("poisonous")}
              onMouseLeave={onLeave}
            >
              <IoSkullOutline className="w-[128px] h-[104px]" />
            </div>
          </div>
          <div className="justify-self-end">
            <MonthsAvailable months={props.record.availability} />
          </div>
        </div>
      </div>
    </>
  );
};
