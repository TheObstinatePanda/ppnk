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
    hasWorkedWithFoster: "",
    fosterExperience: "",
    hasWorkedWithRescue: "",
    rescueExperience: "",
    hasAnimalExperience: "",
    animalExperience: "",
    hasChildren: "",
    childrenDetails: "",
    hasPets: "",
    petsDetails: "",
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
    fosterPrefs: "",
    expAnimals: "",
    expRescues: "",
    expFostering: "",
    hasChildren: false,
    children: "",
    hasPets: false,
    pets: "",
    hasWorkedWithFoster: "",
    fosterExperience: "",
    hasWorkedWithRescue: "",
    rescueExperience: "",
    hasAnimalExperience: "",
    animalExperience: "",
    childrenDetails: "",
    petsDetails: "",
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
            <div className="p-8 text-center">
                <h2 className="text-3xl font-bold mb4">Thank you for your interest in volunteering!</h2>
                <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-center">We appreciate your willingess to help. Give us some time to review your application and one of our fosters will reach out to you with more information!</p>
            </div>
        )
    }

    return (
        <div className="max-w-2xl mx-auto p-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">Looking to Volunteer?</h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-center">We are always on the look out for help with our adoptions or fostering animals.</p>
            <p className="mb-6">
                Fosters provide a vital role in the adoption process while enjoying a friendly visitor in their home for a few weeks. We can only rescue so many animals before we are out of space. Fosters are responsible for medicine administration, transport, shelter and socialization. We supply all medicine and reimburse for food and other supplies. Fosters take animals to the adoption events at nearby PETSMART stores, answer questions and assist with the paperwork. Don't worry, we will show you what to do.
            </p>
            <p className="mb-6">
                Some of our fosters enjoy saving a certain breed of dog. Others enjoy puppies or kittens, while some want calm adults only. Some are able to foster many animals, while some take only one or two.
            </p>
            <p className="mb-6">
                Perhaps you cannot foster but could help with adoption events or the clinic or provide some other services to our group. For instance we have a hard time getting all our dogs washed before adoptions every Saturday. Any help is greatly appreciated and welcomed!
            </p>
            <p className="mb-6">
                If you are interested in volunteering, please fill out the form below, selecting either Foster or Volunteer. We will review your application and get back to you as soon as possible.
            </p>
            
            <div className="mb-6 flex gap-4">
                <label>
                    <input 
                        type="radio"
                        name="role"
                        value="volunteer"
                        checked={role === "volunteer"}
                        onChange={handleRoleChange}
                    />{" I want to Volunteer"}
                </label>
                <label>
                    <input 
                        type="radio"
                        name="role"
                        value="foster"
                        checked={role === "foster"}
                        onChange={handleRoleChange}
                    />{" I want to Foster"}
                </label>
            </div>

            <form onSubmit={handleSubmit} className="space-y-2">
                {/*Personal Info */}
                <div className="bg-gray-50 p-2 rounded-lg">
                    <h3 className="text-xl font-semibold mb-2">Personal Information</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium-text-gray-700 mb-1"> Full Name  </label>
                            <input 
                                name="name"
                                required
                                placeholder="Your Full Name"
                                value={form.name}
                                onChange={handleChange}
                                className="input"
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium-text-gray-700 mb-1"> Email Address  </label>
                            <input 
                                name="email"
                                required
                                type="email"
                                placeholder="Your Email"
                                value={form.email}
                                onChange={handleChange}
                                className="input"
                            />
                        </div>
                        <div>
                            <label htmlFor="phone" className="block text-sm font-medium-text-gray-700 mb-1"> Phone Number  </label>
                            <input 
                                name="phone"
                                required
                                placeholder="Your Phone Number"
                                value={form.phone}
                                onChange={handleChange}
                                className="input"
                            />
                        </div>
                        <div>
                            <label htmlFor="address" className="block text-sm font-medium-text-gray-700 mb-1"> Home Address  </label>
                            <input 
                                name="address"
                                required
                                placeholder="Your Home Address"
                                value={form.address}
                                onChange={handleChange}
                                className="input"
                            />
                        </div>
                        <div>
                            <label htmlFor="age" className="block text-sm font-medium-text-gray-700 mb-1"> Age  </label>
                            <input 
                                name="age"
                                required
                                placeholder="Your Age"
                                value={form.age}
                                onChange={handleChange}
                                className="input"
                            />
                        </div>
                        {/* Volunteer-specific fields */}
                        {role === "volunteer" && (
                            <>
                                <div>
                                    <label htmlFor="occupation" className="block text-sm font-medium-text-gray-700 mb-1"> Occupation  </label>
                                    <input
                                        name="occupation"
                                        required
                                        placeholder="Your Occupation"
                                        value={form.occupation}
                                        onChange={handleChange}
                                        className="input"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="animalType" className="block text-sm font-medium-text-gray-700 mb-1"> Animal Type  </label>
                                    <select
                                        name="animalType"
                                        required
                                        placeholder="Your Preferred Animal Type"
                                        value={form.animalType}
                                        onChange={handleChange}
                                        className="input"
                                    >
                                        <option value="cats"> Cats </option>
                                        <option value="dogs"> Dogs </option>
                                        <option value="both"> Both </option>
                                    </select>
                                </div>

                                <div>
                                    <label htmlFor="availaility" className="block text-sm font-medium-text-gray-700 mb-1"> Availability  </label>
                                    <input 
                                        name="availaility"
                                        required
                                        placeholder="Your Availability to Volunteer (days and times)"
                                        value={form.availaility}
                                        onChange={handleChange}
                                        className="input"
                                    />
                                </div>

                                <div className="md:col-span-2">
                                    <label htmlFor="activities" className="block text-sm font-medium-text-gray-700 mb-1"> Activities  </label>
                                    <textarea
                                        name="activities"
                                        required
                                        placeholder="What would you like to do as a volunteer? What do you hope to gain from this experience?"
                                        value={form.activities}
                                        onChange={handleChange}
                                        className="input w-full"
                                        rows="3"
                                    />
                                </div>
                            </>
                        )}

                        {/* Foster-specific fields */}
                        {role === "foster" && (
                            <>
                                <div className="space-y-2">
                                    <label htmlFor="activities" className="block text-sm font-medium-text-gray-700 mb-1"> Can you foster Dogs or Cats?</label>
                                    <div className="flex gap-4">
                                        <label className="flex items-center mb-2">
                                            <input 
                                                type="checkbox" 
                                                name="canFosterDogs"
                                                checked={form.canFosterDogs}
                                                onChange={handleChange}
                                                className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                            />  
                                            Dogs
                                        </label>
                                        <label className="flex items-center mb-2">
                                            <input 
                                                type="checkbox" 
                                                name="canFosterCats"
                                                checked={form.canFosterCats}
                                                onChange={handleChange}
                                                className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                            />
                                            Cats
                                        </label>
                                        <label className="flex items-center mb-2">
                                            <input 
                                                type="checkbox" 
                                                name="canFosterBoth"
                                                checked={form.canFosterDogs && form.canFosterCats}
                                                onChange={handleChange}
                                                className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                            />
                                            Both
                                        </label>
                                    </div>
                                </div>                                
                            </>
                        )}                        
                    </div>
                </div>

                {/* Experience Section */}
                <div className="bg-gray-50 p-2 rounded-lg">
                    <h3 className="text-xl font-semibold mb-2">Experience & Background</h3>
                    <div className="space-y-3">
                        <div>
                            <label htmlFor="hasfostered" className="block text-sm font-medium-text-gray-700 mb-1">Have you ever worked with a foster before?</label>
                            <div className="flex gap-4 mb-2">
                                <label className="flex items-center">
                                    <input 
                                        type="radio" 
                                        name="hasWorkedWithFoster"
                                        value="yes"
                                        checked={form.hasWorkedWithFoster === "yes"}
                                        onChange={handleChange}
                                        className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                                    />  
                                    Yes
                                </label>
                                <label className="flex items-center">
                                    <input 
                                        type="radio" 
                                        name="hasWorkedWithFoster"
                                        value="no"
                                        checked={form.hasWorkedWithFoster === "no"}
                                        onChange={handleChange}
                                        className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                                    />
                                    No
                                </label>
                            </div>
                            {form.hasWorkedWithFoster === "yes" && (
                                <textarea 
                                    name="fosterExperience"
                                    placeholder="Please describe your previous experience working with foster organizations, animals, or volunteers..."
                                    value={form.fosterExperience}
                                    onChange={handleChange}
                                    className="input w-full"
                                    rows="3"
                                />
                            )}
                        </div>
                        
                        <div>
                            <label htmlFor="hasrescue" className="block text-sm font-medium-text-gray-700 mb-1">Have you ever worked with a rescue group before?</label>
                            <div className="flex gap-4 mb-2">
                                <label className="flex items-center">
                                    <input 
                                        type="radio" 
                                        name="hasWorkedWithRescue"
                                        value="yes"
                                        checked={form.hasWorkedWithRescue === "yes"}
                                        onChange={handleChange}
                                        className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                                    />  
                                    Yes
                                </label>
                                <label className="flex items-center">
                                    <input 
                                        type="radio" 
                                        name="hasWorkedWithRescue"
                                        value="no"
                                        checked={form.hasWorkedWithRescue === "no"}
                                        onChange={handleChange}
                                        className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                                    />
                                    No
                                </label>
                            </div>
                            {form.hasWorkedWithRescue === "yes" && (
                                <textarea 
                                    name="rescueExperience"
                                    placeholder="Please describe your experience with rescue groups..."
                                    value={form.rescueExperience}
                                    onChange={handleChange}
                                    className="input w-full"
                                    rows="3"
                                />
                            )}
                        </div>
                        
                        <div>
                            <label htmlFor="hasanimals" className="block text-sm font-medium-text-gray-700 mb-1">Do you have experience with dogs and/or cats?</label>
                            <div className="flex gap-4 mb-2">
                                <label className="flex items-center">
                                    <input 
                                        type="radio" 
                                        name="hasAnimalExperience"
                                        value="yes"
                                        checked={form.hasAnimalExperience === "yes"}
                                        onChange={handleChange}
                                        className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                                    />  
                                    Yes
                                </label>
                                <label className="flex items-center">
                                    <input 
                                        type="radio" 
                                        name="hasAnimalExperience"
                                        value="no"
                                        checked={form.hasAnimalExperience === "no"}
                                        onChange={handleChange}
                                        className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                                    />
                                    No
                                </label>
                            </div>
                            {form.hasAnimalExperience === "yes" && (
                                <textarea 
                                    name="animalExperience"
                                    placeholder="Please describe your experience with dogs and/or cats (breeding, raising, training, medical care, etc.)"
                                    value={form.animalExperience}
                                    onChange={handleChange}
                                    className="input w-full"
                                    rows="3"
                                />
                            )}
                        </div>
                    </div>
                </div>

                {/* Foster-specific Household Information */}
                {role === "foster" && (
                    <div className="bg-gray-50 p-2 rounded-lg">
                        <h3 className="text-xl font-semibold mb-2">Household Information</h3>
                        <div className="space-y-3">
                            <div>
                                <label htmlFor="haschildren" className="block text-sm font-medium-text-gray-700 mb-1">Do you have children?</label>
                                <div className="flex gap-4 mb-2">
                                    <label className="flex items-center">
                                        <input 
                                            type="radio" 
                                            name="hasChildren"
                                            value="yes"
                                            checked={form.hasChildren === "yes"}
                                            onChange={handleChange}
                                            className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                                        />  
                                        Yes
                                    </label>
                                    <label className="flex items-center">
                                        <input 
                                            type="radio" 
                                            name="hasChildren"
                                            value="no"
                                            checked={form.hasChildren === "no"}
                                            onChange={handleChange}
                                            className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                                        />
                                        No
                                    </label>
                                </div>
                                {form.hasChildren === "yes" && (
                                    <textarea 
                                        name="childrenDetails"
                                        placeholder="Please describe their ages and experience with animals..."
                                        value={form.childrenDetails}
                                        onChange={handleChange}
                                        className="input w-full"
                                        rows="3"
                                    />
                                )}
                            </div>
                            
                            <div>
                                <label htmlFor="haspets" className="block text-sm font-medium-text-gray-700 mb-1">Do you have any pets?</label>
                                <div className="flex gap-4 mb-2">
                                    <label className="flex items-center">
                                        <input 
                                            type="radio" 
                                            name="hasPets"
                                            value="yes"
                                            checked={form.hasPets === "yes"}
                                            onChange={handleChange}
                                            className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                                        />  
                                        Yes
                                    </label>
                                    <label className="flex items-center">
                                        <input 
                                            type="radio" 
                                            name="hasPets"
                                            value="no"
                                            checked={form.hasPets === "no"}
                                            onChange={handleChange}
                                            className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                                        />
                                        No
                                    </label>
                                </div>
                                {form.hasPets === "yes" && (
                                    <textarea 
                                        name="petsDetails"
                                        placeholder="Please describe their ages, breeds, and experience with other animals..."
                                        value={form.petsDetails}
                                        onChange={handleChange}
                                        className="input w-full"
                                        rows="3"
                                    />
                                )}
                            </div>
                            <div>
                                <label htmlFor="space" className="block text-sm font-medium-text-gray-700 mb-1">Describe the space you have to foster animals</label>
                                <textarea 
                                        name="spaceDetails"
                                        placeholder="Please describe the space you have available for fostering animals..."
                                        value={form.spaceDetails}
                                        onChange={handleChange}
                                        className="input w-full"
                                        rows="3"
                                    />
                            </div>
                        </div>
                    </div>
                )}

                {/* Additional Information */}
                <div className="bg-gray-50 p-2 rounded-lg">
                    <h3 className="text-xl font-semibold mb-2">Additional Information</h3>
                    <div>
                        <label htmlFor="extra" className="block text-sm font-medium-text-gray-700 mb-1">Anything Else?</label>
                        <textarea 
                            name="extra"
                            placeholder="Anything else you would like us to know?"
                            value={form.extra}
                            onChange={handleChange}
                            className="input w-full"
                            rows="3"
                        />
                    </div>
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
        
    )
}
