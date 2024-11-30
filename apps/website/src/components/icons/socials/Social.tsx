// import { Facebook, Instagram, Linkedin, Mail } from 'lucide-react'
import Facebook from './Facebook'
import Linkedin from './Linkedin'
import Instagram from './Instagram'
import Twitter from './Twitter'
import Mail from './Mail'

const modes = {
    mail: {
        icon: <Mail />,
        // href: 'https://us5.list-manage.com/contact-form?u=c24150147626fd5e19c7684c6&form_id=06069b6e5471c060d76fb6ebe2d5adc7',
        href: 'mailto:info@thetismedical.com',
    },
    facebook: {
        icon: <Facebook />,
        href: 'https://www.facebook.com/thetismedical',
    },
    linkedin: {
        icon: <Linkedin />,
        href: 'https://www.linkedin.com/company/thetis-medical-ltd',
    },
    instagram: {
        icon: <Instagram />,
        href: 'https://www.instagram.com/thetismedical/',
    },
}

interface Props {
    mode: keyof typeof modes
    customLink?: string
    color?: 'white' | 'black'
}

const Social = ({ mode, color, customLink }: Props) => {
    return (
        <a
            className={`h-[40px] w-[40px] aspect-square border-2 ${
                color === 'white' ? 'border-white' : 'border-black'
            } rounded-full flex items-center justify-center`}
            target="_blank"
            href={customLink ? customLink : modes[mode].href}
            aria-label={`Share on ${mode}`}
        >
            {modes[mode].icon}
        </a>
    )
}

export default Social
