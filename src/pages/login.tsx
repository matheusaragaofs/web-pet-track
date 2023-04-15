import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/router'
import { toast } from 'react-toastify';

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
    const validUser = {
        email: 'dev@email.com',
        password: '123',
    }

    const router = useRouter()
    const onSubmit = (values: any) => {
        console.log(values);
        if (values.email === validUser.email && values.password === validUser.password) {
            localStorage.setItem('user', JSON.stringify(values));
            router.push('/my-collars');
        } else {
            toast('E-mail ou senha inválida', { type: 'error' })
        }

    };

    return (
        <div className="flex justify-center items-center overflow-hidden h-full">
            <div className="flex  items-center justify-center w-full md:w-1/2 p-4 sm:p-16 ">
                <div className="bg-white w-full p-10 rounded-2xl ">
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
            <div className="w-full hidden md:w-1/2 rounded-lg h-full sm:block">
                <img src={'https://source.unsplash.com/random/1080x1280?dog'} className={'h-full w-full'} alt={'cat'} object-cover />
            </div>
        </div>
    );
};

export default Login;
