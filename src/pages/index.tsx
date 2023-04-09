import HeaderMenu from '@/components/HeaderMenu'
import dynamic from 'next/dynamic'

function HomePage() {
  const Map = dynamic(
    () => import('./../components/Map'),
    { ssr: false }
  )
  return <div className='d-flex bg-[#4811A2] h-screen items-center justify-center w-ful'>
    {/* <div className='text-3xl font-bold .'>Rastreie seu pet</div> */}
    <HeaderMenu showingOptions={true} />

  </div>
}

export default HomePage