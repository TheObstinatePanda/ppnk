"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "./ui/button"
import { useAuth } from "../../context/auth-context"
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet"
import { Menu } from "lucide-react"
import Image from "next/image"

export default function Header() {
    const { isAuthenticated, logout } = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const closeMenu = () => setIsMenuOpen(false);

    return (
        <header className = "sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60" >
            <div className = "container flex h-16 items-center justify-between">
                <div className = "flex items-center gap-2 ml-[20rem]">
                    <Link href = "/" className = "flex items-center gap-2">
                        <Image src = "/images/logo.png" alt = "PPNK logo" width = {40} height = {40} className = "font-bold text-xl"/>
                        <span className = "font-bold text-xl">PPNK</span>
                    </Link>
                </div>

                {/* Desktop Navigation */}
                <nav className = "hidden md:flex items-center gap-6">
                    <Link href = "/" className = "text-sm font-medium transition-colors hover:text-primary">
                        Home
                    </Link>
                    <Link href = "/dogs" className = "text-sm font-medium transition-colors hover:text-primary">
                        Dogs
                    </Link>
                    <Link href = "/cats" className = "text-sm font-medium transition-colors hover:text-primary">
                        Cats
                    </Link>
                    <Link href = "/success" className = "text-sm font-medium transition-colors hover:text-primary">
                        Success Stories
                    </Link>
                    <Link href = "/volunteer" className = "text-sm font-medium transition-colors hover:text-primary">
                        Volunteer
                    </Link>
                    <Link href = "https://www.paypal.com/donate?token=mce0OJ7q6Z7Rv0DFzIf_ZK-xlrZxqXR2zKfspZbg04WU3MzemUlJEuf55B3esOcXB7RuIBp1F1YwS5F3" target = "blank" className = "text-sm font-medium transition-colors hover:text-primary">
                        Donate
                    </Link>

                    {isAuthenticated ? (
                        <>
                            <Button asChild variant = "ghost">
                                <Link href = "/dashboard">Dashboard</Link>
                            </Button>
                            <Button variant = "outline" onClick = {logout}>
                                Logout
                            </Button>
                        </>
                    ) : (
                        <Button asChild>
                            <Link href = "/login">Foster Login</Link>
                        </Button>
                    )}
                </nav>

                {/* Mobile Navigation
                <Sheet open = {isMenuOpen} onOpenChange = {setIsMenuOpen}>
                    <SheetTrigger asChild className = "md:hidden">
                        <Button variant = "ghost" size = "icon">
                            <Menu className = "h-6 w-6" />
                            <span className = "sr-only">Toggle Menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side ="right" className = "w-[300px] sm:w-[400px]">
                        <div className = "flex flex-col gap-6 pt-6">
                            <Link href = "/" className = "text-lg font-medium transition-colors hover:text-primary" onClick={closeMenu}>
                                Home
                            </Link>
                            <Link href = "/dogs" className = "text-lg font-medium transition-colors hover:text-primary" onClick={closeMenu}>
                                Dogs
                            </Link>
                            <Link href = "/cats" className = "text-lg font-medium transition-colors hover:text-primary" onClick={closeMenu}>
                                Cats
                            </Link>
                            <Link href = "/success" className = "text-lg font-medium transition-colors hover:text-primary" onClick={closeMenu}>
                                Success Stories
                            </Link>
                            <Link href = "/volunteer" className = "text-lg font-medium transition-colors hover:text-primary" onClick={closeMenu}>
                                Volunteer
                            </Link>
                            <Link href = "/donate" className = "text-lg font-medium transition-colors hover:text-primary" onClick={closeMenu}>
                                Donate
                            </Link>
                           
                            {isAuthenticated ? (
                                <>
                                    <Link 
                                        href = "/dashboard"
                                        className = "text-lg font-medium transition-colors hover:text-primary" 
                                        onClick={closeMenu}
                                    >
                                        Dashboard
                                    </Link>
                                    <Button 
                                        variant = "outline"
                                        onClick = {() => {
                                            logout()
                                            closeMenu()
                                        }}
                                    >
                                        Logout
                                    </Button>
                                </>
                            ) : (
                                <Button asChild onClick = {closeMenu}>
                                    <Link href = "/login">Foster Login</Link>
                                </Button>
                            )}
                        </div>
                    </SheetContent>
                </Sheet> */}
            </div>
        </header>
    )
}

