"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import EstablishmentCard from "@/components/establishment-card"
import FilterSidebar from "@/components/filter-sidebar"
import { Loader2 } from "lucide-react"

// Types
interface Establishment {
  id_etablissement: number
  nom: string
  adresse: string
  code_postal: string
  telephone: string
  site_web: string
  note: number
  id_type: number
  isFavorite?: boolean
}

export default function Etablissements() {
  const searchParams = useSearchParams()
  const arrondissement = searchParams.get("arrondissement")
  const type = searchParams.get("type")

  const [establishments, setEstablishments] = useState<Establishment[]>([])
  const [favorites, setFavorites] = useState<number[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  // Charger les données depuis l'API
  useEffect(() => {
    const fetchEstablishments = async () => {
      setLoading(true)
      try {
        // Construire l'URL avec les paramètres de recherche
        const params = new URLSearchParams()
        if (arrondissement) params.append("arrondissement", arrondissement)
        if (type) params.append("type", type)

        const response = await fetch(`/api/etablissements?${params.toString()}`)
        if (!response.ok) {
          throw new Error("Erreur lors du chargement des établissements")
        }

        const data = await response.json()
        setEstablishments(data)

        // Charger les favoris depuis le localStorage
        const storedFavorites = localStorage.getItem("favorites")
        if (storedFavorites) {
          setFavorites(JSON.parse(storedFavorites))
        }
      } catch (err) {
        setError("Une erreur est survenue lors du chargement des données")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchEstablishments()
  }, [arrondissement, type])

  // Fonction pour ajouter/supprimer des favoris
  const toggleFavorite = (id: number) => {
    let newFavorites: number[]

    if (favorites.includes(id)) {
      newFavorites = favorites.filter((favId) => favId !== id)
    } else {
      newFavorites = [...favorites, id]
    }

    setFavorites(newFavorites)
    localStorage.setItem("favorites", JSON.stringify(newFavorites))
  }

  // Séparer les établissements favoris et les autres
  const favoriteEstablishments = establishments.filter((e) => favorites.includes(e.id_etablissement))
  const otherEstablishments = establishments.filter((e) => !favorites.includes(e.id_etablissement))

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Liste des établissements</h1>

      <div className="flex flex-col md:flex-row gap-8">
        <FilterSidebar />

        <div className="flex-1">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            </div>
          ) : error ? (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">{error}</div>
          ) : (
            <>
              {favoriteEstablishments.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-2xl font-semibold mb-4">Mes favoris</h2>
                  <div className="grid grid-cols-1 gap-4">
                    {favoriteEstablishments.map((establishment) => (
                      <EstablishmentCard
                        key={establishment.id_etablissement}
                        establishment={establishment}
                        isFavorite={true}
                        onToggleFavorite={toggleFavorite}
                      />
                    ))}
                  </div>
                </div>
              )}

              <h2 className="text-2xl font-semibold mb-4">Autres établissements</h2>
              {otherEstablishments.length > 0 ? (
                <div className="grid grid-cols-1 gap-4">
                  {otherEstablishments.map((establishment) => (
                    <EstablishmentCard
                      key={establishment.id_etablissement}
                      establishment={establishment}
                      isFavorite={false}
                      onToggleFavorite={toggleFavorite}
                    />
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">Aucun établissement trouvé pour ce code postal.</p>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
