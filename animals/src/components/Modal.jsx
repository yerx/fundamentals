import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

// in production, you need to trap focus in a modal

const Modal = ({ children }) => {
  // useRef allows you to create elements and then destroy them. You are always referring to the same element.
  const elRef = useRef(null);
  // if you don't have an element create a div
  if (!elRef.current) {
    const div = document.createElement("div");
    elRef.current = div;
  }

  useEffect(() => {
    // grab the modal
    const modalRoot = document.getElementById("modal");
    // then append the div
    modalRoot.appendChild(elRef.current);

    // at the end remove the div, the function will only run when the modal gets closed
    return () => modalRoot.removeChild(elRef.current);
    // juse want the effect to run once so after the function add ,[]
  }, []);

  // inside of the div you will have all of the children
  return createPortal(<div>{children}</div>, elRef.current);
};

export default Modal;
