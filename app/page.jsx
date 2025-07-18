import { Button } from "../View/App/components/ui/button";
import { Card, CardContent } from "../View/App/components/ui/card";
import AnimalCarousel from "../View/App/components/animal-carousel";
import SuccessStories from "../View/App/components/success-stories";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
    return (
        <div className = "container mx-auto px-4 py-8">
            {/* Hero Section w/ Animal Slideshow */}
            <section className = "mb-12">
                <h1 className = "text-4xl md:text-5xl font-bold mb-4 text-center">Welcome to Pound Puppies and Kittens</h1>
                <p className = "text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-center">Helping pets find their forever homes</p>
                <AnimalCarousel />
                <div className = "flex flex-wrap gap-4 justify-center mt-6">
                    <Button asChild size = "lg" className = "bg-pink-600 hover:bg-pink-700">
                        <Link href = "/dogs">Adopt a Dog</Link>
                    </Button>
                    <Button asChild size = "lg" className = "bg-purple-600 hover:bg-purple-700">
                        <Link href = "/cats">Adopt a Cats</Link>
                    </Button>
                </div>
            </section>

            {/* About Section */}
            <section className = "mb-16">
                <h2 className = "text-3xl font-bold mb-6 text-center">About PPNK</h2>
                <div className = "grid md:grid-cols-2 gap-8 items-center">
                    <div>
                        <p className="text-lg mb-4">
                            Pound Puppies and Kittens is a licensed 501(c)(3) non-profit corporation dedicated to rescuing, rehabilitating, and rehoming abandoned and neglected pets in our community.
                        </p>
                        <p className="text-lg mb-4">
                            Working with several counties Animal Control east of metro Atlanta we have been able to rescue and rehabilitate thousands of animals. We have a network of dedicated foster families who provice temporary care for our rescues until they find their forever homes.
                        </p>
                        <p className="text-lg mb-4">
                            While in our care, all animals recieve professional vetinary attention including testing, vaccination, deworming, food and water. Also, we provide spay/neuter services to all animals before they are adopted.
                        </p>
                        <p className = "text-lg mb-4">
                            We hold adoption events for our cats and dogs at local Petsmart locations. After your application for adoption is accepted the foster family will provide the precise location, date and time where adoptions for your requested animal is being held. We believe every animal deserves a chance at a happy life, and we work tirelessly to make that possible through adoption events, community education, and partnerships with local veterinarians.
                        </p>
                        <Button asChild className = "mt-2">
                            <Link href = "/donate"> Support Our Foster Families </Link>
                        </Button>
                    </div>
                    <div className = "rounded-lg overflow-hidden">
                        <Image
                            src = "/placeholder.svg?height=400&width=600"
                            alt = "PPNK volunteers with pets"
                            width = { 600 }
                            height = { 400 }
                            className = "w-full h-auto"
                        />
                    </div>
                </div>
            </section>

            {/* Available Animals Carousel */}
            <section className = "mb-16">
                <h2 className = "text-3xl font-bold mb-6 text-center"> Meet our Available Pets </h2>
                <AnimalCarousel />
                <div className = "flex justify-center mt-8 gap-4">
                    <Button asChild variant = "outline">
                        <Link href = "/dogs">See all of our available Dogs</Link>
                    </Button>
                    <Button asChild variant = "outline">
                        <Link href = "/cats">See all of our available Cats</Link>
                    </Button>
                </div>
            </section>

            {/* Success Stories */}
            <section className = "mb-16">
                <h2 className = "text-3xl font-bold mb-6 text-center"> Success Stories </h2>
                <SuccessStories />
                <div className = "flex justify-center mt-8">
                    <Button asChild variant = "outline">
                        <Link href = "/success-stories">Read More of our Success Stories</Link>
                    </Button>
                </div>
            </section> 

            {/* How to help */}
            <section className = "mb-16">
                <h2 className = "text-3xl font-bold mb-8 text-center"> How You Can Help</h2>
                <div className = "grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card>
                        <CardContent className = "pt-6">
                            <h3 className = "text-xl font-bold mb-2">Adopt</h3>
                            <p className = "mb-4">Give a loving home to one of our rescued <Link href="/cats">cats</Link> or <Link href="/dogs">dogs</Link> and change their lives forever.</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className = "pt-6">
                            <h3 className = "text-xl font-bold mb-2">Donate</h3>
                            <p className = "mb-4">
                                As a non-profit organization, we operate soley on funding from our adoption fees and donations (your donations are tax-deductable!). This funding goes soley to the vetinary services we provide our animals including vaccinations, medications, food, and more. Every penny is stretched to the maximum so any donation made is graciously appreciated.
                            </p>
                            <p className = "mb-4">
                                Through your generous donations, you have helped us save thousands of lives!
                            </p>
                            <Button asChild variant = "outline" className = "w-full">
                                <Link href = "/donate">Make a Donation</Link>
                            </Button>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className = "pt-6">
                            <h3 className = "text-xl font-bold mb-2">Become a Foster</h3>
                            <p className = "mb-4">
                                Fostering is a rewarding experience that allows you to make a difference in the lives of animals in need. By providing a temporary home, you help them adjust to life outside of a shelter and prepare them for adoption. Click the link below to learn more about becoming a foster parent.
                            </p>
                            <Button asChild variants = "outline" className = "w-full">
                                <Link href = "/foster">Become a Foster</Link>
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </section>
        </div>
    )
}