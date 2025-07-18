import { mockAnimals } from './mockAnimals.js';

export async function fetchAvailAnimals() {
    // Simulating network request w/ delay (will be repeated in other mock functions)
    await new Promise((res) => setTimeout(res, 500));
    return mockAnimals.filter((animal) => animal.is_available && !animal.is_adopted);
}

export async function fetchDogs() {
    await new Promise((res) => setTimeout(res, 500));
    return mockAnimals.filter((animal) => animal.is_dog && animal.is_Available && !animal.is_adopted);
}

export async function fetchCats() {
    await new Promise((res) => setTimeout(res, 500));
    return mockAnimals.filter((animal) => animal.cat && animal.is_Available && !animal.is_adopted);
}

export async function loginUser(email, password) {
    const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-type': 'application/json'},
        body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
        throw new Error('Login failed');
    }

    return res.json();
};

export async function logoutUser() {
    // Clear the token from local storage of cookies
    localStorage.removeItem('authToken');
};

export async function getCurrentUser() {
    const res = await fetch('/api/current-user', {
        method: 'GET',
        headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` },
    });

    if (!res.ok) {
        throw new Error('Failed to fetch current user');
    }

    return res.json(); // Return the user data
}