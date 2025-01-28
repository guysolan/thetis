import JamesDavis from "./images/james-davis.png";
import RobbieRay from "./images/robbie-ray.png";
import IanGill from "./images/ian-gill.png";
import MattWelck from "./images/matt-welck.png";
import SohailYousaf from "./images/sohail-yousaf.png";
import AndyRoche from "./images/andy-roche.jpg";
import type { Review } from "../types";

export const clinicians: Review[] = [
    {
        name: "Mr James Davis",
        link: "https://www.londonfootandanklecentre.co.uk/staff/james-davis/",
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
        name: "Dr Robbie Ray",
        link: "https://www.drrobbieray.com/",
        description: "Foot and Ankle Surgeon",
        image: RobbieRay,
        title: "Setting a new standard in Achilles tendon rehabilitation",
        short: "Setting a new standard in Achilles tendon rehabilitation",
        body:
            `As a foot and ankle specialist, I am always on the lookout for innovative tools that can improve patient outcomes. The Thetis Medical Achilles Repair Splint has proven to be a game-changer in my practice. It is truly unique, being the only splint of its kind on the market, and I have used it with great success in the rehabilitation of my patients following Achilles tendon ruptures.

The splint's design prioritizes both comfort and functionality, enabling controlled, progressive recovery. My patients consistently report reduced discomfort and better sleep as they really appreciate the accelerated removal of immobilisation at night time. The adjustable features allow for a customized fit, which is essential for addressing the specific anatomical shape of each individual patients leg.

I have found the Thetis splint particularly effective in bridging the gap between immobilization and active recovery. It provides the necessary support to allow early removal of immobilisation at night, helping to reduce complications of uncontrolled movement and accelerate healing. Its durability and ease of use also make it a practical choice for both patients and clinicians.

I highly recommend the Thetis Medical Achilles Repair Splint to colleagues and patients alike. It has become an indispensable part of my treatment protocol, and I am confident it will continue to set a new standard in Achilles tendon rehabilitation.`,
        country: "GB",
    },
    {
        name: "Mr Matthew Welck",
        link: "https://matthewwelck.com/",
        description: "Foot and Ankle Surgeon",
        image: MattWelck,
        title: "An excellent piece of equipment",
        short: "An excellent piece of equipment",
        body:
            "I have been recommending the Achilles rupture night splint to my patients for over a year. The feedback has been excellent. Patients sometimes find sleeping in a boot uncomfortable, and having an alternative, more lightweight option is well received. My patients have also used it to protect the foot and enable some time outside of the boot. I think it is an excellent piece of equipment that can make recovery from a difficult condition more user-friendly.",
        country: "GB",
    },
    {
        name: "Mr Ian Gill",
        link: "https://www.footsurgerykingston.com/",
        description: "Foot and Ankle Surgeon",
        image: IanGill,
        title: "Get a good night's sleep!",
        short: "Worth Every Penny",
        body:
            "I've been recommending the Thetis night time splint for all my ruptured Achilles patients for two years now. It is worth every penny as it stops the misery of trying to get good nights sleep in an uncomfortable boot !",
        country: "GB",
    },
    {
        name: "Mr Sohail Yousaf",
        link: "https://www.sohailyousaf.com/",
        description: "Foot and Ankle Surgeon",
        image: SohailYousaf,
        title: "Excellent tool for enhancing recovery and comfort",
        short: "Lightweight and effective for sleep and protection",
        body:
            "Thetis night-time splint are excellent tools for enhancing recovery and patient comfort. My patients have had a very positive experience. Lightweight and effective, it provide relief during sleep and protect the foot outside the boot. Highly recommended to improve compliance and recovery outcomes.",
        country: "GB",
    },
    {
        name: "Mr Andy Roche",
        link: "https://www.londonorthopaedicsurgery.co.uk/mr-andy-roche/",
        country: "GB",
        image: AndyRoche,
        description: "Foot and Ankle Surgeon",
        title: "Comfort and usability all round.",
        short: "It makes complete sense to use a product like this",
        body:
            "I came across this device, not too long ago and feel it has really helped my patients recover from Achilles tendon ruptures. Makes complete sense to use something like this and I highly recommend this product. Comfort and usability all round.",
    },
];
