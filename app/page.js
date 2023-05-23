// @todo ADD ERROR HANDLING THROUGHOUT APP
"use client"
import { getLatestUsers } from "csc-start/utils/data";
import Link from "next/link";
import { useState } from "react";
export const revalidate = 20;


export default async function Home() {

  const [buttonText, setButtonText] = useState('Complete');

  const handleClick = () => {
    if (buttonText === 'Complete') {
      setButtonText('Incomplete');
    } else {
      setButtonText('Complete');
    }
  };


  return (
    <main className="barge">
      <h1 className="h1">Latest TODO Lists</h1>
      <div className="flex h2"> <p className="flex mx-auto">Title</p> <p className="flex mx-auto">Status</p> </div>
      <div className="flex">
        <div className="block mx-auto">
          <h3 className="my-5">Run 10 miles</h3>
          <h3 className="my-5">Read 15 pages</h3>
          <h3 className="my-5">Finish CSC 436 project 3</h3>
          <h3 className="my-5">Sleep</h3>
          <h3 className="my-5">Win The World Cup</h3>
        </div>
        <div className="block mx-auto">
          <button className=" button small" onClick={handleClick}>{buttonText}</button>
          <button className=" button small" onClick={handleClick}>{buttonText}</button>
          <button className=" button small" onClick={handleClick}>Incomplete</button>
          <button className=" button small" onClick={handleClick}>{buttonText}</button>
          <button className=" button small" onClick={handleClick}>{buttonText}</button>
        </div>

      </div>





    </main>
  )



}
