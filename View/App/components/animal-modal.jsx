import React from 'react';
import { Dialog } from '@headlessui/react';
import AnimalGallery from './animal-gallery';

export default function AnimalModal({ animal, open, onClose, startImageIdx = 0 }) {
    if (!animal) return null;

    return (
        <Dialog open = {open} onClose = {onClose} className = "fixed inset-0 z-50 flex items-center bg-black/70">
            <div className = "bg-white rounded-lg max-w-2xl w-full p-6 relative">
                <button onClick = {onClose} className= "absolute top-2 right-2">X</button>
                <AnimalGallery images = {animal.images} startIdx = {startImageIdx} />
                <h2 className = "text-2xl font-bold mt-4">{animal.name}</h2>
                <p>{animal.description}</p>
            </div>
        </Dialog>
    )
}