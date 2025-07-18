// Imports
import { Card, CardContent, CardFooter } from "./ui/card"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import Image from "next/image"
import Link from "next/link"
import { Heart, Home } from "lucide-react"

    // creates an animal card with deatils on the animal and actions available for that animal
export default function AnimalCard({ animal, actions }) {
    return (
        <Card className="w-80 h-[32rem] flex flex-col overflow-hidden">
           
            <div className="relative h-48">
                <Image
                    src={animal.images?.[0] || `/placeholder.svg?height=300&width=400&text=${animal.name}`}
                    alt={animal.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 786px) 100vw, 400px"
                />
                {animal.is_adopted && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <Badge className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 textlg">Adopted</Badge>
                    </div>
                )}
            </div>

            <CardContent className="pt-4 flex-grow">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-lg">{animal.name}</h3>
                    <Badge variant={animal.is_dog ? "default" : "secondary"}>{animal.is_dog ? "Dog" : "Cat"}</Badge>
                </div>
                
                <p className="text-sm text-muted-foreground mb-2">
                    {animal.breed} * {animal.gender} * {animal.age} {animal.age === 1 ? "year" : "years"} old
                </p>
                
                <div className="flex flex-wrap gap-1 mb-3">
                    {/* good with kids */}
                    {animal.good_w_kids && (
                        <Badge variant="outline" className="text-xs">
                            Good with kids
                        </Badge>
                    )}
                    {/* good with animals */}
                    {animal.good_w_animals && (
                        <Badge variant="outline" className="text-xs">
                            Good with animals
                        </Badge>
                    )}
                    {/* house trained */}
                    {animal.house_trained && (
                        <Badge variant="outline" className="text-xs">
                            House trained
                        </Badge>
                    )}
                </div>

                <p className="text-sm line-clamp-3 mb-2">{animal.description}</p>
            </CardContent>

            <CardFooter className="pt-0">
                {actions ? (
                    actions
                ) : animal.is_adopted ? (
                    <div className="w-full flex items_center justify-center gap-2 text-green-600">
                        <Home className="h-5 w-5" />
                        <span className="font-medium">Found Forever Home</span>
                    </div>
                ) : (
                    <Button asChild className="w-full">
                        <Link href={`/adopt?applying_for=${animal.id}`}>
                            <Heart className="mr-2 h-4 w-4" /> Adopt Me
                        </Link>
                    </Button>
                )}
            </CardFooter>
        </Card>
    )
}