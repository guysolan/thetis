import React from "react";

interface Product {
  name: string;
  grade: 'A' | 'B' | 'C';
  category: string;
  stars: number;
}

const products: Product[] = [
  // Essential Medical Equipment (Grade A)
  { name: 'ROM Walking Boots (VACOped/Aircast)', grade: 'A', category: 'Essential Medical', stars: 5 },
  { name: 'Night Splint (Thetis)', grade: 'A', category: 'Essential Medical', stars: 5 },
  { name: 'Forearm Crutches', grade: 'A', category: 'Essential Medical', stars: 5 },
  
  // Mobility & Comfort (Grade A-B)
  { name: 'EVENup Shoe Leveler', grade: 'A', category: 'Mobility & Comfort', stars: 5 },
  { name: 'Knee Scooter', grade: 'B', category: 'Mobility & Comfort', stars: 4 },
  { name: 'Heel Lifts', grade: 'B', category: 'Mobility & Comfort', stars: 4 },
  
  // Recovery & Rehabilitation (Grade A-B)
  { name: 'Resistance Bands', grade: 'A', category: 'Recovery & Rehab', stars: 5 },
  { name: 'Cold Therapy Systems', grade: 'B', category: 'Recovery & Rehab', stars: 4 },
  { name: 'Balance Trainers', grade: 'B', category: 'Recovery & Rehab', stars: 3 },
  
  // Boot Accessories (Grade B-C)
  { name: 'Waterproof Boot Cover', grade: 'B', category: 'Boot Accessories', stars: 4 },
  { name: 'Elevation Wedges', grade: 'B', category: 'Boot Accessories', stars: 4 },
  { name: 'Crutch Pads', grade: 'B', category: 'Boot Accessories', stars: 4 },
  { name: 'Boot Liners', grade: 'C', category: 'Boot Accessories', stars: 3 },
  
  // Post-Surgical (Grade C)
  { name: 'Silicone Scar Sheets', grade: 'C', category: 'Post-Surgical', stars: 3 },
];

const ProductRatings = () => {
  const getGradeColor = (grade: string) => {
    switch (grade) {
      case 'A': return 'text-green-600 bg-green-100';
      case 'B': return 'text-yellow-600 bg-yellow-100';
      case 'C': return 'text-orange-600 bg-orange-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const renderStars = (count: number) => {
    let result = '';
    for (let i = 0; i < 5; i++) {
      result += i < count ? '⭐' : '☆';
    }
    return result;
  };

  return (
    <div className="my-8">
      <h3 className="mb-4 font-bold text-2xl">Product Ratings Summary</h3>
      <div className="overflow-x-auto">
        <table className="bg-white border border-gray-200 min-w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-4 py-2 text-left">Product</th>
              <th className="px-4 py-2 text-left">Category</th>
              <th className="px-4 py-2 text-center">Grade</th>
              <th className="px-4 py-2 text-left">Rating</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={index} className="hover:bg-gray-50 border-gray-200 border-t">
                <td className="px-4 py-2 font-medium">{product.name}</td>
                <td className="px-4 py-2 text-gray-600 text-sm">{product.category}</td>
                <td className="px-4 py-2 text-center">
                  <span className={`px-2 py-1 rounded font-bold ${getGradeColor(product.grade)}`}>
                    {product.grade}
                  </span>
                </td>
                <td className="px-4 py-2">{renderStars(product.stars)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="bg-blue-50 mt-6 p-4 rounded-lg">
        <h4 className="mb-2 font-bold">Grading Key:</h4>
        <ul className="space-y-1 text-sm">
          <li><span className="font-bold text-green-600">Grade A:</span> Essential - Critical for safe recovery</li>
          <li><span className="font-bold text-yellow-600">Grade B:</span> Highly Recommended - Significantly improves comfort</li>
          <li><span className="font-bold text-orange-600">Grade C:</span> Optional - Helpful but not essential</li>
        </ul>
      </div>
    </div>
  );
};

export default ProductRatings;