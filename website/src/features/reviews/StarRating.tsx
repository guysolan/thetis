import { getReviews } from './hooks/useGetReviews'
import stars from '../../../public/images/4.7-Stars.svg'

// const reviews = await getReviews()
const reviews = { number: 124, average: 4.5 }

const StarRating = () => {
    return (
        <div className="flex-col gap-y-2 flex text-lg">
            <div className="flex  items-center justify-start gap-x-2">
                <div className="w-[160px] lg:w-[180px]">
                    <img
                        className=""
                        src="/images/4.7-Stars.svg"
                        alt="4.5 Stars"
                    ></img>
                </div>
                <p className="font-semibold">{reviews.average} out of 5</p>
            </div>
            <p className="text-gray-600">{reviews?.number} reviews</p>
        </div>
    )
}

export default StarRating
