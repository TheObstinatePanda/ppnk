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


// confirm if the animal has an image, if not confirm that the placeholder image is displayed
test("renders the animal's image, if provided", () => {
  render(<AnimalCard animal={mockAnimal} />);
  const image = screen.getByRole("img", { name: "Rocky" });
  expect(image).toBeInTheDocument();
});

test("renders a placeholder image if no images are provided", () => {
  const animalWithoutImage = { ...mockAnimal, images: [] };
  render(<AnimalCard animal = {animalWithoutImage} />);
  const image = screen.getByAltText("Rocky");
  expect(image).toHaveAttribute("src", "/placeholder.svg?height=300&width=400&text=Rocky");
});

// Check animal information and test if the animal has been adopted, is good with children, is house trained, etc. to add necessary badges

test("displays an 'Adopted' badge if the animal has been adopted", () => {
  const adoptedAnimal = { ...mockAnimal, is_adopted: true };
  render(<AnimalCard animal={adoptedAnimal} />);
  expect(screen.getByText("Adopted")).toBeInTheDocument();
})

test("displays a 'Good with Kids' badge if the animal is good with kids", () => {
  const adoptedAnimal = { ...mockAnimal, good_w_kids: true };
  render(<AnimalCard animal={adoptedAnimal} />);
  expect(screen.getByText("Good with kids")).toBeInTheDocument();
})

test("displays a 'Good with Animals' badge if the animal is good with other animals", () => {
  const adoptedAnimal = { ...mockAnimal, good_w_animals: true };
  render(<AnimalCard animal={adoptedAnimal} />);
  expect(screen.getByText("Good with animals")).toBeInTheDocument();
})

test("displays a 'House Trained' badge if the animal is house trained", () => {
  const adoptedAnimal = { ...mockAnimal, house_trained: true };
  render(<AnimalCard animal={adoptedAnimal} />);
  expect(screen.getByText("House trained")).toBeInTheDocument();
})


// Test that the animal's information is correctly displayed. Information should include Name, breed, age, description.

test("displays the animal's name, breed, and age", () => {
  render(<AnimalCard animal = {mockAnimal} />);

  // Check that the name is displayed and not empty
  const nameElement = screen.getByText(mockAnimal.name);
  expect(nameElement).toBeInTheDocument();
  expect(nameElement.textContent).not.toBe("");

  // Check that the breed is displayed and not empty
  const breedElement = screen.getByText(mockAnimal.breed);
  expect(breedElement).toBeInTheDocument();
  expect(breedELement.textContent).not.toBe("");

  // Check that the age is displayed and not empty
  const ageElement = screen.getByValue(mockAnimal.age);
  expect(ageElement).toBeInTheDocument();
  epxect(ageElement.textContent).not.toBe("");

})