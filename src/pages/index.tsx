import HeaderMenu from '@/components/HeaderMenu'
import Head from "next/head";

export default function HomePage() {
  return (
    <div className="bg-white overflow-scroll  scrollbar-thin  scrollbar-thumb-[#eeebf7]  scrollbar-track-[#ffffff]   h-full pb-32 text-[#5F10DF]">
      <Head>
        <title>Conforto e Segurança - Home Page</title>
      </Head>

      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl tracking-tight font-extrabold sm:text-5xl md:text-6xl">
            Conforto e Segurança
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Mantenha seu pet seguro e confortável com nossa coleira rastreável. Nunca perca seu amado amigo de vista novamente.
          </p>
        </div>

        <div className="mt-10">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold  sm:text-4xl">Nossos produtos</h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
              Nossas coleiras são rastreáveis e feitas com materiais de alta qualidade, macios e respiráveis. Ajustáveis e resistentes, se adaptando perfeitamente ao tamanho e peso do animal. A funcionalidade rastreável das coleiras permitem localizar o animal em tempo real, em caso de perda ou fuga.
            </p>
            <div className="mt-6">
              <a
                href="#"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Ver produtos
              </a>
            </div>
          </div>
        </div>



        <div className="mt-10">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold  sm:text-4xl">Nossos planos</h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
              Oferecemos planos de rastreamento para animais de estimação de todos os tamanhos e orçamentos. Desde nosso plano gratuito até o plano premium com serviço de rastreamento em tempo real por um ano.

              Você pode optar pelo plano que melhor atende às suas necessidades e orçamento. Mantenha seu animal de estimação seguro e próximo a você, com nossos planos de rastreamento acessíveis e confiáveis.

            </p>
            <div className="mt-6">
              <a
                href="#"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Ver planos
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold sm:text-4xl">Quem somos?</h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
              Acreditamos que os animais são membros da família e nossa coleira protege e traz tranquilidade para os donos. Oferecemos uma solução que proporciona conforto e segurança para animais e seus donos. Confie em nós para manter seu melhor amigo sempre seguro e próximo a você.

            </p>
          </div>
        </div>





      </div>
    </div>)
}
