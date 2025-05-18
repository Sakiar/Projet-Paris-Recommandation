import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-gray-600">&copy; 2025 ParisNight. Tous droits réservés.</p>
          </div>
          <ul className="flex space-x-6">
            <li>
              <Link href="/mentions-legales" className="text-gray-600 hover:text-blue-600">
                Mentions légales
              </Link>
            </li>
            <li>
              <Link href="/confidentialite" className="text-gray-600 hover:text-blue-600">
                Politique de confidentialité
              </Link>
            </li>
            <li>
              <Link href="/contact" className="text-gray-600 hover:text-blue-600">
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}
