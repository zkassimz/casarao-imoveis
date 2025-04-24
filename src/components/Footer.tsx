import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <>
      <div className="header-divider"></div>
      <footer className="py-8 bg-primary">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <Image
                  src="/images/logo-icon.svg"
                  alt="ImobTech"
                  width={40}
                  height={40}
                  className="mr-2"
                />
                <h3 className="text-xl font-bold text-white">ImobTech</h3>
              </div>
              <p className="text-secondary mb-2">Tecnologia em Imóveis</p>
              <p className="text-secondary">Inovação e excelência para encontrar o imóvel dos seus sonhos.</p>
            </div>
            
            <div>
              <h3 className="text-xl font-bold text-white mb-4">Links Rápidos</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="text-secondary hover:text-white transition-colors">
                    Início
                  </Link>
                </li>
                <li>
                  <Link href="/imoveis" className="text-secondary hover:text-white transition-colors">
                    Imóveis
                  </Link>
                </li>
                <li>
                  <Link href="/sobre" className="text-secondary hover:text-white transition-colors">
                    Sobre
                  </Link>
                </li>
                <li>
                  <Link href="/contato" className="text-secondary hover:text-white transition-colors">
                    Contato
                  </Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-bold text-white mb-4">Contato</h3>
              <p className="text-secondary mb-2">
                <span className="font-bold">WhatsApp:</span> +55 77 9840-9023
              </p>
              <p className="text-secondary mb-2">
                <span className="font-bold">Email:</span> valenthinadecarvalho@gmail.com
              </p>
            </div>
          </div>
          
          <div className="border-t border-primary-dark mt-8 pt-8 text-center text-secondary-dark">
            <p>&copy; {new Date().getFullYear()} ImobTech. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </>
  );
}
