import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const Login = () => {
    // Define the validation schema using Yup
    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email format').required('Email obrigatório'),
        password: Yup.string().required('Senha obrigatória'),
    });

    // Define the form initial values
    const initialValues = {
        email: '',
        password: '',
    };

    // Handle the form submission
    const onSubmit = (values: any) => {
        console.log(values);
    };

    return (
        <div className="flex justify-center h-screen items-center overflow-hidden">
            <div className="flex  w-full md:w-1/2">
                <div className="bg-white w-full md:w-1/2 px-8 pt-6 pb-8 mb-4">
                    <span className='absolute top-10 text-2xl'>
                        <span className="font-bold text-purple-900  ">confor</span>
                        <span >Track</span>

                    </span>
                    <h1 className="text-3xl font-bold mb-6">Entrar</h1>
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
                                        htmlFor="email"
                                    >
                                        Email
                                    </label>
                                    <Field
                                        className={`${errors.email && touched.email
                                                ? 'border-red-500'
                                                : 'border-gray-300'
                                            } shadow appearance-none border rounded-3xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                                        name="email"
                                        type="email"
                                        placeholder="joao@email.com"
                                    />
                                    <ErrorMessage
                                        name="email"
                                        component="div"
                                        className="text-red-500 text-xs italic mt-1"
                                    />
                                </div>
                                <div className="mb-6">
                                    <label
                                        className="block text-gray-700 text-sm font-bold mb-2"
                                        htmlFor="password"
                                    >
                                        Senha
                                    </label>
                                    <Field
                                        className={`${errors.password && touched.password
                                                ? 'border-red-500'
                                                : 'border-gray-300'
                                            } shadow appearance-none border rounded-3xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                                        name="password"
                                        type="password"
                                        placeholder="*******"
                                    />
                                    <ErrorMessage
                                        name="password"
                                        component="div"
                                        className="text-red-500 text-xs italic mt-1"
                                    />
                                </div>
                                <div className="flex items-center justify-center">
                                    <button
                                        className="border-2 border-purple-900  hover:bg-purple-700 text-purple-800 font-bold py-2 px-12 rounded-3xl focus:outline-none focus:shadow-outline"
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
            <div className="w-full hidden md:w-1/2 h-full  sm:block">
                <img src={'https://source.unsplash.com/random/1080x1280?dog'} className={'h-full w-full'} alt={'cat'} object-cover />
            </div>
        </div>
    );
};

export default Login;
