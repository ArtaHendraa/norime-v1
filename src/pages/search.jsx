import MainLayout from "../components/Layouts/MainLayout";
import SearchBar from "../components/Elements/Search";
import Loading from "../components/Elements/Loading/loading";
import { getAnimeGenresList } from "../services/anime.service";
import { useEffect, useState } from "react";
import Footer from "../components/Fragments/Footer";
import ColContentCard from "../components/Elements/ContentCard/ColContentCard";
import Banner from "../components/Elements/Banner/Banner";

const SearchPage = () => {
  const [genresAnime, setGenresAnime] = useState([]);
  const [animeSearch, setAnimeSearch] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  // Load genres saat halaman pertama kali dibuka
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        setLoading(true);
        const data = await getAnimeGenresList();
        setGenresAnime(data || []);
      } catch (error) {
        console.error("Failed to load genres:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGenres();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!search.trim()) return;

    try {
      setLoading(true);

      const res = await fetch(
        `https://api.jikan.moe/v4/anime?q=${search}&order_by=popularity&sort=asc&sfw=true`
      );

      const json = await res.json();
      setAnimeSearch(json.data || []);
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading />;

  return (
    <MainLayout>
      <SearchBar
        type="text"
        placeholder="Search anime..."
        classname="w-full h-10"
        onClick={handleSearch}
        setSearch={setSearch}
      />

      <ColContentCard searchAnime={animeSearch} />

      <h1 className="mt-6 text-2xl font-semibold text-center">Genre</h1>

      <section className="flex flex-wrap justify-start gap-3 px-4 mt-3">
        {genresAnime.map((genre) => (
          <a
            key={genre.mal_id}
            href={`genre/${genre.mal_id}/${genre.name.replace(/ /g, "_")}`}
          >
            <Banner classname="bg-neutral-700">{genre.name}</Banner>
          </a>
        ))}
      </section>

      <Footer />
    </MainLayout>
  );
};

export default SearchPage;
