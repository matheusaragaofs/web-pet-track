import HeaderMenu from "@/components/HeaderMenu";
import Link from "next/link";
import { FiEdit, FiEye } from "react-icons/fi";

interface Props {
    userName?: string,
    onLogout?: () => void
    showingOptions?: boolean
}
const collars = [
    { id: 1, name: 'Collar 1', image: 'https://source.unsplash.com/random/400x400?dog' },
    { id: 2, name: 'Collar 2', image: 'https://source.unsplash.com/random/400x400?cat' },
    { id: 5, name: 'Collar 5', image: 'https://source.unsplash.com/random/400x400?bird' },
    { id: 6, name: 'Collar 6', image: 'https://source.unsplash.com/random/400x400?fish' },
];
interface ColorObject {
    color: string;
    darkColor: string;
}
const color = 'rgb(121, 141, 189)'
const darkColor ='rgb(61, 71, 95)'


const MyCollarsPage: React.FC<Props> = ({ userName, onLogout, showingOptions = true }) => {
    return (
        <div className='d-flex bg-[#4811A2] h-screen items-center justify-center w-full overflow-y-scroll'>
            <HeaderMenu showingOptions={true} selectedOption='my-collars' />
            <div className="container mx-auto py-4  px-5">
                <h1 className="text-3xl font-bold mb-4 text-white">Coleiras</h1>
                <div className="gap-4 flex justify-evenly items-center flex-wrap  w-full">
                    {collars.map((collar) => {
                        return (
                            <div
                                key={collar.id}
                                style={{ backgroundColor: color }}
                                className="rounded-lg relative shadow-md h-56 w-[260px]  hover:shadow-lg transition duration-300"
                            >
                                <div className="flex justify-center items-center h-2/3">
                                    <img src={collar.image} alt={collar.name} className="w-32 h-32  object-cover " />
                                </div>
                                <div
                                    style={{ backgroundColor: darkColor }}
                                    className='flex h-16 justify-between items-center px-5 bottom-0 absolute w-full rounded-lg'>
                                    <span className="text-white font-bold text-lg ">{collar.name}</span>
                                    <span className='flex space-x-5'>
                                        <Link href={`my-collars/:id`}>
                                            <FiEye color="white" />
                                        </Link>
                                        <FiEdit color="white" />
                                    </span>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    );
};

export default MyCollarsPage;
