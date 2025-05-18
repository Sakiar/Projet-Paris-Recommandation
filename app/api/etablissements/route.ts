import { NextResponse } from "next/server"

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

// Données d'exemple (dans une application réelle, ces données viendraient de la base de données)
const mockEstablishments: Establishment[] = [
  {
    id_etablissement: 1,
    nom: "Le Petit Bistrot",
    adresse: "15 rue de la Paix",
    code_postal: "75001",
    telephone: "01 23 45 67 89",
    site_web: "https://example.com",
    note: 4.5,
    id_type: 1, // Restaurant
  },
  {
    id_etablissement: 2,
    nom: "Bar du Coin",
    adresse: "42 avenue des Champs-Élysées",
    code_postal: "75008",
    telephone: "01 23 45 67 90",
    site_web: "https://example.com",
    note: 4.2,
    id_type: 2, // Bar
  },
  {
    id_etablissement: 3,
    nom: "Club Nuit Blanche",
    adresse: "7 rue Saint-Denis",
    code_postal: "75002",
    telephone: "01 23 45 67 91",
    site_web: "https://example.com",
    note: 4.8,
    id_type: 3, // Boîte de nuit
  },
  {
    id_etablissement: 4,
    nom: "Restaurant La Belle Époque",
    adresse: "23 rue du Faubourg Saint-Honoré",
    code_postal: "75008",
    telephone: "01 23 45 67 92",
    site_web: "https://example.com",
    note: 4.7,
    id_type: 1, // Restaurant
  },
  {
    id_etablissement: 5,
    nom: "Café des Artistes",
    adresse: "10 place de la Bastille",
    code_postal: "75004",
    telephone: "01 23 45 67 93",
    site_web: "https://example.com",
    note: 4.1,
    id_type: 2, // Bar
  },
  {
    id_etablissement: 6,
    nom: "Le Marais Gourmand",
    adresse: "35 rue des Rosiers",
    code_postal: "75004",
    telephone: "01 23 45 67 94",
    site_web: "https://example.com",
    note: 4.6,
    id_type: 1, // Restaurant
  },
  {
    id_etablissement: 7,
    nom: "Montmartre Lounge",
    adresse: "8 place du Tertre",
    code_postal: "75018",
    telephone: "01 23 45 67 95",
    site_web: "https://example.com",
    note: 4.3,
    id_type: 2, // Bar
  },
  {
    id_etablissement: 8,
    nom: "Club Électro",
    adresse: "12 rue Oberkampf",
    code_postal: "75011",
    telephone: "01 23 45 67 96",
    site_web: "https://example.com",
    note: 4.4,
    id_type: 3, // Boîte de nuit
  },
  {
    id_etablissement: 9,
    nom: "Bistrot Parisien",
    adresse: "5 rue Mouffetard",
    code_postal: "75005",
    telephone: "01 23 45 67 97",
    site_web: "https://example.com",
    note: 4.2,
    id_type: 1, // Restaurant
  },
  {
    id_etablissement: 10,
    nom: "Le Comptoir du 16ème",
    adresse: "18 avenue Victor Hugo",
    code_postal: "75016",
    telephone: "01 23 45 67 98",
    site_web: "https://example.com",
    note: 4.9,
    id_type: 1, // Restaurant
  },
]

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const codePostal = searchParams.get("arrondissement")
  const type = searchParams.get("type")
  const noteMin = searchParams.get("note_min") ? Number.parseFloat(searchParams.get("note_min")!) : 0

  let filteredEstablishments = [...mockEstablishments]

  // Filtrer par code postal
  if (codePostal) {
    filteredEstablishments = filteredEstablishments.filter((e) => e.code_postal === codePostal)
  }

  // Filtrer par type
  if (type) {
    const typeId = type === "restaurant" ? 1 : type === "bar" ? 2 : type === "boite_de_nuit" ? 3 : 0
    if (typeId > 0) {
      filteredEstablishments = filteredEstablishments.filter((e) => e.id_type === typeId)
    }
  }

  // Filtrer par note minimale
  if (noteMin > 0) {
    filteredEstablishments = filteredEstablishments.filter((e) => e.note >= noteMin)
  }

  return NextResponse.json(filteredEstablishments)
}
