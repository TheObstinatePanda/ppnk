"use client";

import React, { useState } from "react";
import { Button } from "../../View/App/components/ui/button";
import { Card, CardContent } from "../../View/App/components/ui/card";
import AnimalCarousel from "../../View/App/components/animal-carousel";
import SuccessStories from "../../View/App/components/success-stories";
import Link from "next/link";
import Image from "next/image";
import AnimalGallery from "../../View/App/components/animal-gallery"
import { mockAnimals } from "../../View/App/lib/mockAnimals";
import AnimalModal from "../../View/App/components/animal-modal";

export default function Cats() {
    const [selectedCat, setSelectedCat] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);

    const openModal = (cat) => {
        setSelectedCat(cat);
        setModalOpen(true);
    };

    const closeModal = () => {
        setSelectedCat(null);
        setModalOpen(false);
    };

    const cats = mockAnimals.filter(animal => animal.is_cat);

    return (
        <div className = "container mx-auto px-4 py-8">
            <h1 className = "text-4xl md:text-5xl font-bold mb-4 text-center">Let us help you find the cat for you</h1>
            <p className = "text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-center">All of our cats and kittens receive professional veterinary attention including spay/neuter, testing, vaccination, deworming, food and shelter. We are only able to rescue from Animal Control and cannot accept lost, hurt, or unwanted pets.</p>
            <div className = "flex flex-col gap-y-6 ">
                {cats.map(cat => (
                    <Card key = {cat.id} onClick = {() => openModal(cat)} className = "cursor-pointer">
                        <CardContent>
                            <div className = "flex flex-row items-start justify-center">
                               <div className = "max-w-[500px] pr-10">
                                    <h3 className = "font-bolded text-lg mt-2">{cat.name}</h3>
                                    <p className = "text-sm">{cat.breed}</p>
                                    <p className = "text-ms max-w-[65ch]">{cat.description}</p>
                               </div>
                               <div className = "mt-10">
                                    <AnimalGallery images={cat.images} />
                               </div>                             
                            </div>
                        </CardContent>
                    </Card>))}
            </div>
        </div>
    )
}