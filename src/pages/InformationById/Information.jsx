import { useParams,Link, Outlet } from "react-router-dom";
import { Suspense } from "react";
import Slider from "react-slick";
import topGame from 'utils/topGame';
import css from './Infromation.module.css';




export default function Information() {
  const { gameId } = useParams();
  
     const settings = {
    //   dots: true,
      infinite: true,
      speed: 2000,
      slidesToShow: 1,
      slidesToScroll: 1,
      cssEase: "linear",
      autoplay: true,
      autoplaySpeed: 5000,     
    };
    

    return (
        <>
        <div className={css.container}>
        <h1>Playnhill</h1>
         <Slider {...settings}>
        {topGame[gameId - 1].sliderImg?.map(img => (<div key={img}>
        <div className={css.heroImg} style={{ backgroundImage: `url(${img})`}}></div>
        </div>))}
        </Slider>         
        <h1>Detailed information about {topGame[gameId - 1]?.name}</h1>
        <p>{topGame[gameId - 1].details}</p> 
        <img src={""} width={100} height={100} alt="img" />
        <div>
          <Link to="plot">
          <button>Plot</button>
          </Link>
          <Link to="creators">
          <button>Creators</button>
          </Link>
        </div>
       <Suspense fallback={<p>...loading</p>}>
          <Outlet/>
          </Suspense>
        </div>
        </>    
    )
}