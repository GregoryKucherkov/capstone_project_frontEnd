import { Exercises } from "@/modules/landing/components/exercises/Exercises"
import { Features } from "@/modules/landing/components/features/Features"
import { Hero } from "@/modules/landing/components/hero/Hero"
import { Testimonials } from "@/modules/landing/components/testimonials/Testimonials"
import testimonialsData from "./api/testimonials.json";


// . Social Layer / Community (The "Trust" Section)
// Social Proof (Testimonials)

export const Landing = () => {
    return(
        <>
            <Hero/>
            <Exercises/>
            <Features/>
            <Testimonials data={testimonialsData}/>
        </>
    )
}