import Image from "next/image";
import cargoWhite from '../images/cargo-white.svg'
import Link from 'next/link';

const Header = () => {
    return <header className="barge bg-black flex justify-between items-center">
        <Link href="/">
            <Image src={cargoWhite} alt={'LinkBarge'} height="79" width="79" />
        </Link>
        <p className="h1 text-white">
            <Link className="hover:text-brutal-yellow duration-300 transition-all" href="/">
                BARGE
            </Link>
        </p>
    </header>;
}

export default Header;