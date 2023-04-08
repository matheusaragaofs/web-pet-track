import HeaderMenu from "@/components/HeaderMenu";
import Link from "next/link";

const products: IProduct[] = [
    {
        id: 1,
        name: 'Coleira Rastreadora',
        darkColor: '#0DAFE2',
        color: '#66DAFF',
        description: 'Feita com nylon e malha de poliéster, proporcionando mais conforto para o PET,  diversos tamanhos e cores. Além disso, um mini rastreador portátil, com bateria removível, fica embutido numa região da coleira escolhida pelo cliente.',
        value: '300',
    },
    {
        id: 2,
        name: 'Bateria 3800mAh',
        darkColor: '#4811A2',
        color: '#5F10DF',
        description: 'Bateria recarregável de íon de lítio de 3800mAh.',
        value: '35',
    },
    {
        id: 3,
        name: 'Bateria 6600mAh',
        darkColor: '#4811A2',
        color: '#5F10DF',
        description: 'Bateria recarregável de íon de lítio de 6600mAh.',
        value: '60',
    },

    {
        id: 5,
        name: 'Fecho de Nylon',
        darkColor: '#008E8D',
        color: '#01D7D5',
        description: 'Fecho engate rápido para coleiras em cores variadas.',
        value: '4',
    },

];


interface IProduct {
    id: number,
    name: string,
    color: string,
    darkColor: string,
    description: string,
    value: string,
}
const renderProduct = ({ id, name, color, darkColor, description, value }: IProduct) => (
    <div
        key={id}
        style={{ backgroundColor: color }}
        className="m-auto bg-white rounded-3xl relative shadow-md h-[500px] w-64 sm:w-[460px] md:w-[500px] lg:w-[500px] hover:shadow-lg transition duration-300"
    >
        <div className="flex justify-evenly items-center flex-col h-2/3 ">
            <h1 className="text-xl lg:text-4xl font-bold text-white text-center">{name}</h1>
            <h1 className="text-xl lg:text-2xl font-bold text-white ">R${value},00</h1>
            <div className="flex justify-center items-center">
                <img src={'https://source.unsplash.com/random/400x400?dog'} alt={'-'} className="w-32 h-32  object-cover " />
            </div>
        </div>
        <div
            style={{ backgroundColor: darkColor }}
            className='flex flex-col h-40 justify-center items-center px-5 bottom-0 absolute w-full rounded-3xl'>
            <span className="text-white font-bold  text-xs lg:text-sm text-center p-5 ">{description}</span>
        </div>
    </div>
)


const ProductsPage: React.FC = () => {
    return (
        <div className='d-flex bg-white h-screen items-center justify-center w-full overflow-y-scroll'>
            {/* <div className='text-3xl font-bold .'>Rastreie seu pet</div> */}
            <HeaderMenu showingOptions={true} selectedOption='products' />
            <div className="container mx-auto py-4  px-5">
                <h1 className="text-3xl font-bold mb-4 text-[#4811A2]">Produtos</h1>
                <div className="gap-4 grid grid-cols-1 justify-evenly items-center  w-full">
                    {products.map((product) => renderProduct(product))}
                </div>
            </div>
        </div>
    );
};

export default ProductsPage;
