import { useEffect, useState } from "react";
import { getAnime, getCarouselAnime } from "../services/anime.service.js";
import MainLayout from "../components/Layouts/MainLayout.jsx";
import ContentLayout from "../components/Layouts/ContentLayout.jsx";
import ContentCard from "../components/Elements/ContentCard/ContentCard.jsx";
import Loading from "../components/Elements/Loading/loading.jsx";
import Pagination from "../components/Elements/Pagination/Pagination.jsx";
import Footer from "../components/Fragments/Footer.jsx";
import Carousel from "../components/Fragments/Carousel.jsx";

const HomePage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [anime, setAnime] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(0);
  const [cachedPages, setCachedPages] = useState({});
  const [carouselData, setCarouselData] = useState([]);

  const apiConfig = {
    baseURL: "https://api.jikan.moe/v4/seasons/now?filter=tv",
    limit: 24,
  };

  useEffect(() => {
    fetchData(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchData = async (page) => {
    setLoading(true);

    try {
      const [animeResult, carouselResult] = await Promise.all([
        cachedPages[page]
          ? Promise.resolve(cachedPages[page])
          : getAnime(page, apiConfig),
        getCarouselAnime(),
      ]);

      const data = animeResult.data;
      const totalPages = animeResult.totalPages;

      setAnime(data);
      setTotalPages(totalPages);
      setCarouselData(carouselResult);

      if (!cachedPages[page]) {
        setCachedPages((prev) => ({
          ...prev,
          [page]: { data, totalPages },
        }));
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const loadPage = (pageNumber) => {
    if (!loading && pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
      fetchData(pageNumber);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const loadNextPage = () => loadPage(currentPage + 1);
  const loadPrevPage = () => loadPage(currentPage - 1);

  const displayedPages = 24;

  const calculateDisplayedPages = () => {
    const startPage = Math.max(currentPage - Math.floor(displayedPages / 2), 1);
    const endPage = Math.min(startPage + displayedPages - 1, totalPages);

    return Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i
    );
  };

  if (loading) return <Loading />;

  return (
    <MainLayout>
      <Carousel data={carouselData} />

      <ContentLayout title="Ongoing Anime">
        <ContentCard anime={anime} banner="hidden" />
      </ContentLayout>

      <Pagination
        calculateDisplayedPages={calculateDisplayedPages}
        currentPage={currentPage}
        totalPages={totalPages}
        loadPrevPage={loadPrevPage}
        loadNextPage={loadNextPage}
        loadPage={loadPage}
      />

      <Footer />
    </MainLayout>
  );
};

export default HomePage;
