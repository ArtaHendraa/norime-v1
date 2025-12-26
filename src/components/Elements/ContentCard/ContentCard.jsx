/* eslint-disable react/prop-types */

const ContentCard = (props) => {
  const { anime, banner } = props;

  return (
    <>
      {anime.map((anime, index) => (
        <a
          href={`/anime/${anime.mal_id}/${anime.title.replace(/ /g, "_")}`}
          key={index + 1}
          className="w-full group"
        >
          <div className="relative w-full h-auto mx-auto overflow-hidden rounded-lg">
            <div className="absolute z-10 flex items-center justify-center w-full h-full duration-300 bg-black opacity-0 group-hover:opacity-60">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-1/4 h-auto duration-300 group-hover:scale-150"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.91 11.672a.375.375 0 0 1 0 .656l-5.603 3.113a.375.375 0 0 1-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112Z"
                />
              </svg>
            </div>
            <div
              className={`absolute bg-[#ece48b] px-3 rounded-br-lg flex justify-center items-center ${banner}`}
            >
              <h1 className="text-[#1b1b1b] font-bold capitalize xl:text-lg text-xs">
                {anime.rank ? `rank ${anime.rank}` : `${anime.type}`}
              </h1>
            </div>
            <img
              className="w-full h-auto bg-cover rounded-lg aspect-[4/5] object-cover"
              loading="lazy"
              src={anime.images.webp.image_url}
              alt={anime.title}
            />
          </div>
          <div className="mt-1 font-semibold">
            <p className="whitespace-nowrap overflow-hidden text-ellipsis group-hover:text-[#ece48b] text-neutral-200 duration-300">
              {anime.title}
            </p>
            <p className="text-sm text-neutral-500">
              {anime.aired.prop.from.year}
            </p>
          </div>
        </a>
      ))}
    </>
  );
};

export default ContentCard;
