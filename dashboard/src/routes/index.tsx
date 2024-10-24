import { createFileRoute } from '@tanstack/react-router'
import PageTitle from '../components/PageTitle'
import { Banknote, Blend, Box, ExternalLink, Factory, Pin, Printer, Recycle, ShoppingBag, ToyBrick, Truck, Warehouse } from 'lucide-react'
import { Link } from '@tanstack/react-router'
import { Route as SettlementsRoute } from '@/routes/finances/amazon/settlements/index'

const jobs = {
  stock: [

     {
      name: 'Orders',
      href: '/stock/orders',
      description: 'Buy, sell and ship orders.',
      icon: <ShoppingBag />,
      external: false,
    },
      {
      name: 'Items',
      href: '/stock/items',
      description: 'Keep track of the items we buy and sell.',
      icon: <ToyBrick />,
      external: false,
    },
          {
      name: 'Warehouses',
      href: '/stock/warehouses',
      description: 'Manage the warehouses.',
      icon: <Warehouse />,
    },
  ],
   finances: [

     {
      name: 'Settlements',
      href: '/finances/amazon/settlements',
      description: 'Payouts from Amazon.',
      icon: <Banknote />,
      external: false,
    },
     
  ],
  returns: [
    {
      name: 'Stackery',
      href: 'https://stackry.com',
      description: 'Stackry unpack and return rejected splints in the US.',
      icon: <Recycle />,
      external: true,
    },
  ],
  shipping: [
    {
      name: 'UPS',
      href: 'https://www.ups.com',
      description: 'UPS is a package delivery and shipping company.',
      icon: <Box />,
    },
    {
      name: 'P4D',
      href: 'https://www.p4d.co.uk/',
      description: 'Pallets in the UK to ship parts to MPD.',
      icon: <Truck />,
      external: true,
    },
  ],
  suppliers: [
    {
      name: 'MPD',
      href: 'https://www.mpd.co.uk/',
      description: 'MPD assembles the parts.',
      icon: <Pin />,
    },
    {
      name: 'Stretchline',
      href: 'https://www.stretchline.com/',
      description: 'Stretchline manufactures the elastic with silicone.',
      icon: <Blend />,
      external: true,
    },
    {
      name: 'M Wright and Sons',
      href: 'https://www.mwright.co.uk/',
      description: 'Manufactures webbing.',
      icon: <Factory />,
      external: true,
    },
    {
      name: 'Hello Print',
      href: 'https://www.helloprint.co.uk/',
      description: 'Prints the instructions, business cards and fliers.',
      icon: <Printer />,
      external: true,
    },
  ],
}

export const Route = createFileRoute('/')({
  component: () => (
    <section className="px-8 py-4">
      <PageTitle title="Home"></PageTitle>
      <div className="flex flex-col gap-4">
        {Object.entries(jobs).map(([category, jobList]) => (
          <div key={category} className="flex flex-col justify-start items-start space-y-2">
            <h2 className="font-bold text-xl capitalize">{category}</h2>
            <ul className="flex flex-wrap gap-4">
              {jobList.map((job) => (
                <li key={job.name}>
                  <Link
                    to={job.href}
                    className="flex items-center bg-white hover:bg-neutral-50 p-3 border rounded-lg max-w-md text-sm transition-colors"
                    target={job.external ? "_blank" : '_self'}
                    rel={job.external ? "noopener noreferrer" : ''}
                  >
                    <span className="mr-2">{job.icon}</span>
                    <div >
                      <h3 className="flex justify-between gap-4 w-full font-semibold text-md">{job.name}{job.external && <ExternalLink className="w-4 h-4" />}</h3>
                      <p className="text-neutral-600 text-sm">{job.description}</p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  ),
})
