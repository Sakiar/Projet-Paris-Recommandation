"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Search } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function SearchForm() {
  const router = useRouter()
  const [arrondissement, setArrondissement] = useState("all")
  const [type, setType] = useState("all")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Construire l'URL avec les paramètres de recherche
    const params = new URLSearchParams()
    if (arrondissement !== "all") params.append("arrondissement", arrondissement)
    if (type !== "all") params.append("type", type)

    // Rediriger vers la page des établissements avec les paramètres
    router.push(`/etablissements?${params.toString()}`)
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Rechercher un établissement</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="arrondissement">Code postal</Label>
              <Select value={arrondissement} onValueChange={setArrondissement}>
                <SelectTrigger id="arrondissement">
                  <SelectValue placeholder="Sélectionnez un code postal" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les codes postaux</SelectItem>
                  <SelectItem value="75001">75001</SelectItem>
                  <SelectItem value="75002">75002</SelectItem>
                  <SelectItem value="75003">75003</SelectItem>
                  <SelectItem value="75004">75004</SelectItem>
                  <SelectItem value="75005">75005</SelectItem>
                  <SelectItem value="75006">75006</SelectItem>
                  <SelectItem value="75007">75007</SelectItem>
                  <SelectItem value="75008">75008</SelectItem>
                  <SelectItem value="75009">75009</SelectItem>
                  <SelectItem value="75010">75010</SelectItem>
                  <SelectItem value="75011">75011</SelectItem>
                  <SelectItem value="75012">75012</SelectItem>
                  <SelectItem value="75013">75013</SelectItem>
                  <SelectItem value="75014">75014</SelectItem>
                  <SelectItem value="75015">75015</SelectItem>
                  <SelectItem value="75016">75016</SelectItem>
                  <SelectItem value="75017">75017</SelectItem>
                  <SelectItem value="75018">75018</SelectItem>
                  <SelectItem value="75019">75019</SelectItem>
                  <SelectItem value="75020">75020</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="type">Type d'établissement</Label>
              <Select value={type} onValueChange={setType}>
                <SelectTrigger id="type">
                  <SelectValue placeholder="Sélectionnez un type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les types</SelectItem>
                  <SelectItem value="restaurant">Restaurant</SelectItem>
                  <SelectItem value="bar">Bar</SelectItem>
                  <SelectItem value="boite_de_nuit">Boîte de nuit</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button type="submit" className="w-full">
            <Search className="mr-2 h-4 w-4" /> Rechercher
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
