import dynamic from 'next/dynamic'

function HomePage() {
  const Map = dynamic(
    () => import('./../components/Map'),
    { ssr: false }
  )
  return <div className='d-flex items-center justify-center w-ful'>
    <div className='text-3xl font-bold :D'>Rastreie seu pet</div>
    <Map />
  </div>
}

export default HomePage