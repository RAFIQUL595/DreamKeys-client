import Advertisement from "./Advertisement";
import Hero from "./Hero";
import PropertyPriceRange from "./PropertyPriceRange";
import Slider from "./Slider";

const Home = () => {
  return (
    <div className="dark:bg-[#0B0716] bg-gray-50 ">
      <Hero></Hero>
      <Advertisement></Advertisement>
      <Slider></Slider>
      <PropertyPriceRange></PropertyPriceRange>
    </div>
  );
};

export default Home;
