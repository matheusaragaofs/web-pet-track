import HeaderMenu from "@/components/HeaderMenu";
import { baseUrl } from "@/config/api";
import Link from "next/link";

const plans = [
    {
        id: 1, name: 'Básico',
        darkColor: '#746f6f',
        color: '#B7BABB',
        value: false, description: 'Serviço de rastreamento por tempo limitado, porém a localização da coleira é fornecida a cada dez minutos.'
    },
    {
        type: 'gold-plan',
        id: 2, name: 'Ouro', darkColor: '#eba009',
        color: '#ffc226', value: '200', duration: '1 MÊS'
    },
    {
        type: 'platinum-plan',
        id: 5, name: 'Platina', darkColor: '#0E908F',
        color: '#01D7D5', value: '1000', duration: '6 MESES'
    },
    {
        type: 'diamond-plan',
        id: 6, name: 'Diamante', darkColor: '#18023a',
        color: '#7d3ce6', value: '1600', duration: '1 ANO'
    },
];

const PlansPage: React.FC = () => {
    return (
        <div className='d-flex    bg-gradient-to-r   from-[#4505a7] to-[#5312bd] h-screen items-center justify-center w-full overflow-y-scroll'>
            {/* <div className='text-3xl font-bold .'>Rastreie seu pet</div> */}
            <HeaderMenu showingOptions={true} selectedOption='plans' />
            <div className="container mx-auto py-4  px-5">
                <h1 className="text-3xl font-bold mb-4 text-white">Planos</h1>
                <div className="gap-4 flex justify-evenly items-center flex-wrap  w-full">
                    {plans.map((plan) => {
                        return (
                            <div
                                key={plan.id}
                                className="
                                bg-gradient-to-r from-[#9a6ee2] to-[#6524e7]

                                rounded-3xl relative shadow-md h-[420px] w-[260px]  hover:shadow-lg transition duration-300"
                            >
                                <div className="flex space-y-5 py-10 items-center flex-col h-2/3 ">
                                    <h1 className="text-4xl font-bold text-white">{plan.name}</h1>
                                    <h1 className="text-2xl font-bold text-white">R${plan.value},00</h1>
                                </div>
                                <div
                                    className='
                                    bg-gradient-to-r  from-[#230d43] to-[#321362]
                                    flex flex-col h-48 justify-between items-center px-5 bottom-0 absolute w-full rounded-3xl'>
                                    {plan.description ?
                                        <span className="text-white font-bold text-sm text-center m-auto p-2" > {plan.description} </span> : <>
                                            <span className="text-white font-bold text-lg text-center pt-5 px-3 ">Rastreamento em tempo real</span>
                                            <span className="text-white font-bold py-4 text-2xl ">{plan.duration}</span>
                                        </>
                                    }
                                    {plan.value &&

                                        <div className="flex items-center pb-5 justify-center  ">
                                            <Link href={`${baseUrl}/purchase/${plan.type}`}>
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
