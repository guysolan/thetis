import JamesDavis from "./images/james-davis.png";
import RobbieRay from "./images/robbie-ray.png";
import type { Review } from "../types";

export const clinicians: Review[] = [
    {
        name: "Mr James Davis",
        description:
            "Past President of the British Orthopaedic Foot and Ankle Society",
        image: JamesDavis,
        title:
            "A fantastic alternative to uncomfortable hospital boots for night wear",
        short:
            "A fantastic alternative to uncomfortable hospital boots for night wear",
        body:
            "When I tore my own Achilles tendon, the hardest part of the recovery was having to wear the hospital boot in bed at night for many weeks. My only option was to make myself a splint using plaster-cast materials and make-shift straps. It is fantastic that Thetis Medical have produced this night-splint. It is certain to improve the recovery experience for patients.",
        country: "GB",
    },
    {
        name: "Robbie Ray",
        description: "Orthopaedic Surgeon",
        image: RobbieRay,
        title: "A great alternative to the hospital boot",
        short: "A great alternative to the hospital boot",
        body:
            "The Thetis Night Splint is a great alternative to the hospital boot. It is comfortable, easy to use, and allows for better sleep and wound breathing. I would highly recommend this product!",
        country: "GB",
    },
];
