/* eslint-disable react/prop-types */
import { useParams } from "react-router-dom";
import { getDetailAnime, getEpisodeAnime } from "../services/anime.service";
import { useEffect, useState } from "react";
import Loading from "../components/Elements/Loading/loading";
import MainLayout from "../components/Layouts/MainLayout";
import Button from "../components/Elements/Button/Button";
import Hading from "../components/Elements/Hading/Hading";
import EpisodeButton from "../components/Elements/Button/EpisodeBtn";
import Footer from "../components/Fragments/Footer";
import Banner from "../components/Elements/Banner/Banner";

const DetailAnime = () => {
  const { mal_id } = useParams();
  const [detail, setDetail] = useState(null);
  const [episodes, setEpisode] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDetailPage = async () => {
      try {
        setLoading(true);

        const [detailData, episodeData] = await Promise.all([
          getDetailAnime(mal_id),
          getEpisodeAnime(mal_id),
        ]);

        setDetail(detailData);
        setEpisode(episodeData);
      } catch (error) {
        console.error("Failed loading detail:", error);
      } finally {
        setLoading(false);
      }
    };

    loadDetailPage();
  }, [mal_id]);

  const Bookmark = () => {
    alert("Bookmark not available for now");
  };

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <>
          <MainLayout classname="px-2 py-3 xl:w-4/5 mx-auto xl:bg-[#0f0f0f] xl:border-x xl:border-[rgba(255,255,255,.08)]">
            <div className="relative overflow-hidden pt-[56.25%] rounded-sm">
              {detail.trailer && detail.trailer.embed_url ? (
                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  src={`${detail.trailer.embed_url}?autoplay=0&showinfo=0`}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              ) : (
                <Hading classname="absolute inset-0 flex items-center justify-center w-full h-full font-semibold capitalize bg-red-950 text-neutral-400">
                  trailer not found
                </Hading>
              )}
            </div>

            <div className="px-2">
              <Hading classname="mt-3 text-2xl font-semibold text-neutral-100">
                {detail.title}
              </Hading>
              <Hading classname="text-sm text-[#ece48b] mb-2">
                {detail.title_japanese}
              </Hading>

              <div className="flex items-center gap-4 mb-2 text-neutral-300">
                <MoreInfo
                  icon="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                  text={detail.score}
                />
                <MoreInfo
                  icon="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z"
                  text={detail.favorites}
                />
                <MoreInfo
                  icon="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  text={detail.status}
                />
              </div>

              <div className="flex flex-wrap items-center gap-2 mt-1">
                {loading ? (
                  " "
                ) : (
                  <>
                    {detail.genres.map((genre, index) => (
                      <Banner
                        key={index + 1}
                        classname="border border-[#ece48b] bg-[#0a0909] rounded-tl-xl rounded-br-xl px-3 text-xs py-[0.13rem] text-neutral-200 font-normal"
                      >
                        {genre.name}
                      </Banner>
                    ))}
                  </>
                )}
              </div>

              <div className="flex items-center justify-center gap-3 my-3">
                <Button
                  classname="bg-[#1c1d22] text-neutral-300 w-full flex items-center justify-center capitalize font-medium py-2 rounded-full"
                  onClick={Bookmark}
                >
                  <MoreInfo
                    text="bookmark"
                    icon="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
                  />
                </Button>
                <Button classname="bg-[#ece48b] text-black w-full flex items-center justify-center capitalize font-medium py-2 rounded-full">
                  <MoreInfo
                    text={
                      detail.broadcast.day ? detail.broadcast.day : "random"
                    }
                    icon="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
                  />
                </Button>
              </div>
              <Button classname="bg-[#1c1d22] text-neutral-300 w-full flex items-center justify-center capitalize font-medium py-2 rounded-full mb-3">
                <MoreInfo
                  text={`source: ${detail.source}`}
                  icon="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
                />
              </Button>

              <Synopsis detail={detail} />
              <Episode episodes={episodes} />
            </div>
            <Footer />
          </MainLayout>
        </>
      )}
    </div>
  );
};

const Synopsis = (props) => {
  const { detail } = props;
  const [showFullText, setShowFullText] = useState(false);
  const toggleText = () => {
    setShowFullText(!showFullText);
  };
  return (
    <>
      <Hading>synopsis</Hading>
      <p className="text-neutral-400 md:hidden">
        {detail.synopsis &&
          (showFullText ? detail.synopsis : detail.synopsis.slice(0, 200))}
        {!showFullText && detail.synopsis && detail.synopsis.length > 200 ? (
          <span>...</span>
        ) : (
          ""
        )}
      </p>
      <p className="hidden text-neutral-400 md:block">{detail.synopsis}</p>
      {detail.synopsis.length > 200 && (
        <Button classname="text-[#ece48b] my-1 md:hidden" onClick={toggleText}>
          {showFullText ? "Read Less" : "Read More"}
        </Button>
      )}
    </>
  );
};

const Episode = (props) => {
  const { episodes } = props;
  const [episodesToShow, setEpisodesToShow] = useState(5);
  const loadMoreEpisodes = () => {
    setEpisodesToShow((prev) => prev + 5);
  };
  const formatDate = (airedDate) => {
    const parsedDate = new Date(airedDate);
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return parsedDate.toLocaleDateString("en-GB", options);
  };
  return (
    <MainLayout classname="flex flex-col mt-5 gap-y-3">
      <Hading classname="text-xl capitalize text-neutral-100">
        {episodes.length} episodes
      </Hading>
      {episodes.length > 0 && (
        <>
          {episodes.slice(0, episodesToShow).map((episode, index) => (
            <EpisodeButton
              key={`episode ${index + 1}`}
              episode={episode.mal_id}
              title={episode.title}
              date={formatDate(episode.aired)}
            />
          ))}
          {episodes.length > episodesToShow && (
            <Button
              classname="text-[#ece48b] font-semibold capitalize bg-[#1c1d22] py-2 text-center rounded-lg"
              onClick={loadMoreEpisodes}
            >
              view more
            </Button>
          )}
        </>
      )}
    </MainLayout>
  );
};

const MoreInfo = (props) => {
  const {
    icon,
    text,
    classname = "flex items-center justify-center gap-1",
  } = props;
  return (
    <div className={classname}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-5 h-5"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d={icon} />
      </svg>
      <p>{text}</p>
    </div>
  );
};

export default DetailAnime;
