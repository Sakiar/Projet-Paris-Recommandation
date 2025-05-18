"use client"

import { Star } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

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
}

interface EstablishmentCardProps {
  establishment: Establishment
  isFavorite: boolean
  onToggleFavorite: (id: number) => void
}

export default function EstablishmentCard({ establishment, isFavorite, onToggleFavorite }: EstablishmentCardProps) {
  // Déterminer le type d'établissement
  const getEstablishmentType = (typeId: number) => {
    switch (typeId) {
      case 1:
        return "Restaurant"
      case 2:
        return "Bar"
      case 3:
        return "Boîte de nuit"
      default:
        return "Établissement"
    }
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle>{establishment.nom}</CardTitle>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onToggleFavorite(establishment.id_etablissement)}
            className={isFavorite ? "text-yellow-500" : "text-gray-400"}
          >
            {isFavorite ? <Star className="h-5 w-5 fill-yellow-500" /> : <Star className="h-5 w-5" />}
          </Button>
        </div>
        <div className="text-sm text-gray-500">{getEstablishmentType(establishment.id_type)}</div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div>
            <p className="text-sm font-medium">Adresse:</p>
            <p className="text-sm text-gray-600">
              {establishment.adresse}, {establishment.code_postal} Paris
            </p>
          </div>
          <div>
            <p className="text-sm font-medium">Téléphone:</p>
            <p className="text-sm text-gray-600">{establishment.telephone}</p>
          </div>
          <div className="flex items-center">
            <p className="text-sm font-medium mr-2">Note:</p>
            <div className="flex items-center">
              <span className="text-sm font-medium mr-1">{establishment.note}</span>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${i < Math.floor(establishment.note) ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between pt-2">
        <Button variant="outline" size="sm">
          Voir les détails
        </Button>
        <a
          href={establishment.site_web}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-3"
        >
          Visiter le site
        </a>
      </CardFooter>
    </Card>
  )
}
