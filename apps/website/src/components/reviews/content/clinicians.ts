import JamesDavis from "./images/james-davis.png";
import RobbieRay from "./images/robbie-ray.png";
import MattWelck from "./images/matt-welck.png";
import type { Review } from "../types";

export const clinicians: Review[] = [
    {
        name: "Mr James Davis",
        link: "https://www.jamesdavis.co.uk/",
        description:
            "Past President of the British Orthopaedic Foot and Ankle Society",
        image: JamesDavis,
        title:
            "A fantastic alternative to uncomfortable hospital boots for night wear",
        short:
            "A fantastic alternative to uncomfortable hospital boots for night wear",
        body:
            `When I tore my own Achilles tendon, the hardest part of the recovery was having to wear the hospital boot in bed at night for many weeks. My only option was to make myself a splint using plaster-cast materials and make-shift straps. It is fantastic that Thetis Medical have produced this night-splint. It is certain to improve the recovery experience for patients.`,
        country: "GB",
    },
    {
        name: "Robbie Ray",
        link: "https://www.mattwelck.com/",
        description: "Foot and Ankle Specialist",
        image: RobbieRay,
        title: "A unique innovation in Achilles tendon rehabilitation",
        short: "A game-changing splint for controlled recovery",
        body:
            `As a foot and ankle specialist, I am always on the lookout for innovative tools that can improve patient outcomes. The Thetis Medical Achilles Repair Splint has proven to be a game-changer in my practice. It is truly unique, being the only splint of its kind on the market, and I have used it with great success in the rehabilitation of my patients following Achilles tendon ruptures.

The splint's design prioritizes both comfort and functionality, enabling controlled, progressive recovery. My patients consistently report reduced discomfort and better sleep as they really appreciate the accelerated removal of immobilisation at night time. The adjustable features allow for a customized fit, which is essential for addressing the specific anatomical shape of each individual patients leg.

I have found the Thetis splint particularly effective in bridging the gap between immobilization and active recovery. It provides the necessary support to allow early removal of immobilisation at night, helping to reduce complications of uncontrolled movement and accelerate healing. Its durability and ease of use also make it a practical choice for both patients and clinicians.

I highly recommend the Thetis Medical Achilles Repair Splint to colleagues and patients alike. It has become an indispensable part of my treatment protocol, and I am confident it will continue to set a new standard in Achilles tendon rehabilitation.`,
        country: "GB",
    },
    {
        name: "Dr Matt Welck",
        link: "https://www.mattwelck.com/",
        description: "Foot and Ankle Specialist",
        image: MattWelck,
        title: "A unique innovation in Achilles tendon rehabilitation",
        short: "A game-changing splint for controlled recovery",
        body:
            `I have been recommending the Achilles rupture night splint to my patients for over a year. The feedback has been excellent. Patients sometimes find sleeping in a boot uncomfortable, and having an alternative, more lightweight option is well received. My patients have also used it to protect the foot and enable some time outside of the boot. I think it is an excellent piece of equipment that can make recovery from a difficult condition more user-friendly.`,
        country: "GB",
    },
];
