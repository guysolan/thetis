import { Tabs, TabsList, TabsTrigger, TabsContent } from "@thetis/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@thetis/ui/dialog";
import { useState } from "react";

const packSizes = [
  {
    name: "Starter Pack",
    quantity: 18,
    total: 18 * 73,
    value: "starter",
    splints: {
      smallLeft: { qty: 3, name: "Small Left Splints" },
      smallRight: { qty: 3, name: "Small Right Splints" },
      largeLeft: { qty: 6, name: "Large Left Splints" },
      largeRight: { qty: 6, name: "Large Right Splints" },
    },
  },
  {
    name: "Standard Pack",
    quantity: 36,
    total: 36 * 73,
    value: "standard",
    splints: {
      smallLeft: { qty: 6, name: "Small Left Splints" },
      smallRight: { qty: 6, name: "Small Right Splints" },
      largeLeft: { qty: 12, name: "Large Left Splints" },
      largeRight: { qty: 12, name: "Large Right Splints" },
    },
  },
  {
    name: "Department Pack",
    quantity: 72,
    total: 72 * 73,
    value: "department",
    splints: {
      smallLeft: { qty: 12, name: "Small Left Splints" },
      smallRight: { qty: 12, name: "Small Right Splints" },
      largeLeft: { qty: 24, name: "Large Left Splints" },
      largeRight: { qty: 24, name: "Large Right Splints" },
    },
  },
];

const reimbursementInfo = {
  code: "L4350",
  description: "Ankle Control Orthosis",
  averageReimbursement: "$89.75",
};

export default function OrderTabs() {
  const [selectedPack, setSelectedPack] = useState(packSizes[0]);

  return (
    <Tabs
      defaultValue="starter"
      className="w-full"
      onValueChange={(value) => {
        setSelectedPack(
          packSizes.find((pack) => pack.value === value) || packSizes[0],
        );
      }}
    >
      <TabsList className="grid grid-cols-3 bg-gray-100/80 mb-8 p-1 rounded-sm w-full">
        {packSizes.map((pack) => (
          <TabsTrigger
            key={pack.value}
            value={pack.value}
            className="data-[state=active]:bg-primary py-6 rounded-sm data-[state=active]:text-white text-lg transition-all"
          >
            {pack.name}
          </TabsTrigger>
        ))}
      </TabsList>

      <div className="bg-blue-50 mb-8 p-5 border border-blue-200 rounded-sm">
        <div className="flex items-center">
          <div className="bg-blue-100 mr-4 p-3 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 text-blue-700"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div>
            <h3 className="font-bold text-blue-800">
              Reimbursement Information
            </h3>
            <p className="text-blue-700">
              HCPCS Code:{" "}
              <span className="font-semibold">{reimbursementInfo.code}</span> -{" "}
              {reimbursementInfo.description}
            </p>
            <p className="text-blue-700">
              Average Reimbursement:{" "}
              <span className="font-semibold">
                {reimbursementInfo.averageReimbursement}
              </span>
            </p>
          </div>
        </div>
      </div>

      {packSizes.map((pack) => (
        <TabsContent key={pack.value} value={pack.value}>
          <div className="items-start gap-8 grid md:grid-cols-2">
            <div className="relative">
              <img
                src="/images/night-splint.png"
                alt="Achilles Tendon Splint"
                className="shadow-lg rounded-sm"
              />
              <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 to-transparent rounded-sm">
                <div className="p-6 text-white">
                  <p className="mb-2 font-bold text-3xl">
                    {pack.quantity} Units
                  </p>
                  <p className="opacity-90 text-xl">Total: ${pack.total}</p>
                </div>
              </div>
            </div>

            <div className="bg-white shadow-lg rounded-sm overflow-hidden">
              <div className="p-6 border-b">
                <h3 className="mb-4 font-bold text-2xl">ER & Splint Pack</h3>
                <p className="mb-4 text-gray-600">
                  Our medical-grade Achilles tendon splints are designed for:
                </p>
                <ul className="space-y-2 mb-6 text-gray-600">
                  <li className="flex items-center">
                    <svg
                      className="mr-2 w-5 h-5 text-primary"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Emergency department initial treatment
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="mr-2 w-5 h-5 text-primary"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Overnight protection during recovery
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="mr-2 w-5 h-5 text-primary"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Preventing reinjury of healing tendons
                  </li>
                </ul>

                <h4 className="mb-2 font-semibold text-lg">Pack Contents:</h4>
                {Object.entries(pack.splints).map(([key, { qty, name }]) => (
                  <div
                    key={key}
                    className="flex items-center py-3 last:border-0 border-b"
                  >
                    <div className="flex-1">
                      <p className="font-medium">{name}</p>
                    </div>
                    <div className="font-bold text-primary text-lg">{qty}x</div>
                  </div>
                ))}
              </div>

              <OrderDialog pack={pack} />
            </div>
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
}

function OrderDialog({ pack }: { pack: (typeof packSizes)[0] }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button
          type="button"
          className="bg-primary hover:bg-primary/90 py-4 w-full font-medium text-white text-lg transition-colors"
        >
          Start Order Process
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>First-Time Order Request</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div>
            <label className="block mb-1 font-medium text-sm">
              Healthcare Facility Name
            </label>
            <input
              type="text"
              required
              className="p-2 border rounded-sm w-full"
              placeholder="Hospital or Clinic Name"
            />
          </div>
          <div className="gap-4 grid grid-cols-2">
            <div>
              <label className="block mb-1 font-medium text-sm">
                Contact Person
              </label>
              <input
                type="text"
                required
                className="p-2 border rounded-sm w-full"
                placeholder="Full Name"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium text-sm">
                Department
              </label>
              <input
                type="text"
                required
                className="p-2 border rounded-sm w-full"
                placeholder="e.g., Emergency, Orthopedics"
              />
            </div>
          </div>
          <div>
            <label className="block mb-1 font-medium text-sm">Email</label>
            <input
              type="email"
              required
              className="p-2 border rounded-sm w-full"
              placeholder="professional email"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium text-sm">
              Phone Number
            </label>
            <input
              type="tel"
              required
              className="p-2 border rounded-sm w-full"
              placeholder="For order verification"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium text-sm">
              Delivery Address
            </label>
            <textarea
              required
              className="p-2 border rounded-sm w-full"
              rows={3}
              placeholder="Full shipping address"
            />
          </div>
          <div className="bg-gray-50 p-3 rounded-sm text-gray-600 text-sm">
            <p>
              By submitting this form, you're requesting information about our{" "}
              {pack.name.toLowerCase()}. Our team will contact you within one
              business day to discuss payment options and confirm your order
              details.
            </p>
          </div>
          <button
            type="submit"
            className="bg-primary hover:bg-primary/90 py-3 rounded-sm w-full text-white transition-colors"
          >
            Submit Request
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
