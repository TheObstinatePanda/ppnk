import Link from "next/link"
import { Facebook, Instagram, Twitter } from "lucide-react"
import Image from "next/image"

export default function Footer() {
    return (
        <footer className = "border-t bg-background">
            <div className = "container px-4 py-8 md:py-12">
                <div className = "grid grid-cols-1 gap-8 md:grid-cols-4">
                    <div className = "flex flex-col gap-2">
                        <Link href = "/" className = "flex items-center gap-2">
                            <Image src = "/images/logo.png" alt = "PPNK Logo" width = {40} height = {40} className = "h-10 w-10" />
                            <span className = "font-bold text-xl">PPNK</span>
                        </Link>
                        <p className = "text-sm text-muted-foreground">
                            Pound Puppies and Kittens is a licensed 501 (c)(3) non-profit coporiation deditacted to saving the lives of dogs and cats. Working with local Animal Control from east-metro Atlanta counties including Walton, Morgan, Newton, Rockdale and Henry.
                        </p>
                    </div>

                    <div>
                        <h3 className = "mb-4 text-sm font-semibold">Quick Links</h3>
                        <ul className = "space-y-2 text-sm">
                            <li>
                                <Link href = "/" className = "text-muted-foreground hover:text-foreground">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link href = "/dogs" className = "text-muted-foreground hover:text-foreground">
                                    Available Dogs
                                </Link>
                            </li>
                            <li>
                                <Link href = "/cats" className = "text-muted-foreground hover:text-foreground">
                                    Available Cats
                                </Link>
                            </li>
                            <li>
                                <Link href = "/success" className = "text-muted-foreground hover:text-foreground">
                                    Success Stories
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className = "mb-4 text-sm font-semibold">Support Us</h3>
                        <ul className = "space-y-2 text-sm">
                            <li>
                                <Link href = "/donate" className = "text-muted-foreground hover:text-foreground">
                                    Donate
                                </Link>
                            </li>
                            <li>
                                <Link href = "/foster" className = "text-muted-foreground hover:text-foreground">
                                    Become a Foster
                                </Link>
                            </li>
                            <li>
                                <Link href = "/volunteer" className = "text-muted-foreground hover:text-foreground">
                                    Volunteer
                                </Link>
                            </li>
                            <li>
                                <Link href = "/events" className = "text-muted-foreground hover:text-foreground">
                                    Events
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className = "mb-4 text-sm font-semibold">Contact</h3>
                        <ul className = "space-y-2 text-sm">
                            <li className = "text-muted-foreground">
                                1200 Industrial Pkwy
                                <br />
                                Loganville, GA 30052
                            </li>
                            <li className = "flex gap-4 mt-4">
                                <Link href = "https://www.facebook.com/poundpuppiesnkittens" className="text-muted-foreground hover:text-foreground">
                                    <Facebook className = "h-5 w-5" />
                                    <span className = "sr-only">Facebook</span>
                                </Link>
                                <Link href = "https://www.instagram.com/pound_puppies_and_kittens/" className = "text-muted-foreground hover:text-foreground">
                                    <Instagram className = "h-5 w-5" />
                                    <span className = "sr-only">Instagram</span>
                                </Link>
                                <Link href = "https://twitter.com/ppnkga" className = "text-muted-foreground hover:text-foreground">
                                    <Twitter className = "h-5 w-5" />
                                    <span className = "sr-only">Twitter</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className = "mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
                    <p>&copy; 2025 Pound Puppies and Kittens. All rights reserved </p>
                </div>
            </div>
        </footer>
    )
}