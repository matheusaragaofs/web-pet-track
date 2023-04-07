import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const Register = () => {
    // Define the validation schema using Yup
    const validationSchema = Yup.object({
        full_name: Yup.string().required('Nome completo obrigatório'),
        email: Yup.string().email('Formato de email inválido').required('Email obrigatório'),
        phone: Yup.string().required('Telefone obrigatório'),
        gender: Yup.string().required('Gênero obrigatório'),
        // birth_date: Yup.date().required('Data de nascimento obrigatória'),
        // password: Yup.string().required('Senha obrigatória'),
        // confirm_password: Yup.string()
        //     .oneOf([Yup.ref('password'), ''], 'Senhas precisam ser iguais')
        //     .required('Confirmação de senha obrigatória'),
    });

    // Define the form initial values
    const initialValues = {
        full_name: '',
        email: '',
        phone: '',
        gender: '',
        birth_date: '',
        password: '',
        confirm_password: '',
    };

    // Handle the form submission
    const onSubmit = (values: any) => {
        console.log(values);
    };

    return (
        <div className="mt-10 flex justify-center h-screen items-center overflow-hidden">
                    <span className='absolute left-5 top-10 text-2xl'>
                        <span className="font-bold text-purple-900">confor</span>
                        <span>Track</span>
                    </span>
            <div className="flex flex-col md:flex-row w-full md:w-1/2">
                <div className="bg-white w-full md:w-1/2 px-8 pt-6 pb-8 mb-4">
                    <h1 className="text-3xl font-bold mb-6">Criar Conta</h1>
                    <Formik
                        initialValues={initialValues}
                        onSubmit={onSubmit}
                        validationSchema={validationSchema}
                    >
                        {({ errors, touched , values, setFieldValue}) => (
                            <Form>
                                <div className="mb-4 ">
                                    <label
                                        className="block text-gray-700 text-sm font-bold mb-2"
                                        htmlFor="full_name"
                                    >
                                        Nome completo
                                    </label>
                                    <Field
                                        className={`${errors.full_name && touched.full_name
                                            ? 'border-red-500'
                                            : 'border-gray-300'
                                            } shadow appearance-none border rounded-3xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                                        name="full_name"
                                        type="text"
                                        placeholder="João da Silva"
                                    />
                                    <ErrorMessage
                                        name="full_name"
                                        component="div"
                                        className="text-red-500 text-xs italic mt-1"
                                    />
                                </div>
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
                                <div className="mb-4 ">
                                    <label
                                        className="block text-gray-700 text-sm font-bold mb-2"
                                        htmlFor="phone"
                                    >
                                        Telefone
                                    </label>
                                    <Field
                                        className={`${errors.phone && touched.phone
                                            ? 'border-red-500'
                                            : 'border-gray-300'
                                            } shadow appearance-none border rounded-3xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                                        name="phone"
                                        type="text"
                                        placeholder="99999999"
                                    />
                                    <ErrorMessage
                                        name="phone"
                                        component="div"
                                        className="text-red-500 text-xs italic mt-1"
                                    />
                                </div>
                                <div className='mb-4'>
                                    <label htmlFor="gender">Gênero</label>
                                    <div>
                                        <label>
                                            <Field type="radio" name="gender" value="male" checked={values.gender === 'male'} onChange={() => setFieldValue('gender', 'male')} />
                                            Masculino
                                        </label>
                                        <label>
                                            <Field type="radio" name="gender" value="female" checked={values.gender === 'female'} onChange={() => setFieldValue('gender', 'female')} />
                                            Feminino
                                        </label>
                                        <label>
                                            <Field type="radio" name="gender" value="other" checked={values.gender === 'other'} onChange={() => setFieldValue('gender', 'other')} />
                                            Outro
                                        </label>
                                    </div>
                                    {errors.gender && touched.gender && <div>{errors.gender}</div>}
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
                <div className="w-full hidden md:w-1/2 h-full  sm:block">
                    <img src={'https://source.unsplash.com/random/1080x1280?dog'} className={'h-full w-full'} alt={'cat'}/>
                </div>
            </div>
        </div>
    )
}
export default Register