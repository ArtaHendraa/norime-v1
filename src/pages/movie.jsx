import { getAnime } from "../services/anime.service.js";
import MainLayout from "../components/Layouts/MainLayout.jsx";
import ContentLayout from "../components/Layouts/ContentLayout.jsx";
import ContentCard from "../components/Elements/ContentCard/ContentCard.jsx";
import Loading from "../components/Elements/Loading/loading.jsx";
import Pagination from "../components/Elements/Pagination/Pagination.jsx";
import { useEffect, useState } from "react";
import Footer from "../components/Fragments/Footer.jsx";

const HomePage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [anime, setAnime] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [cachedPages, setCachedPages] = useState({});

  const apiConfig = {
    baseURL: "https://api.jikan.moe/v4/top/anime?type=movie",
    limit: 24,
  };

  useEffect(() => {
    fetchData(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchData = async (page, retryAttempt = 0) => {
    setLoading(true);

    try {
      if (cachedPages[page]) {
        const cachedData = cachedPages[page];
        setAnime(cachedData.data);
        setTotalPages(cachedData.totalPages);
      } else {
        const { data, totalPages } = await getAnime(page, apiConfig);
        setAnime(data || []);
        setTotalPages(totalPages || 0);

        setCachedPages((prev) => ({ ...prev, [page]: { data, totalPages } }));
      }
    } catch (error) {
      if (error.response && error.response.status === 429) {
        const backoffDelay = 60 * 1000;
        console.warn("Rate limited. Retrying after a delay...");
        await new Promise((resolve) => setTimeout(resolve, backoffDelay));
        fetchData(page, retryAttempt + 1);
      } else {
        console.error("Error fetching anime data:", error);
      }
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 600);
    }
  };

  const loadPage = (pageNumber) => {
    if (!loading && pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
      fetchData(pageNumber);
      window.scrollTo({ top: 0 });
    }
  };

  const loadNextPage = () => {
    loadPage(currentPage + 1);
  };

  const loadPrevPage = () => {
    loadPage(currentPage - 1);
  };

  const displayedPages = 20;
  const calculateDisplayedPages = () => {
    const startPage = Math.max(currentPage - Math.floor(displayedPages / 2), 1);
    const endPage = Math.min(startPage + displayedPages - 1, totalPages);

    return Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i
    );
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <MainLayout>
          <ContentLayout title="movie">
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
      )}
    </>
  );
};

export default HomePage;
