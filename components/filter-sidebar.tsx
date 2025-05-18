"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Slider } from "@/components/ui/slider"

export default function FilterSidebar() {
  const router = useRouter()
  const searchParams = useSearchParams()

  // Récupérer les paramètres actuels
  const currentArrondissement = searchParams.get("arrondissement") || ""
  const currentType = searchParams.get("type") || ""

  // États locaux pour les filtres
  const [arrondissement, setArrondissement] = useState(currentArrondissement)
  const [type, setType] = useState(currentType)
  const [noteMin, setNoteMin] = useState([3]) // Note minimale par défaut à 3/5

  // Appliquer les filtres
  const applyFilters = () => {
    const params = new URLSearchParams()

    if (arrondissement) params.append("arrondissement", arrondissement)
    if (type) params.append("type", type)
    params.append("note_min", noteMin[0].toString())

    router.push(`/etablissements?${params.toString()}`)
  }

  // Réinitialiser les filtres
  const resetFilters = () => {
    setArrondissement("")
    setType("")
    setNoteMin([3])
    router.push("/etablissements")
  }

  return (
    <Card className="w-full md:w-64 h-fit sticky top-4">
      <CardHeader>
        <CardTitle>Filtres</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="space-y-3">
            <Label>Code postal</Label>
            <RadioGroup value={arrondissement} onValueChange={setArrondissement}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="" id="all" />
                <Label htmlFor="all">Tous</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="75001" id="75001" />
                <Label htmlFor="75001">75001</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="75002" id="75002" />
                <Label htmlFor="75002">75002</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="75008" id="75008" />
                <Label htmlFor="75008">75008</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="75011" id="75011" />
                <Label htmlFor="75011">75011</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="75016" id="75016" />
                <Label htmlFor="75016">75016</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="75020" id="75020" />
                <Label htmlFor="75020">75020</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-3">
            <Label>Type d'établissement</Label>
            <RadioGroup value={type} onValueChange={setType}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="" id="type-all" />
                <Label htmlFor="type-all">Tous</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="restaurant" id="restaurant" />
                <Label htmlFor="restaurant">Restaurant</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="bar" id="bar" />
                <Label htmlFor="bar">Bar</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="boite_de_nuit" id="boite_de_nuit" />
                <Label htmlFor="boite_de_nuit">Boîte de nuit</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between">
              <Label>Note minimale</Label>
              <span>{noteMin[0]}/5</span>
            </div>
            <Slider defaultValue={[3]} max={5} step={0.5} value={noteMin} onValueChange={setNoteMin} />
          </div>

          <div className="space-y-2">
            <Button onClick={applyFilters} className="w-full">
              Appliquer les filtres
            </Button>
            <Button variant="outline" onClick={resetFilters} className="w-full">
              Réinitialiser
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
