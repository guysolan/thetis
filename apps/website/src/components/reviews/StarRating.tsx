const reviews = { number: 166, average: 4.5 };

const StarRating = () => {
  return (
    <div className="flex flex-row flex-wrap justify-start items-start gap-x-4 gap-y-2 text-lg">
      <div className="flex items-center">
        <p className="font-semibold">{reviews.average}</p>
        <div className="w-[100px] lg:w-[130px]">
          <img src="/images/4.7-Stars.svg" alt="4.5 Stars" />
        </div>
      </div>
      <p className="text-gray-600">{reviews?.number} ratings</p>
    </div>
  );
};

export default StarRating;
