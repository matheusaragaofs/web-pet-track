import HeaderMenu from "@/components/HeaderMenu";
import { baseUrl } from "@/config/api";
import Link from "next/link";

const products: IProduct[] = [
    {
        id: 1,
        type: 'collar',
        name: 'Coleira Rastreadora',
        description: 'Coleira rastreável composta por  nylon e malha de poliéster, proporcionando mais conforto para o seu pet.',
        value: '300',
    },
    {
        id: 2,
        type: 'battery-3800',
        name: 'Bateria 3800mAh',
        description: 'Bateria recarregável de íon de lítio de 3800mAh.',
        value: '35',
    },
    {
        id: 3,
        type: 'battery-6600',
        name: 'Bateria 6600mAh',
        description: 'Bateria recarregável de íon de lítio de 6600mAh.',
        value: '60',
    },

    {
        id: 5,
        type: 'nylon-clasp',
        name: 'Fecho de Nylon',
        description: 'Fecho engate rápido para coleiras em cores variadas.',
        value: '4',
    },

];


interface IProduct {
    type: string,
    id: number,
    name: string,
    description: string,
    value: string,
}
const renderProduct = ({ id, name,  type, description, value }: IProduct) => (
    <div
        key={id}

        className="m-auto 
        bg-gradient-to-r from-[#9a6ee2] to-[#6524e7]

        rounded-3xl relative shadow-md h-[500px] w-64 sm:w-[460px] md:w-[500px] lg:w-[500px] hover:shadow-lg transition duration-300"
    >
        <div className="flex justify-evenly items-center flex-col h-2/3 ">
            <h1 className="text-xl lg:text-4xl font-bold text-white text-center">{name}</h1>
            <h1 className="text-xl lg:text-2xl font-bold text-white ">R${value},00</h1>
            <div className="flex justify-center items-center">
                <img src={'https://source.unsplash.com/random/400x400?dog'} alt={'-'} className="w-32 h-32  object-cover " />
            </div>
        </div>
        <div
            className='
            bg-gradient-to-r  from-[#230d43] to-[#321362]
            flex flex-col justify-center items-center px-5 bottom-0 absolute w-full rounded-3xl'>
            <span className="text-white font-bold  text-xs lg:text-sm text-center p-5 ">{description}</span>
            <div className="flex items-center pb-5 justify-center  ">
                <Link href={`${baseUrl}/purchase/${type}`}>
                    <button
                        className="
                                       bg-[#8166aa]
                                       hover:bg-green-400
                                       text-white
                                       transition-all
                                       duration-200
                                       font-bold py-2 px-12 rounded-xl focus:outline-none focus:shadow-outline"
                        type="submit"
                    >
                        Comprar
                    </button>
                </Link>
            </div>
        </div>
    </div>
)


const ProductsPage: React.FC = () => {
    return (
        <div className='d-flex bg-gradient-to-r  from-[#4505a7] to-[#5312bd] h-screen items-center justify-center w-full overflow-y-scroll'>
            {/* <div className='text-3xl font-bold .'>Rastreie seu pet</div> */}
            <HeaderMenu showingOptions={true} selectedOption='products' />
            <div className="container mx-auto py-4  px-5">
                <h1 className="text-3xl font-bold mb-4 text-white">Produtos</h1>
                <div className="gap-4 grid grid-cols-1 justify-evenly items-center  w-full">
                    {products.map((product) => renderProduct(product))}
                </div>
            </div>
        </div>
    );
};

export default ProductsPage;
