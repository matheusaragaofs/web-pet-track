import HeaderMenu from "@/components/HeaderMenu";
import Link from "next/link";
import { useRef, useState } from "react";
import { FiEdit, FiEye } from "react-icons/fi";
import { Modal } from 'react-responsive-modal';

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
const darkColor = 'rgb(61, 71, 95)'


const MyCollarsPage: React.FC<Props> = ({ userName, onLogout, showingOptions = true }) => {
    const [modalIsOpen, setIsOpen] = useState(false);
    const [currentColarName, setCurrentColarName] = useState('');

    function openModal(name: string) {
        setCurrentColarName(name)
        setIsOpen(true);
    }


    function closeModal() {
        setCurrentColarName('')
        setIsOpen(false);
    }

    const handleChangeCollarName = () => {
        // requistion to change colar name here
        setCurrentColarName('')
        closeModal()

    }

    return (
        <div className='d-flex bg-[#4811A2] h-screen items-center justify-center w-full overflow-y-scroll'>
            {modalIsOpen &&
                <Modal
                    open={modalIsOpen}
                    onClose={closeModal}
                    center

                >
                    <div className="p-10 flex items-center justify-center flex-col space-y-10"  >
                        <span className="text-2xl font-bold">{currentColarName}</span>
                        <input
                            placeholder="Selecione um nome..."
                            className={`border-gray-300' shadow appearance-none border rounded-3xl w-[1/2] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                        />
                        <button
                            onClick={handleChangeCollarName}
                            className="border-2 border-purple-900  hover:bg-purple-700 hover:text-white transition-all  text-purple-800 font-bold py-2 px-12 rounded-3xl focus:outline-none focus:shadow-outline"
                            type="submit"
                        >
                            Mudar nome
                        </button>
                    </div>
                </Modal>
            }
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
                                    <span className='flex space-x-5 '>
                                        <Link href={`my-collars/:id`}>
                                            <FiEye  className='icon' color="white" />
                                        </Link>
                                        <FiEdit 
                                        className="cursor-pointer transaition-all icon" onClick={() => openModal(collar.name)} color="white" />
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
