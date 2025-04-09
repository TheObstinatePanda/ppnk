import { render, screen } from '@testing-library/react';
import AnimalCard from './AnimalCard';

const mockAnimal = {
        id: 9,
        is_dog: true,
        is_cat: false,
        name: "Rocky",
        breed: "Boxer",
        age: 4,
        gender: "Male",
        size: "Large",
        good_w_kids: true,
        good_w_animals: false,
        house_trained: true,
        adoption_location: "Main Shelter",
        description:
          "Rocky is a strong and athletic Boxer with a heart of gold. He's very loyal and protective of his family. He prefers to be the only pet in the home.",
        is_available: true,
        is_adopted: false,
        images: ["/placeholder.svg?height=300&width=400&text=Rocky"],
      
}