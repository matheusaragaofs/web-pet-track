import { Formik, Form, Field, ErrorMessage, FormikProps } from 'formik';
import * as Yup from 'yup';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useRef, useState } from 'react';
import { toast } from 'react-toastify';

const Register = () => {
    const [cepInvalid, setCepInvalid] = useState(false)
    const checkCepValidity = async () => {
        const cep = formikRef?.current?.values?.cep;
        if (cep?.length !== 8) return
        const setFieldValue = formikRef?.current?.setFieldValue;
        if (!cep || !setFieldValue) {
            return false; // Some required object property is undefined
        }

        try {
            const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
            const data = await response.json();

            if (data.erro) {
                setCepInvalid(true)
                return false;
            }
            setFieldValue('address', data.logradouro ?? '');
            setFieldValue('neighborhood', data.bairro ?? '');
            setFieldValue('complement', data.complemento ?? '');
            setCepInvalid(false)
            return true;
        } catch (error) {
            setCepInvalid(true)
            return false;
        }
    };

    const DateInput = ({ values, setFieldValue, ...props }: any) => {
        const handleChange = (date: any) => {
            setFieldValue('birth_date', date);
        };

        return (
            <DatePicker
                placeholderText='dd/MM/YYYY'
                {...props}
                selected={values.birth_date}
                onChange={handleChange}
                dateFormat="MM/dd/yyyy"
            />
        );
    };
    const validateCep = (cep: string) => {
        const cepRegex = /^[0-9]{8}$/;
        if ((!cepRegex.test(cep))) {
            return 'CEP inválido';
        }
    };
    const validationSchema = Yup.object({
        full_name: Yup.string().required('Nome completo obrigatório'),
        email: Yup.string().email('Formato de email inválido').required('Email obrigatório'),
        phone: Yup.string().required('Telefone obrigatório'),
        gender: Yup.string().required('Gênero obrigatório'),
        cep: Yup.string().required('CEP obrigatório'),
        address: Yup.string().required('Logradouro obrigatório'),
        neighborhood: Yup.string().required('Bairro obrigatório'),
        complement: Yup.string().required('Complemento obrigatório'),
        birth_date: Yup.date().required('Data de nascimento obrigatória'),
        password: Yup.string().required('Senha obrigatória'),
        confirm_password: Yup.string()
            .oneOf([Yup.ref('password'), null as any], 'Senhas precisam ser iguais')
            .required('Confirmação de senha obrigatória'),
    });

    interface MyFormValues {
        full_name: string;
        email: string;
        cep: string;
        address: string;
        neighborhood: string;
        complement: string;
        phone: string;
        gender: string;
        birth_date: string;
        password: string;
        confirm_password: string;
    }

    const initialValues: MyFormValues = {
        full_name: '',
        email: '',
        cep: '',
        address: '',
        neighborhood: '',
        complement: '',
        phone: '',
        gender: '',
        birth_date: '',
        password: '',
        confirm_password: '',
    };

    const onSubmit = (values: any) => {

        console.log(values);
    };

    const formikRef = useRef<FormikProps<MyFormValues> | null>(null);
    return (
        <div className="flex justify-center h-screen items-center overflow-hidden">
            {/* <span className='absolute left-5 top-10 text-2xl'>
                <span className="font-bold text-purple-900">confor</span>
                <span>Track</span>
            </span> */}
            <div className="flex flex-col md:flex-row w-full md:w-1/2 h-full  overflow-scroll">
                <div className="bg-white w-full lg:w-3/4 px-8 pt-6 pb-8 mb-4">
                    <h1 className="text-3xl font-bold mb-6">Criar Conta</h1>
                    <Formik
                        innerRef={formikRef}
                        initialValues={initialValues}
                        onSubmit={onSubmit}
                        validationSchema={validationSchema}
                    >
                        {({ errors, touched, values, setFieldValue, handleChange }) => (
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
                                    >
                                        CEP
                                    </label>
                                    <div className='flex flex-col items-end'>

                                        <Field
                                            maxLength={8}
                                            validate={validateCep}
                                            onBlur={checkCepValidity}
                                            className={`${errors.cep && touched.cep
                                                ? 'border-red-500'
                                                : 'border-gray-300'
                                                } shadow appearance-none border rounded-3xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                                            name="cep"
                                            type="text"
                                            placeholder="00000-000"
                                        />
                                    </div>
                                    <ErrorMessage
                                        name="cep"
                                        component="div"
                                        className="text-red-500 text-xs italic mt-1"
                                    />
                                </div>
                                <div className="mb-4 ">
                                    <label
                                        className="block text-gray-700 text-sm font-bold mb-2"
                                    >
                                        Logradouro
                                    </label>

                                    <Field
                                        className={`${errors.address && touched.address
                                            ? 'border-red-500'
                                            : 'border-gray-300'
                                            } shadow appearance-none border rounded-3xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                                        name="address"
                                        type="text"
                                        placeholder="Rua São Jose"
                                    />
                                </div>
                                <ErrorMessage
                                    name="address"
                                    component="div"
                                    className="text-red-500 text-xs italic mt-1"
                                />
                                <div className="mb-4 ">
                                    <label
                                        className="block text-gray-700 text-sm font-bold mb-2"
                                    >
                                        Complemento
                                    </label>

                                    <Field
                                        className={`${errors.complement && touched.complement
                                            ? 'border-red-500'
                                            : 'border-gray-300'
                                            } shadow appearance-none border rounded-3xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                                        name="complement"
                                        type="text"
                                        placeholder="00000-000"
                                    />
                                </div>
                                <ErrorMessage
                                    name="complement"
                                    component="div"
                                    className="text-red-500 text-xs italic mt-1"
                                />
                                <div className="mb-4 ">
                                    <label
                                        className="block text-gray-700 text-sm font-bold mb-2"
                                    >
                                        Bairro
                                    </label>

                                    <Field
                                        className={`${errors.neighborhood && touched.neighborhood ? 'border-red-500'
                                            : 'border-gray-300'
                                            } shadow appearance-none border rounded-3xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                                        name="neighborhood"
                                        type="text"
                                        placeholder="ex: Imbiribeira"
                                    />
                                </div>
                                <ErrorMessage
                                    name="neighborhood"
                                    component="div"
                                    className="text-red-500 text-xs italic mt-1"
                                />
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

                                <div className="mb-4">
                                    <label
                                        className="block text-gray-700 text-sm font-bold mb-2"
                                        htmlFor="birth_date"
                                    >
                                        Data de Nascimento
                                    </label>
                                    <Field
                                        name="birth_date"
                                        as={() => DateInput({ setFieldValue, values })}
                                        errors={errors}
                                        touched={touched}
                                    />
                                    <ErrorMessage
                                        name="birth_date"
                                        component="div"
                                        className="text-red-500 text-xs italic mt-1"
                                    />
                                </div>
                                <div className='mb-4'>
                                    <label
                                        className="block text-gray-700 text-sm font-bold mb-2"
                                        htmlFor="gender"
                                    >
                                        Gênero
                                    </label>
                                    <div className='space-x-5'>
                                        <label className='space-x-1'>
                                            <Field
                                                className="border-gray-300 rounded-md p-2 m-2 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                                                type="radio" name="gender" value="male" checked={values.gender === 'male'} onChange={() => setFieldValue('gender', 'male')} />
                                            <span>
                                                Masculino
                                            </span>
                                        </label>
                                        <label className='space-x-1'>
                                            <Field type="radio" name="gender" value="female" checked={values.gender === 'female'} onChange={() => setFieldValue('gender', 'female')} />
                                            <span>
                                                Feminino
                                            </span>
                                        </label>
                                        <label className='space-x-1'>
                                            <Field type="radio" name="gender" value="other" checked={values.gender === 'other'} onChange={() => setFieldValue('gender', 'other')} />
                                            <span>
                                                Outro
                                            </span>
                                        </label>

                                    </div>
                                    <ErrorMessage
                                        name="gender"
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
                                <div className="mb-6">
                                    <label
                                        className="block text-gray-700 text-sm font-bold mb-2"
                                        htmlFor="confirm_password"
                                    >
                                        Confirmar Senha
                                    </label>
                                    <Field
                                        className={`${errors.confirm_password && touched.confirm_password
                                            ? 'border-red-500'
                                            : 'border-gray-300'
                                            } shadow appearance-none border rounded-3xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                                        name="confirm_password"
                                        type="password"
                                        placeholder="*******"
                                    />
                                    <ErrorMessage
                                        name="confirm_password"
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
                <img src={'https://source.unsplash.com/random/1080x1280?dog'} className={'h-full w-full'} alt={'cat'} />
            </div>
        </div >
    )
}
export default Register