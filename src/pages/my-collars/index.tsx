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



const MinhasColeirasPage: React.FC<Props> = ({ userName, onLogout, showingOptions = true }) => {
    return (
        <div className='d-flex bg-[#4811A2] h-screen items-center justify-center w-full overflow-y-scroll'>
            {/* <div className='text-3xl font-bold .'>Rastreie seu pet</div> */}
            <HeaderMenu showingOptions={true} selectedOption='my-collars' />
            <div className="container mx-auto py-4  px-5">
                <h1 className="text-3xl font-bold mb-4 text-white">Coleiras</h1>
                <div className="gap-4 flex justify-evenly items-center flex-wrap  w-full">
                    {collars.map((collar) => {
                        const { color, darkColor } = generateRandomColor()
                        return (
                            <div
                                key={collar.id}
                                style={{ backgroundColor: color }}
                                className="bg-white rounded-lg relative shadow-md h-56 w-[260px]  hover:shadow-lg transition duration-300"
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

export default MinhasColeirasPage;
