import Header from "./components/Header";
import Nav from "./components/Nav";
import Stories from "./components/Stories";
import { useState, useEffect } from "preact/hooks";

const NAVITEMS = ["arts", "books", "fashion", "food", "movies", "travel"];
const FETCH_URL = "https://api.nytimes.com/svc/topstories/v2/";
const NYT_API = "PGQuh0auTqHC6HEx4gADBhT2yLCdXYbN";

export function App() {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [section, setSection] = useState("");

  useEffect(() => {
    const url = new URL(window.location.href);
    const hash = url.hash.slice(1);
    if (hash !== "undefined") {
      setSection(hash);
    } else {
      setSection("arts");
    }
  }, []);

  useEffect(() => {
    if (!localStorage.getItem(section)) {
      console.log("fetching from NYT");
      setLoading(true);
      fetch(`${FETCH_URL}${section}.json?api-key=${NYT_API}`)
        .then((response) => response.json())
        .then((data) => setStories(data.results))
        .catch((error) => console.error(error));
      setLoading(false);
    } else {
      console.log("section is in storage, not fetching");
      setStories(JSON.parse(localStorage.getItem(section)));
    }
  }, [section]);

  useEffect(() => {
    localStorage.setItem(section, JSON.stringify(stories));
  }, [stories]);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <>
      <Header siteTitle="All the News That Fits We Print" />
      <Nav navItems={NAVITEMS} setSection={setSection} section={section} />
      <Stories stories={stories} />
    </>
  );
}
