"use client";

import React, { useState } from "react";
import Image from "next/image";

export default function AnimalGallery({ images = [], onImageClick, startIdx = 0 }) {
    const [idx, setIdx] = useState(startIdx);
    const [showOverlay, setShowOverlay] = useState(false);

    if (images.length === 0 || !images) {
        return (
            <div classname = "w-full h-48 flex items-center justfy-center bg-muted rounded">
                <span>Waiting on images for this pet</span>
            </div>
        );
    }

    const prev = () => setIdx((i) => (i === 0 ? images.length -1 : i - 1));
    const next = () => setIdx((i) => (i === images.length -1 ? 0 : i + 1));

    return (
        <div className = "w-full flex flex-col items-center">
            <div className = "relative w-96 h-64 flex items-center justify-center">
                <button
                    onClick = {prev}
                    className = "absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-1 shadow hover:bg-white"
                    aria-label = "Previous Image"
                >
                    &#8592;
                </button>

                <div className = "relative w-56 h-64 cursor-pointer" onClick={ () =>setShowOverlay(true)}>
                    <Image 
                        src = {images[idx]}
                        alt = {`Animal image ${idx + 1}`}
                        fill
                        className = "object-cover rounded"
                        priority = {idx === 0}
                    />
                </div>
                <button
                    onClick = {next}
                    className = "absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-1 shadow hover:bg-white"
                    aria-label = "Next Image"
                >
                    &#8594;
                </button>
            </div>
            <div className = "flex gap-2 mt-2">
                {images.map((img, i) => (
                    <button
                        key = {img}
                        className = {`w-18 h-18 rounded overflow-hidden border-2 ${i == idx ? "border-primary" : "border-transparent"}`}
                        onClick = { () => setIdx(i)}
                        aria-label = {`Show image ${i + 1}`}
                        type = "button"
                    >
                            <Image
                                src = {img}
                                alt = {`Thumbnail ${i + 1}`}
                                width = {48}
                                height = {48}
                                className = "object-cover w-full h-full"
                            />
                    </button>
                ))}
            </div>
            {showOverlay && (
                <div
                    className = "fixed inset-0 z-50 flex items-center justify-center bg-black/80"
                    onClick={() => setShowOverlay(false)}
                >
                    
                    <div className = "relative w-[600px] h-[400px] flex items-center justify-center" onClick = {e => e.stopPropagation()}>
                        
                        <button
                            onClick = {prev}
                            className = "absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-1 shadow hover:bg-white"
                            aria-label = "Previous Image"
                        >
                            &#8592;
                        </button>
                        <Image 
                            src ={images[idx]}
                            alt = {`Fill size image of ${idx + 1}`}
                            fill
                            className = "object-contain rounded shadow-lg"
                        />
                        <button
                            onClick = {next}
                            className = "absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-1 shadow hover:bg-white"
                            aria-label = "Next Image"
                        >
                            &#8594;
                        </button>
                        <button
                            className = "absolute top-2 right-2 bg-white rounded-full px-2 py-1"
                            onClick={e => {
                                e.stopPropagation();
                                setShowOverlay(false);
                            }}
                        >
                            X
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}