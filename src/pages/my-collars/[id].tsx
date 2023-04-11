import dynamic from 'next/dynamic'


const CollarPage = () => {
    const Map = dynamic(
        () => import('../../components/Map'),
        { ssr: false }
    )
    return <Map />
}

export default CollarPage