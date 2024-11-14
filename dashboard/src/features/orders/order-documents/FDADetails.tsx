import React from 'react'

const FDADetails = () => {
  return (
    <div className="mt-8 py-4 border-t text-neutral-700 text-sm">
        <h3 className='mb-1 font-medium text-lg text-neutral-900'>FDA Details</h3>
        
        <div className="mb-4">
            <p className="font-medium">Manufacturer's name and complete address:</p>
            <p>THETIS MEDICAL LTD.</p>
            <p>15 Leopold Street</p>
            <p>Birmingham, GB B12 0UP</p>
        </div>

        <div className="mb-4">
            <p className="font-medium">Manufacturer's FDA assigned registration number:</p>
            <p>Registration Number: 3022381831</p>
          </div>
           <div className="mb-4">
            <p className="font-medium">Universal identifier for business entities:</p>
            <p>DUNS: 226324839</p>
          </div>
          



        <div className="mb-4">
            <p className="font-medium">Shipper's FDA-assigned registration number:</p>
            <p>N/A</p>
        </div>

        <div className="mb-4">
            <p className="font-medium">FDA-assigned medical device listing number:</p>
            <p>Device Listing Number: D470976</p>
        </div>

        <div className="mb-4">
            <p className="font-medium">510K number if applicable:</p>
            <p>N/A</p>
        </div>

        <div>
            <p className="font-medium">Owner/Operator:</p>
            <p>Thetis Medical Ltd.</p>
            <p>15 Leopold Street</p>
            <p>Birmingham, GB B12 0UP</p>
            <p>Owner/Operator Number: 10084925</p>
        </div>
    </div>
  )
}

export default FDADetails