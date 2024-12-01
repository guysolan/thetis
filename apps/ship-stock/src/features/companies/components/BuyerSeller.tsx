import React from 'react'
import CompanyAddressContact from './CompanyAddressContact'
const BuyerSeller = () => {
    return (
        <div className="gap-4 grid grid-cols-1 lg:grid-cols-2">
            <CompanyAddressContact
                title="Seller"
                direction="from"
            />

            <CompanyAddressContact
                title="Buyer"
                direction="to"
            />
        </div>
    )
}

export default BuyerSeller