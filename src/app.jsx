import Header from "./components/Header" 
import Nav from './components/Nav'
import Stories from "./components/Stories"
import { useState, useEffect } from "preact/hooks";

const NAVITEMS = ["arts", "books", "fashion", "food", "movies", "travel"];
const FETCH_URL = "https://api.nytimes.com/svc/topstories/v2/";
const NYT_API = "PGQuh0auTqHC6HEx4gADBhT2yLCdXYbN";
const section = "arts";

export function App () {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect( () => {
    fetch(`${FETCH_URL}${section}.json?api-key=${NYT_API}`)
    .then( response => response.json())
    .then( data => setStorageAndState(data))
  }, [])

  useEffect(() => {
    if (!localStorage.getItem(section)) {
      console.log("fetching from NYT");
      fetch(`${FETCH_URL}${section}.json?api-key=${NYT_API}`)
        .then((response) => response.json())
        .then((data) => setStories(data.results));
    } else {
      console.log("section is in storage, not fetching");
      setStories(JSON.parse(localStorage.getItem(section)));
    }
  }, [section]);

  function setStorageAndState(data){
    localStorage.setItem(section, JSON.stringify(data.results))
    setStories(data.results)
  }

  return (
    <>
    <Header siteTitle="All the News That Fits We Print" />
    <Nav navItems={NAVITEMS} />
    <Stories stories={stories} />
    </>
  )
}

