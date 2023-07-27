import { useEffect, useState } from "react";
import HeroHome from "../../components/Hero-components/Hero-Home/HeroHome";
import TopGameList from "../../components/Hero-components/TopGameList/TopGameList";
import ElementBar from "../../components/Hero-components/ElementBar/ElementBar";
import LoadMoreBtn from "../../components/Hero-components/LoadMoreBtn/LoadMoreBtn";
import IconBand from "../../components/Hero-components/Icon-band/IconBand";
import { getAllTopGames } from "../../rest-api/getAllTopGames";
import { getAllScreenshot } from "../../rest-api/getAllScreenshot";
import IGamesObj from "../../interfaces/IGamesObj";




export default function Home() {

    const [topGames, setTopGames] = useState<IGamesObj[]>([]);
    const [screenshots, setScreenshots] = useState([]);
    const [page, setPage] = useState(1); 
    

    const total = 32;
 

    useEffect(() => {
        getAllTopGames()
        .then((resp:any) => setTopGames(resp));
        
        getAllScreenshot()
        .then((resp:any) => setScreenshots(resp))
    } , []);

    
    const udpagePage = () => {
        setPage((prev) => prev + 1);
    }
 

    useEffect(() => { 
  
         if (page > 1) {
         getAllTopGames(page)
          .then((resp:any) => {
              setTopGames((prev: IGamesObj[]) => [...prev, ...resp])     
          });
         }
        
    }, [page]);


    return (
        <div>
        <HeroHome bannerImages={screenshots} />
        <TopGameList topGames={topGames} />
        {topGames.length !== total
        ? <LoadMoreBtn         
        udpagePage={udpagePage} />
        : <></>}    
        <ElementBar screenshots={screenshots} />
        <IconBand />    
        </div>
        )
}
