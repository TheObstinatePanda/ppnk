"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { mockUsers } from "./logincreds.js";

const initState = {
    email: "",
    password: "",
};

export default function login() {
const [form, setForm] = useState(initState);
const [error, setError] = useState(null);
const router = useRouter();

const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(f => ({
        ...f,
        [name]: value
    }))
}
const handleSubmit = async (e) => {
    e.preventDefault();
    const found = mockUsers.find(
        user => user.email === form.email && user.password === form.password
    )
    if (found) {
        setError("");
        alert("Login successful!");
        router.push("/dashboard");
    } else {
        setError("Invalid email or password. Please try again.");
    }
};

    return (
        <div className = "container max-w-xl mx-auto px-4 p-8">
            <h2 className = "text-2xl font-bold mb-4 text-center">Foster's Login</h2>
            <form className = "flex flex-col gap-y-4" onSubmit = {handleSubmit}>
                <label className = "flex flex-col">
                    <span className = "mb-2">Email</span>
                    <input 
                        type = "email"
                        name = "email"
                        required 
                        className = "border border-gray-300 rounded p-2"
                        onChange = {handleChange}
                    />
                </label>
                <label className = "flex flex-col">
                    <span className = "mb-2">Password</span>
                    <input 
                        type = "password" 
                        name = "password" required 
                        className = "border border-gray-300 rounded p-2"
                        onChange = {handleChange}
                    />
                </label>
                {error && (
                    <div className = "text-red-500 text-center">{error}</div>
                )}
                <button type = "submit" className = "mt-4">Login</button>
            </form>
        </div>
    )
}