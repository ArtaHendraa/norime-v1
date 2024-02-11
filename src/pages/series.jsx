/* eslint-disable react-hooks/exhaustive-deps */
import { getAnime } from "../services/getAnime.service.js";
import MainLayout from "../components/Layouts/MainLayout.jsx";
import ContentLayout from "../components/Layouts/ContentLayout.jsx";
import ContentCard from "../components/Elements/ContentCard/ContentCard.jsx";
import Loading from "../components/Elements/Loading/loading.jsx";
import Pagination from "../components/Elements/Pagination/Pagination.jsx";
import { useEffect, useState } from "react";

const HomePage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [anime, setAnime] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [cachedPages, setCachedPages] = useState({});

  const apiConfig = {
    baseURL: "https://api.jikan.moe/v4/top/anime?type=tv",
    limit: 24,
  };

  useEffect(() => {
    const savedPage = parseInt(localStorage.getItem("currentPage")) || 1;
    setCurrentPage(savedPage);
    fetchData(savedPage);
  }, []);

  const fetchData = async (page) => {
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
      console.error("Error fetching anime data:", error);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 600);
    }
  };

  const loadPage = (pageNumber) => {
    if (!loading && pageNumber >= 1 && pageNumber <= totalPages) {
      document.body.style.overflow = "hidden";
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

  const displayedPages = 24;
  const calculateDisplayedPages = () => {
    const startPage = Math.max(currentPage - Math.floor(displayedPages / 2), 1);
    const endPage = Math.min(startPage + displayedPages - 1, totalPages);

    return Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i
    );
  };

  useEffect(() => {
    if (!loading) {
      document.body.style.overflow = "auto";
    }
  }, [loading]);

  return (
    <MainLayout>
      {loading && <Loading />}
      {!loading && (
        <ContentLayout>
          <ContentCard anime={anime} banner="hidden" />
        </ContentLayout>
      )}
      {!loading && (
        <Pagination
          calculateDisplayedPages={calculateDisplayedPages}
          currentPage={currentPage}
          totalPages={totalPages}
          loadPrevPage={loadPrevPage}
          loadNextPage={loadNextPage}
          loadPage={loadPage}
        />
      )}
    </MainLayout>
  );
};

export default HomePage;
