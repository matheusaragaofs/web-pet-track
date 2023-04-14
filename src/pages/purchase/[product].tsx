import HeaderMenu from "@/components/HeaderMenu";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from 'yup';
import { useRouter } from 'next/router'
const productsObject = {
    "gold-plan": {
        name: 'Ouro',
        value: 200,
        duration: '1 MÊS'
    },
    "platinum-plan": {
        name: 'Platina',
        value: 1000,
        duration: '6 MESES'
    },
    "diamond-plan": {
        name: 'Diamante',
        value: 1600,
        duration: '1 ANO'
    },
    "collar": {
        name: 'Coleira Rastreável',
        value: 300,

    },
    "battery-3800": {
        name: 'Bateria 3800mAh',
        value: 35,

    },
    "battery-6600": {
        name: 'Bateria 6600mAh',
        value: 60,

    },
    "nylon-clasp": {
        name: 'Fecho de Nylon',
        value: 4,

    }
}


const plans = [
    {
        id: 1, name: 'Básico',
        darkColor: '#746f6f',
        color: '#B7BABB',
        value: false, description: 'Serviço de rastreamento por tempo limitado, porém a localização da coleira é fornecida a cada dez minutos.'
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

const PurchasePage = () => {

    const validationSchema = Yup.object({
        card_number: Yup.string().required('Obrigatório'),
        card_holder: Yup.string().required('Obrigatório'),
        expiration_month: Yup.string().required('Obrigatório'),
        expiration_year: Yup.string().required('Obrigatório'),
        security_code: Yup.string().required('Obrigatório'),
    });

    const initialValues = {
        card_number: '',
        card_holder: '',
        expiration_month: '',
        expiration_year: '',
        security_code: ''
    };

    // Handle the form submission
    const onSubmit = (values: any) => {
        console.log(values);
    };
    type ProductType = 'gold-plan' | 'platinum-plan' | 'diamond-plan'

    const router = useRouter()
    const product = router.query.product as ProductType
    const currentProduct = productsObject[product]

    return (
        // <div className='d-flex bg-[#5F10DF] h-screen items-center justify-center w-full overflow-y-scroll'>
        <div className='d-flex  bg-gradient-to-r  from-[#4505a7] to-[#5312bd] h-screen items-center justify-center w-full overflow-y-scroll'>
            {/* <div className='text-3xl font-bold .'>Rastreie seu pet</div> */}
            <HeaderMenu showingOptions={true} selectedOption='plans' />
            <div className="flex items-center flex-col justify-center py-4 w-full h-full px-5 relative">
                <h1 className="text-3xl font-bold mb-4 text-white absolute left-10 top-10">Voltar</h1>
                <div
                    className="rounded-2xl relative shadow-md hover:shadow-lg
                   bg-gradient-to-r from-[#9a6ee2] to-[#6524e7]

                    transition duration-300"
                >
                    <div className="flex justify-evenly items-center flex-col py-20">
                        <h1 className="text-4xl font-bold text-white p-2">{currentProduct?.name}</h1>
                        <h1 className="text-2xl font-bold text-white p-2">R${currentProduct?.value},00</h1>
                        <span className="text-white font-bold text-lg text-center p-2 ">Rastreamento em tempo real</span>
                        <span className="text-white font-bold text-2xl ">{currentProduct?.duration}</span>
                    </div>
                    <Formik
                        initialValues={initialValues}
                        onSubmit={onSubmit}
                        validationSchema={validationSchema}
                    >
                        {({ errors, touched }) => (
                            <Form className="p-5 bg-gray-100 rounded-2xl min-h-[450px] relative" >
                                <div className="mb-4 ">
                                    <label
                                        className="block text-gray-700 text-sm font-bold mb-2"
                                        htmlFor="card_holder"
                                    >
                                        Nome no Cartão
                                    </label>
                                    <Field
                                        className={`${errors.card_holder && touched.card_holder
                                            ? 'border-red-500'
                                            : 'border-gray-300'
                                            } shadow appearance-none border rounded-xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                                        name="card_holder"
                                        type="text"
                                    />
                                    <ErrorMessage
                                        name="card_holder"
                                        component="div"
                                        className="text-red-500 text-xs italic mt-1"
                                    />
                                </div>

                                <div className="mb-4 ">
                                    <label
                                        className="block text-gray-700 text-sm font-bold mb-2"
                                        htmlFor="card_number"
                                    >
                                        Número
                                    </label>
                                    <Field
                                        className={`${errors.card_number && touched.card_number
                                            ? 'border-red-500'
                                            : 'border-gray-300'
                                            } shadow appearance-none border rounded-xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                                        name="card_number"
                                        type="text"
                                    />
                                    <ErrorMessage
                                        name="card_number"
                                        component="div"
                                        className="text-red-500 text-xs italic mt-1"
                                    />
                                </div>
                                <div className="flex space-x-10">
                                    <div className="mb-4 ">
                                        <label
                                            className="block text-gray-700 text-sm font-bold mb-2"
                                            htmlFor="card_number"
                                        >
                                            Mês
                                        </label>
                                        <Field
                                            className={`${errors.expiration_month && touched.expiration_month
                                                ? 'border-red-500'
                                                : 'border-gray-300'
                                                } shadow appearance-none border rounded-xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                                            name="expiration_month"
                                            type="text"
                                        />
                                        <ErrorMessage
                                            name="expiration_month"
                                            component="div"
                                            className="text-red-500 text-xs italic mt-1"
                                        />
                                    </div>
                                    <div className="mb-4 ">
                                        <label
                                            className="block text-gray-700 text-sm font-bold mb-2"
                                        >
                                            Ano
                                        </label>
                                        <Field
                                            className={`${errors.expiration_year && touched.expiration_year
                                                ? 'border-red-500'
                                                : 'border-gray-300'
                                                } shadow appearance-none border rounded-xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                                            name="expiration_year"
                                            type="text"
                                        />
                                        <ErrorMessage
                                            name="expiration_year"
                                            component="div"
                                            className="text-red-500 text-xs italic mt-1"
                                        />
                                    </div>
                                </div>

                                <div className="mb-4 w-1/3">
                                    <label
                                        className="block text-gray-700 text-sm font-bold mb-2"
                                    >
                                        CVV
                                    </label>
                                    <Field
                                        className={`${errors.security_code && touched.security_code
                                            ? 'border-red-500'
                                            : 'border-gray-300'
                                            } shadow appearance-none border rounded-xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                                        name="security_code"
                                        type="text"
                                    />
                                    <ErrorMessage
                                        name="security_code"
                                        component="div"
                                        className="text-red-500 text-xs italic mt-1"
                                    />
                                </div>
                                <div className="flex items-center justify-center h-20 ">
                                    <button

                                        className="
                                       bg-green-400
                                       hover:bg-green-600
                                       text-white
                                       transition-all
                                       duration-200
                                       font-bold py-2 px-12 rounded-xl focus:outline-none focus:shadow-outline"
                                        type="submit"
                                    >
                                        Comprar
                                    </button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </div >
    );
};

export default PurchasePage;
