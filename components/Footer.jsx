import Image from "next/image";
import cargoBlack from "../images/cargo-black.svg";
import ActionsFooter from "./ActionsFooter";

const Footer = () => {
  return (
    <footer className="barge mb-10">
      <div className=" flex justify-between items-center">
        <p className="h2">Copyright 2023</p>
        <Image src={cargoBlack} alt="LinkBarge" width={44} height={37} />
      </div>
      <ActionsFooter />
    </footer>
  );
};

export default Footer;
