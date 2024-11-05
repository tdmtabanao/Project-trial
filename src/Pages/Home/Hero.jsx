import heroImage from "@/assets/pages/Home/hero.jpg";
import { useEffect, useState } from "react";


function Hero() {
  const HEIGHT_OF_NAVBAR = "74px";
  const [image, setImage] = useState(heroImage);

  useEffect(() => {
    const fetchHero = async () => {
      try {
        const response = await getHeroes();
        setImage(response[0].imageUrl)
      } catch (e) {
        console.error(e);
      }
    };

    fetchHero();
    setImage("")
  }, []);

  const bgImageStyles = {
    backgroundImage: `url('${image ? image : heroImage}')`,
    height: `calc(100vh - ${HEIGHT_OF_NAVBAR})`,
  };

  return (
    <div className="p-5 text-center bg-image" style={bgImageStyles}>
      <div className="mask" style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}>
        <div className="d-flex justify-content-center align-items-center h-100">
          <div className="text-white">
            <h1 className="mb-3 mx-2">
              Crafting Custom Furniture for
              <br />
              Your Unique Space
            </h1>
            <h6 className="mb-4 fw-normal mx-4 lh-lg">
              Discover the art of furniture, meticulously crafted
              <br /> to your distinct style and space.
            </h6>
            <a
              className="btn btn-outline-light btn-lg m-2"
              href="#"
              role="button"
            >
              View Catalog
            </a>
            <a
              className="btn btn-outline-light btn-lg m-2"
              href="#"
              role="button"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
