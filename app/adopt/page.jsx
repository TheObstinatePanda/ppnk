"use client"

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { mockAnimals} from "../../View/App/lib/mockAnimals";
import AnimalGallery from "../../View/App/components/animal-gallery";

const initState = {
    name: "",
    email: "",
    phone: "",
    address: "",
    applying_for: "",
    has_pets: false,
    is_restricted: false,
}

export default function AdoptPage() {
    const [form, setForm] = useState(initState);
    const [submitted, setSubmitted] = useState(false);
    const searchParams = useSearchParams();
    const applyingForId = searchParams.get("applying_for");
    const [animal, setAnimal] = useState(null);

    useEffect(() => {
        if (applyingForId) {
            const found = mockAnimals.find(a => String(a.id) === String(applyingForId));
            if (found) {
                setAnimal(found);
                setForm(f => ({
                    ...f,
                    applying_for: found.name,
                }))
            }
        }
    }, [applyingForId])

    const handleChange = (e) => {
        
        const { name, value, type, checked } = e.target;
        setForm(f => {
            const updated = {
                ...f,
                [name]: type === "checkbox" ? checked : value,
            };

            if (name === "applying_for") {
                const found = mockAnimals.find(animal => animal.name.toLowerCase() === value.trim().toLowerCase());
                setAnimal (found || null);
            }
            return updated;
        });
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        // Update the submission logic here once MySql is integrated
        await fetch("/api/adopt", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form)
        });
    };
    if (submitted) {
        return (
            <div className = "p-8 text-center">
                <span>Thank you for your application!</span>
            </div>
        )
    };

    return (
        
        
        <div className = "max-w-xl mx-auto p-8">
            {animal && (
                <div className = "mb-4 flex flex-col items-center">
                    <AnimalGallery images = {animal.images} />
                    <h1 className = "text-3xl font-bold mb-4">{animal.name}</h1>
                </div>
            )}
            <h2 className = "text-2xl font-bold mb-4">Adoption Application</h2>
            <form onSubmit = {handleSubmit} className = "space-y-4">
                <input name = "name" required placeholder ="Full Name" value = {form.name} onChange = {handleChange} className = "input" />
                <input name = "email" required type = "email" placeholder = " Email" value = {form.email} onChange = {handleChange} className = "input"/>
                <input name = "phone" required placeholder = "Phone" value = {form.phone} onChange = {handleChange} className = "input"/>
                <input name = "address" required placeholder = "Home Address" value = {form.address} onChange = {handleChange} className = "input"/>
                <input name = "applying_for" required placeholder = "Animal Name" value = {form.applying_for} onChange = {handleChange} className = "input"/>
                <label>
                    <span>Do you currently have pets?</span>
                    <input name = "has_pets" type = "checkbox" checked = "form.has_pets"  placeholder = "Home Address" value = {form.address} onChange = {handleChange} className = "input"/>
                </label>

                <button type = "submit" className = "btn btn-primary">Submit</button>
            </form>
        </div>
    );
}