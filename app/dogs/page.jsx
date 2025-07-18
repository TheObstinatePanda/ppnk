"use client";

import React, { useState } from "react";
import { Button } from "../../View/App/components/ui/button";
import { Card, CardContent, CardFooter} from "../../View/App/components/ui/card";
import AnimalCarousel from "../../View/App/components/animal-carousel";
import SuccessStories from "../../View/App/components/success-stories";
import Link from "next/link";
import Image from "next/image";
import AnimalGallery from "../../View/App/components/animal-gallery"
import { mockAnimals } from "../../View/App/lib/mockAnimals";
import AnimalModal from "../../View/App/components/animal-modal";
import { Heart, Home } from "lucide-react"

export default function Dogs(actions) {
    const [selectedDog, setSelectedDog] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);

    const openModal = (dog) => {
        setSelectedDog(dog);
        setModalOpen(true);
    };

    const closeModal = () => {
        setSelectedDog(null);
        setModalOpen(false);
    };

    const dogs = mockAnimals.filter(animal => animal.is_dog);

    return (
        <div className = "container mx-auto px-4 py-8">
            <h1 className = "text-4xl md:text-5xl font-bold mb-4 text-center">Let us help you find the dog for you</h1>
            <p className = "text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-center">All of our dogs and puppies receive professional veterinary attention including spay/neuter, testing, vaccination, deworming, food and shelter. We are only able to rescue from Animal Control and cannot accept lost, hurt, or unwanted pets.</p>
            <div className = "flex flex-col gap-y-6 ">
                {dogs.map(dog => (
                    <Card key = {dog.id} onClick = {() => openModal(dog)} className = "cursor-pointer">
                        <CardContent>
                            <div className = "flex flex-row items-start justify-center">
                               <div className = "max-w-[500px] pr-10">
                                    <h3 className = "font-bolded text-lg mt-2">{dog.name}</h3>
                                    <p className = "text-sm">{dog.breed}</p>
                                    <p className = "text-ms max-w-[65ch]">{dog.description}</p>
                               </div>
                               <div>
                                    <AnimalGallery images={dog.images} />
                               </div>                             
                            </div>
                        </CardContent>
                        <CardFooter className="pt-0">
                            <Button asChild className="w-full">
                                <Link href={`/adopt?applying_for=${dog.id}`}>
                                    <Heart className="mr-2 h-4 w-4" /> Adopt Me
                                </Link>
                            </Button>
                        </CardFooter>
                    </Card>))}
            </div>
        </div>
    )
}