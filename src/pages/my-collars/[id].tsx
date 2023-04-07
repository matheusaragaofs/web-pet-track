import HeaderMenu from '@/components/HeaderMenu'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { FiArrowLeft } from 'react-icons/fi'

function HomePage() {
    const Map = dynamic(
        () => import('../../components/Map'),
        { ssr: false }
    )
    return <div className='d-flex bg-[#4811A2] h-screen items-center justify-center w-full overflow-y-scroll'>
        {/* <div className='text-3xl font-bold .'>Rastreie seu pet</div> */}
        <HeaderMenu showingOptions={false} />
        <div className='h-2/3'>
            <div className='w-3/4 m-auto d-flex text-right relative' >
                <Link href='/my-collars' className='flex space-x-8'>
                    <FiArrowLeft color='white' size={22} />
                    <span className='text-white font-bold absolute left-0'> Voltar </span>
                </Link>
                <span className='bg-[#E8E8E8] px-10 m-0 py-2 rounded-md text-[#4811A2] font-bold text-lg '> Polly</span>
            </div>
            <Map />
        </div>
    </div>
}

export default HomePage