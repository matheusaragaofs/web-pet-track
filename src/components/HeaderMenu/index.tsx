import Link from "next/link";
import { FiMenu, FiUser } from "react-icons/fi";

interface Props {
    userName?: string,
    onLogout?: () => void
    selectedOption?: 'my-collars' |  'my-plan' | 'chat' | 'plans' | 'products',
    showingOptions?: boolean
}

const options: { title: string, url: string }[] = [
    { title: 'minhas coleiras', url: 'my-collars' },
    // { title: 'meu plano', url: 'meu-plano' },
    { title: 'produtos', url: 'products' },
    { title: 'planos', url: 'plans' },
    // { title: 'chat', url: 'chat' },
]

const HeaderMenu: React.FC<Props> = ({ userName, onLogout, showingOptions = true, selectedOption }) => {
    return (
        <header className="mb-5 bg-white  sm:flex sm:justify-between sm:items-center sm:px-4 sm:py-5">
            <div className="flex items-center justify-between px-4 py-3 sm:p-0">
                <div className="flex items-center space-x-10">
                    <Link href="/">
                        <span className="text-black text-xl">
                            <span className="font-bold text-purple-900  ">confor</span>
                            <span >Track</span>
                            {/* <img
                                src="/conforTrack.png"
                                alt="ConforTrack"
                                className="h-6"
                            /> */}
                        </span>
                    </Link>
                    <div className="space-x-1"><span className="font-bold">Olá</span> <span> Matheus Aragão </span></div>
                </div>
                <div className="sm:hidden">
                    <button
                        type="button"
                        className="text-black hover:text-purple-800 focus:outline-none focus:text-gray-400"
                    >
                        <FiMenu className="h-6 w-6" />
                    </button>
                </div>
            </div>
            <nav className="px-2 pt-2 pb-4 sm:flex sm:p-0">
                {showingOptions &&
                    <>
                        {options?.map(({ title, url }, i) => (

                            <Link key={i} href={url}>
                                <span
                                    style={{ color: selectedOption === url ? "#4811A2" : 'black' }}
                                    className="block px-2 py-1 font-semibold rounded hover:text-purple-700 sm:mt-0 sm:ml-2">
                                    {title}
                                </span>
                            </Link>
                        ))}
                    </>
                }
                <div className="relative d-flex  text-left">
                    <span
                        className="inline-flex justify-center items-center w-full rounded-full h-8 px-3 text-black focus:outline-none focus:shadow-outline"
                    >
                        <FiUser className="h-4 w-4" />
                        <button className="ml-5 bg-[#4811A2] text-white rounded-2xl px-5 font-bold ">
                            <span>Sair</span>
                        </button>
                    </span>
                </div>
            </nav>
        </header>
    );
};

export default HeaderMenu;
