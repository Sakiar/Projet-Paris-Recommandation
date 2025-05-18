"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"

export default function Header() {
  const pathname = usePathname()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    // Vérifier si l'utilisateur est connecté
    const loggedIn = localStorage.getItem("isLoggedIn") === "true"
    setIsLoggedIn(loggedIn)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn")
    setIsLoggedIn(false)
    window.location.href = "/"
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-xl font-bold text-blue-600">
            ParisNight
          </Link>

          {/* Menu pour mobile */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className="p-2">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Menu pour desktop */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/" className={`hover:text-blue-600 ${pathname === "/" ? "text-blue-600 font-medium" : ""}`}>
              Accueil
            </Link>
            <Link
              href="/etablissements"
              className={`hover:text-blue-600 ${pathname === "/etablissements" ? "text-blue-600 font-medium" : ""}`}
            >
              Établissements
            </Link>
            {isLoggedIn ? (
              <>
                <Link
                  href="/favoris"
                  className={`hover:text-blue-600 ${pathname === "/favoris" ? "text-blue-600 font-medium" : ""}`}
                >
                  Mes favoris
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Déconnexion
                </button>
              </>
            ) : (
              <Link
                href="/login"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Connexion
              </Link>
            )}
          </nav>
        </div>

        {/* Menu mobile */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col space-y-4">
              <Link
                href="/"
                onClick={closeMenu}
                className={`hover:text-blue-600 ${pathname === "/" ? "text-blue-600 font-medium" : ""}`}
              >
                Accueil
              </Link>
              <Link
                href="/etablissements"
                onClick={closeMenu}
                className={`hover:text-blue-600 ${pathname === "/etablissements" ? "text-blue-600 font-medium" : ""}`}
              >
                Établissements
              </Link>
              {isLoggedIn ? (
                <>
                  <Link
                    href="/favoris"
                    onClick={closeMenu}
                    className={`hover:text-blue-600 ${pathname === "/favoris" ? "text-blue-600 font-medium" : ""}`}
                  >
                    Mes favoris
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout()
                      closeMenu()
                    }}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors w-full text-left"
                  >
                    Déconnexion
                  </button>
                </>
              ) : (
                <Link
                  href="/login"
                  onClick={closeMenu}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors block text-center"
                >
                  Connexion
                </Link>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
