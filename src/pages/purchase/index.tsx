import HeaderMenu from "@/components/HeaderMenu";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from 'yup';

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


    return (
        <div className='d-flex bg-[#4811A2] h-screen items-center justify-center w-full overflow-y-scroll'>
            {/* <div className='text-3xl font-bold .'>Rastreie seu pet</div> */}
            <HeaderMenu showingOptions={true} selectedOption='plans' />
            <div className="flex items-center flex-col justify-center py-4 w-full h-full px-5 relative">
                <h1 className="text-3xl font-bold mb-4 text-white absolute left-10 top-10">Voltar</h1>
                <div
                    style={{ backgroundColor: plans[1].color }}
                    className="rounded-3xl relative shadow-md hover:shadow-lg h-2/3 w-1/3 transition duration-300"
                >
                    <div className="flex justify-evenly items-center flex-col">
                        <h1 className="text-4xl font-bold text-white p-2">{plans[1].name}</h1>
                        <h1 className="text-2xl font-bold text-white p-2">R${plans[1].value},00</h1>
                        {plans[1].description ?
                            <span className="text-white font-bold text-sm text-center p-2" > {plans[1].description} </span> : <>
                                <span className="text-white font-bold text-lg text-center p-2 ">Rastreamento em tempo real</span>
                                <span className="text-white font-bold text-2xl ">{plans[1].duration}</span>
                            </>
                        }
                    </div>
                    <Formik
                        initialValues={initialValues}
                        onSubmit={onSubmit}
                        validationSchema={validationSchema}
                    >
                        {({ errors, touched }) => (
                            <Form>
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
                                            } shadow appearance-none border rounded-3xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
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
                                    >
                                        Ano
                                    </label>
                                    <Field
                                        className={`${errors.expiration_month && touched.expiration_month
                                            ? 'border-red-500'
                                            : 'border-gray-300'
                                            } shadow appearance-none border rounded-3xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
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
                                        htmlFor="card_number"
                                    >
                                        Número
                                    </label>
                                    <Field
                                        className={`${errors.card_number && touched.card_number
                                            ? 'border-red-500'
                                            : 'border-gray-300'
                                            } shadow appearance-none border rounded-3xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                                        name="card_number"
                                        type="text"
                                    />
                                    <ErrorMessage
                                        name="card_number"
                                        component="div"
                                        className="text-red-500 text-xs italic mt-1"
                                    />
                                </div>
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
                                            } shadow appearance-none border rounded-3xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
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
                                        htmlFor="expiration_year"
                                    >
                                        Ano
                                    </label>
                                    <Field
                                        className={`${errors.expiration_year && touched.expiration_year
                                            ? 'border-red-500'
                                            : 'border-gray-300'
                                            } shadow appearance-none border rounded-3xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                                        name="expiration_year"
                                        type="text"
                                    />
                                    <ErrorMessage
                                        name="expiration_year"
                                        component="div"
                                        className="text-red-500 text-xs italic mt-1"
                                    />
                                </div>
                                <div className="flex items-center justify-center">
                                    <button
                                        className="border-2 border-purple-900 
                                        hover:text-white transition-all 
                                        hover:bg-purple-700 text-purple-800 font-bold py-2 px-12 rounded-3xl focus:outline-none focus:shadow-outline"
                                        type="submit"
                                    >
                                        Entrar
                                    </button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    );
};

export default PurchasePage;
