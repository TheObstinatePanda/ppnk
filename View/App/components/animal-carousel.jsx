"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "./ui/card"
import { Button } from "./ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { fetchAvailAnimals } from "../lib/api"
import AnimalCard from "./animal-card"
import Link from "next/link"

export default function AnimalCarousel() {
    const [animals, setAnimals] = useState([]);
    const [currIdx, setCurrIdx] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadAnimals = async () => {
            try {
                const aniData = await fetchAvailAnimals();
                setAnimals(aniData);
            } catch (error) {
                console.error("Failed to fetch animals:", error);
            } finally {
                setLoading(false);
            }
        };
        loadAnimals();
    }, []);

    const visibleCount = 3;
    const cardWidth = 320; // px, match your Card's w-80
    const gap = 24; // px, adjust as needed

    const maxIdx = Math.max(0, animals.length - visibleCount);

    const nextSlide = () => setCurrIdx((prev) => (prev >= maxIdx ? 0 : prev + 1));
    const prevSlide = () => setCurrIdx((prev) => (prev <= 0 ? maxIdx : prev - 1));

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <p>Loading Animals...</p>
            </div>
        );
    }

    if (animals.length === 0) {
        return (
            <Card>
                <CardContent className="p-6 text-center">
                    <p>There are no animals available for adoption at the moment</p>
                    <Button asChild className="mt-4">
                        <Link href="/foster">Apply to become a Foster Today!</Link>
                    </Button>
                </CardContent>
            </Card>
        );
    }

    return (
        <div className="relative">
            <div
                className="overflow-hidden mx-auto"
                style={{
                    maxWidth: `${visibleCount * cardWidth + (visibleCount - 1) * gap}px`,
                }}
            >
                <div
                    className="flex transition-transform duration-300 ease-in-out"
                    style={{
                        gap: `${gap}px`,
                        transform: `translateX(-${currIdx * (cardWidth + gap)}px)`,
                    }}
                >
                    {animals.map((animal) => (
                        <div
                            key={animal.id}
                            style={{ width: `${cardWidth}px`, flexShrink: 0 }}
                        >
                            <AnimalCard animal={animal} />
                        </div>
                    ))}
                </div>
            </div>

            {animals.length > visibleCount && (
                <>
                    <Button
                        variant="outline"
                        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 rounded-full bg-background shadow-md"
                        onClick={prevSlide}
                    >
                        <ChevronLeft className="h-4 w-4" />
                        <span className="sr-only">Previous</span>
                    </Button>

                    <Button
                        variant="outline"
                        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 rounded-full bg-background shadow-md"
                        onClick={nextSlide}
                    >
                        <ChevronRight className="h-4 w-4" />
                        <span className="sr-only">Next</span>
                    </Button>
                </>
            )}
        </div>
    );
}