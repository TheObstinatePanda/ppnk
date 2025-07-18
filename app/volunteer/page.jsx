"use client";

import { useState } from 'react';

const initVolunteer = {
    type: "volunteer",
    name: "",
    email: "",
    phone: "",
    address: "",
    age: "",
    occupation: "",
    availaility: "",
    animalType: "",
    expAnimals: "",
    expRescues: "",
    children: "",
    pets: "",
}

const initFoster = {
    type: "foster",
    name: "",
    email: "",
    phone: "",
    address: "",
    age: "",
    canFosterDogs: false,
    canFosterCats: false,
    occupation: "",
    availaility: "",
    animalType: "",
    preference: "",
    fosterSpace: "",
    expAnimals: "",
    expRescues: "",
    expFostering: "",
    hasChildren: false,
    children: "",
    hasPets: false,
    pets: "",
}

export default function Volunteer() {
    const [role, setRole] = useState("volunteer");
    const [form, setForm] = useState(initVolunteer);
    const [submitted, setSubmitted] = useState(false);

    const handleRoleChange = (e) => {
        const newRole = e.target.value;
        setRole(newRole);
        setForm(newRole === "volunteer" ? initVolunteer : initFoster)
    }

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm((f) => ({
            ...f,
            [name]: type === "checkbox" ? checked : value,
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Update the submission logic here once MySql is integrated
        await fetch("/api/volunteer", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
        });
        setSubmitted(true);
    }

    if (submitted) {
        return (
            <div className = "p-8 text-center">
                <h2 className = "text-3xl font-bold mb4">Thank you for your interest in volunteering!</h2>
                <p className = "text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-center">We appreciate your willingess to help. Give us some time to review your application and one of our fosters will reach out to you with more information!</p>
            </div>
        )
    }

    return (
        <div className = "max-w-2xl mx-auto p-8">
            <h1 className = "text-4xl md:text-5xl font-bold mb-4 text-center">Looking to Volunteer?</h1>
            <p className = "text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-center">We are always on the look out for help with our adoptions or fostering animals.</p>
            <p className = "mb-6">
                Fosters provide a vital role in the adoption process while enjoying a friendly visitor in their home for a few weeks. We can only rescue so many animals before we are out of space. Fosters are responsible for medicine administration, transport, shelter and socialization. We supply all medicine and reimburse for food and other supplies. Fosters take animals to the adoption events at nearby PETSMART stores, answer questions and assist with the paperwork. Don't worry, we will show you what to do.
            </p>
            <p className = "mb-6">
                Some of our fosters enjoy saving a certain breed of dog. Others enjoy puppies or kittens, while some want calm adults only. Some are able to foster many animals, while some take only one or two.
            </p>
            <p className = "mb-6">
                Perhaps you cannot foster but could help with adoption events or the clinic or provide some other services to our group. For instance we have a hard time getting all our dogs washed before adoptions every Saturday. Any help is greatly appreciated and welcomed!
            </p>
            <p className = "mb-6">
                If you are interested in volunteering, please fill out the form below, selecting either Foster or Volunteer. We will review your application and get back to you as soon as possible.
            </p>
            
            <div className = "mb-6 flex gap-4">
                <label>
                    <input 
                        type = "radio"
                        name = "role"
                        value = "volunteer"
                        checked = {role === "volunteer"}
                        onChange = {handleRoleChange}
                    />{" I want to Volunteer"}
                </label>
                <label>
                    <input 
                        type = "radio"
                        name = "role"
                        value = "foster"
                        checked = {role === "foster"}
                        onChange = {handleRoleChange}
                    />{" I want to Foster"}
                </label>
            </div>

            <form onSubmit = {handleSubmit} className = "space-y-4">
                {/*common fields */}
                <input 
                    name = "name"
                    required
                    placeholder = "Your Full Name"
                    value = {form.name}
                    onChange = {handleRoleChange}
                    className = "input"
                />
                <input 
                    name = "email"
                    required
                    type = "email"
                    placeholder = "Your Email"
                    value = {form.email}
                    onChange = {handleRoleChange}
                    className = "input"
                />

                {role === "volunteer" && (
                    <>
                        <input 
                            name = "occupation" 
                            placeholder = "Your Occupation"
                            value = {form.occupation}
                            onChange = {handleChange}
                            className = "input"
                        />
                        <input 
                            name = "animalType"
                            placeholder = " Would you preffer to work with cats or dogs?"
                            value = {form.animalType}
                            onChange = {handleChange}
                            className = "input"
                        />
                        <input 
                            name = "daysTimes" 
                            placeholder = "Your availability to volunteer (days and times)"
                            value = {form.daysTimes}
                            onChange = {handleChange}
                            className = "input"
                        />
                        <textarea 
                            name = "activities"
                            placeholder = "What would you like to do as a volunteer? What do you hope to gain from this experience?"
                            value = {form.activites}
                            onChange = {handleChange}
                            className = "input"
                        />
                    </>
                )}

                {role === "foser" && (
                    <>
                        <div className = "flex gap-4">
                            <label>
                                <input 
                                    type = "checkbox" 
                                    name = "canFosterDogs"
                                    checked = {form.canFosterDogs}
                                    onChange = {handlgeChange}
                                    className = "checkbox"
                                />
                                Able to Foster Dogs
                            </label>
                            <label>
                                <input 
                                    type = "checkbox" 
                                    name = "canFosterCats"
                                    checked = {form.canFosterCats}
                                    onChange = {handleChange}
                                    className = "checkbox"
                                />
                                Able to Foster Cats
                            </label>
                        </div>
                        <textarea 
                            name = "fosterPrefs"
                            placeholder = "Preferences for fostering (animals, age, breed, size etc.)"
                            value = {form.fosterPrefs}
                            onChange = {handleChange}
                            className = "input"
                        />
                    </>
                )}

                {/* Shared Fields */}

                <textarea 
                    name = "expResues"
                    placeholder = "Have you ever worked with a rescue group before? If so, please descirbe your experience."
                    value = {form.expRescues}
                    onChange = {handleChange}
                    className = "input"
                />
                <textarea 
                    name = "expAnimals"
                    placeholder = "Please describe your experience with dogs and/or cats (breeding, rasing, training, medical care, etc.)"
                    value = {form.expAnimals}
                    onChange = {handleChange}
                    className = "input"
                />
                <input 
                    name = "address"
                    required
                    placeholder = "Your Home Address"
                    value = {form.address}
                    onChange = {handleChange}
                    className = "input"
                />
                <input
                    name = "phone"
                    required
                    placeholder = "Your Phone Number"
                    value = {form.phone}
                    onChange = {handleChange}
                    className = "input"
                />
                <input 
                    name = "age"
                    required
                    placeholder = "Your Age"
                    value = {form.age}
                    onChange = {handleChange}
                    className = "input"
                />
                <textarea 
                    name = "children"
                    placeholder = "Do you have children? If so, please describe their ages and experience with animals."
                    value = {form.children}
                    onChange = {handleChange}
                    className = "input"
                />
                <textarea 
                    name = "pets"
                    placeholder = "Do you have any pets? If so, please describe their ages, breeds, and experience with other animals."
                    value = {form.pets}
                    onChange = {handleChange}
                    className = "input"
                />
                <textarea 
                    name = "extra"
                    placeholder = "Anything else you would like us to know?"
                    value = {form.extra}
                    onChange = {handleChange}
                    className = "input"
                />

                <button type = "submit" className = "btn btn-primary">Submit</button>
            </form>
        </div>
        
    )
}
