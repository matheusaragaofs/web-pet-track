import HeaderMenu from "@/components/HeaderMenu";
import Link from "next/link";

const plans = [
    {
        id: 1, name: 'Básico',
        darkColor: '#746f6f',
        color: '#B7BABB',
        value: false, description: 'Serviço de rastreamento por tempo limitado, porém a localização da coleira é fornecida a cada dez minutos.'
    },
    {
        id: 2, name: 'Ouro', darkColor: '#F0C513',
        color: '#FFDC26', value: '200', duration: '1 MÊS'
    },
    {
        id: 5, name: 'Platina', darkColor: '#0E908F',
        color: '#01D7D5', value: '1000', duration: '6 MESES'
    },
    {
        id: 6, name: 'Diamante', darkColor: '#18023a',
        color: '#7d3ce6', value: '1600', duration: '1 ANO'
    },
];

const PlansPage: React.FC = () => {
    return (
        <div className='d-flex bg-white h-screen items-center justify-center w-full overflow-y-scroll'>
            {/* <div className='text-3xl font-bold .'>Rastreie seu pet</div> */}
            <HeaderMenu showingOptions={true} selectedOption='plans' />
            <div className="container mx-auto py-4  px-5">
                <h1 className="text-3xl font-bold mb-4 text-[#4811A2]">Planos</h1>
                <div className="gap-4 flex justify-evenly items-center flex-wrap  w-full">
                    {plans.map((plan) => {
                        return (
                            <div
                                key={plan.id}
                                style={{ backgroundColor: plan.color }}
                                className="bg-white rounded-3xl relative shadow-md h-[400px] w-[260px]  hover:shadow-lg transition duration-300"
                            >
                                <div className="flex justify-evenly items-center flex-col h-2/3 ">
                                    <h1 className="text-4xl font-bold text-white">{plan.name}</h1>
                                    <h1 className="text-2xl font-bold text-white">R${plan.value},00</h1>
                                </div>
                                <div
                                    style={{ backgroundColor: plan.darkColor }}
                                    className='flex flex-col h-40 justify-between items-center px-5 bottom-0 absolute w-full rounded-3xl'>
                                    {plan.description ?
                                        <span className="text-white font-bold text-sm text-center p-2" > {plan.description} </span> : <>
                                            <span className="text-white font-bold text-lg text-center p-2 ">Rastreamento em tempo real</span>
                                            <span className="text-white font-bold text-2xl ">1 Mês</span>
                                        </>
                                    }
                                    {plan.value &&
                                        <span
                                            style={{ backgroundColor: plan.color }}
                                            className='flex space-x-5 rounded-3xl font-bold px-5 py-1 text-white mb-2'>
                                            <Link href={`my-collars/:id`}>
                                                Assinar
                                            </Link>
                                        </span>
                                    }
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    );
};

export default PlansPage;
