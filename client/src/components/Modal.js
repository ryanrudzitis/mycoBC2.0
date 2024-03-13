import React, { useRef } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { MonthsAvailable } from "./MonthsAvailable";
import { GiForkKnifeSpoon } from "react-icons/gi";
import { IoSkullOutline } from "react-icons/io5";
import { GoPencil } from "react-icons/go";
import "../index.css";
import { Link } from "react-router-dom";

export const Modal = (props) => {
  const edibleText = useRef(null);
  const poisonousText = useRef(null);
  const imageRef = useRef(null);

  function onHover(trait) {
    if (trait === "edible") {
      edibleText.current.style.display = "block";
      poisonousText.current.style.display = "none";
      imageRef.current.style.display = "none";
    } else if (trait === "poisonous") {
      edibleText.current.style.display = "none";
      poisonousText.current.style.display = "block";
      imageRef.current.style.display = "none";
    }
  }

  function onLeave() {
    edibleText.current.style.display = "none";
    poisonousText.current.style.display = "none";
    imageRef.current.style.display = "block";
  }

  function convertMonthToNumber(month) {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    return months.indexOf(month) + 1;
  }

  function convertArray(input) {
    var inputArray = input.split(", ");
    let output = [];

    for (let i = 0; i < inputArray.length; i++) {
      output[i] = convertMonthToNumber(inputArray[i]);
    }
    // console.log(output);
    return output;
  }

  function showDeleteConfirmation(props) {
    let id = props.record._id;
    let name = props.record.name;

    document.getElementById("my_modal_5").showModal();
  }

  return (
    <>
      
      <div className="flex flex-col min-h-[416px] h-96 w-64 bg-green-200 shadow-2xl z-[3] shadow-white/100">
        <div ref={imageRef} className="h-48 w-full image relative">
          <button
            className="btn btn-circle btn-sm absolute focus:outline-none bg-white opacity-70"
            onClick={() => showDeleteConfirmation(props)}
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
            <button className="btn btn-circle btn-sm absolute top-[33px] focus:outline-none bg-white opacity-70">
              <GoPencil />
            </button>
          </Link>
          <img src={props.record.img} className="h-48 w-full" />
        </div>
        <div ref={edibleText} className="hidden p-3 shrink-0 h-48 edible">
          {props.record.edible}
        </div>
        <div ref={poisonousText} className="hidden p-3 shrink-0 h-48 poisonous">
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
            <MonthsAvailable months={convertArray(props.record.availability)} />
          </div>
        </div>
      </div>
    </>
  );
};