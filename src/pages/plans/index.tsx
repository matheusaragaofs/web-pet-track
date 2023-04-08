import HeaderMenu from "@/components/HeaderMenu";
import { spawn } from "child_process";
import Link from "next/link";
import { FiEdit, FiEye } from "react-icons/fi";

interface Props {
    userName?: string,
    onLogout?: () => void
    showingOptions?: boolean
}
const plans = [
    {
        id: 1, name: 'Básico',
        darkColor: '#746f6f',
        color: '#B7BABB',
        value: false, description: 'Serviço de rastreamento por tempo limitado, porém a localização da coleira é fornecida a cada dez minutos.'
    },
    {
        id: 2, name: 'Ouro', darkColor: '#7a5001',
        color: '#e09813', value: '200', duration: '1 MÊS'
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
interface ColorObject {
    color: string;
    darkColor: string;
}

function generateRandomColor(): ColorObject {
    // Generate a random color in hexadecimal format
    const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);

    // Convert the color to RGB format
    const rgbColor = hexToRgb(randomColor);

    // Darken the color by reducing the RGB values
    const darkRgbColor = {
        r: Math.round(rgbColor.r * 0.5),
        g: Math.round(rgbColor.g * 0.5),
        b: Math.round(rgbColor.b * 0.5)
    };

    // Convert the dark color back to hexadecimal format
    const darkColor = rgbToHex(darkRgbColor);

    // Return the original color and the darker shade
    return { color: randomColor, darkColor };
}

// Helper function to convert a hexadecimal color to RGB format
function hexToRgb(hex: string) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);

    return { r, g, b };
}

// Helper function to convert an RGB color to hexadecimal format
function rgbToHex(rgb: { r: number; g: number; b: number }): string {
    const rHex = rgb.r.toString(16).padStart(2, '0');
    const gHex = rgb.g.toString(16).padStart(2, '0');
    const bHex = rgb.b.toString(16).padStart(2, '0');

    return '#' + rHex + gHex + bHex;
}



const PlansPage: React.FC<Props> = ({ userName, onLogout, showingOptions = true }) => {
    return (
        <div className='d-flex bg-[#4811A2] h-screen items-center justify-center w-full overflow-y-scroll'>
            {/* <div className='text-3xl font-bold .'>Rastreie seu pet</div> */}
            <HeaderMenu showingOptions={true} selectedOption='plans' />
            <div className="container mx-auto py-4  px-5">
                <h1 className="text-3xl font-bold mb-4 text-white">Planos</h1>
                <div className="gap-4 flex justify-evenly items-center flex-wrap  w-full">
                    {plans.map((plan) => {
                        const { color, darkColor } = generateRandomColor()
                        return (
                            <div
                                key={plan.id}
                                style={{ backgroundColor: plan.color }}
                                className="bg-white rounded-lg relative shadow-md h-[400px] w-[260px]  hover:shadow-lg transition duration-300"
                            >
                                <div className="flex justify-evenly items-center flex-col h-2/3 ">
                                    <h1 className="text-4xl font-bold text-white">{plan.name}</h1>
                                    <h1 className="text-2xl font-bold text-white">R${plan.value},00</h1>
                                </div>
                                <div
                                    style={{ backgroundColor: plan.darkColor }}
                                    className='flex flex-col h-40 justify-between items-center px-5 bottom-0 absolute w-full rounded-lg'>
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
