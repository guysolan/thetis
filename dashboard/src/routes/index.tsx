import { createFileRoute } from '@tanstack/react-router'
import PageTitle from '../components/PageTitle'
import { Banknote, Blend, Box, Factory, Pin, Printer, Recycle, ShoppingBag, ToyBrick, Truck, Warehouse } from 'lucide-react'
import { Link } from '@tanstack/react-router'

const jobs = {
  stock: [

     {
      name: 'Orders',
      href: '/stock/orders',
      description: 'Buy, sell and ship orders.',
      icon: <ShoppingBag />,
    },
      {
      name: 'Items',
      href: '/stock/items',
      description: 'Keep track of the items we buy and sell.',
      icon: <ToyBrick />,
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
    },
     
  ],
  returns: [
    {
      name: 'Stackery',
      href: 'https://stackry.com',
      description: 'Stackry unpack and return rejected splints in the US.',
      icon: <Recycle />,
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
    },
    {
      name: 'M Wright and Sons',
      href: 'https://www.mwright.co.uk/',
      description: 'Manufactures webbing.',
      icon: <Factory />,
    },
    {
      name: 'Hello Print',
      href: 'https://www.helloprint.co.uk/',
      description: 'Prints the instructions, business cards and fliers.',
      icon: <Printer />,
    },
  ],
}

export const Route = createFileRoute('/')({
  component: () => (
    <section className="px-8 py-4">
      <PageTitle title="Home"></PageTitle>
      <div className="gap-4 grid">
        {Object.entries(jobs).map(([category, jobList]) => (
          <div key={category} className="space-y-2">
            <h2 className="font-bold text-xl capitalize">{category}</h2>
            <ul className="flex flex-wrap gap-4">
              {jobList.map((job) => (
                <li key={job.name}>
                  <Link
                    to={job.href}
                    className="flex items-center hover:bg-gray-100 p-3 border rounded-lg max-w-md text-sm transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="mr-2">{job.icon}</span>
                    <div>
                      <h3 className="font-semibold">{job.name}</h3>
                      <p className="text-gray-600 text-sm">{job.description}</p>
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
