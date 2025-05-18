import SearchForm from "@/components/search-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Découvrez les meilleurs établissements à Paris</h1>
          <p className="text-lg text-gray-600">Bars, restaurants et boîtes de nuit recommandés par notre communauté</p>
        </div>

        <div className="mb-12 bg-blue-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Recherche par code postal parisien</h2>
          <p className="mb-4">
            Notre site vous permet de trouver facilement des établissements à Paris en utilisant les codes postaux
            (75001 à 75020).
          </p>
          <SearchForm />
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Restaurants</CardTitle>
              <CardDescription>Découvrez les meilleurs restaurants parisiens</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Explorez notre sélection de restaurants par quartier, type de cuisine et budget.</p>
              <button className="btn-outline mt-4 w-full">Voir les restaurants</button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Bars</CardTitle>
              <CardDescription>Les bars tendance de la capitale</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Trouvez les meilleurs bars pour l'happy hour, les cocktails ou l'ambiance.</p>
              <button className="btn-outline mt-4 w-full">Voir les bars</button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Boîtes de nuit</CardTitle>
              <CardDescription>Pour faire la fête jusqu'au bout de la nuit</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Les clubs et discothèques les plus branchés pour danser toute la nuit.</p>
              <button className="btn-outline mt-4 w-full">Voir les clubs</button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
