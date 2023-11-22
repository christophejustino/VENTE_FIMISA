import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";

export default function SwiperComponent() {
  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        // navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide className="flex flex-col">
          <h1 className="font-semibold px-4 mt-20">
            Un système d'authentification robuste est crucial dans la gestion
            des ventes de services, assurant l'intégrité des transactions, la
            confidentialité des informations clients et garantissant une
            expérience client fiable et sécurisée.
          </h1>
          <div className="flex items-center w-[550px] mx-auto justify-center">
            <img
              className="  py-12 object-contain rounded-lg"
              src="ventes.PNG"
              alt=""
            />
          </div>
        </SwiperSlide>
        <SwiperSlide className="flex flex-col">
          <h1 className="font-semibold px-4 mt-20">
            La mise en place d'un protocole d'authentification efficace est
            fondamentale dans la gestion des ventes de services, assurant la
            sécurité des transactions et la confidentialité des informations
            client, tout en établissant un environnement de confiance propice à
            des partenariats commerciaux fructueux.
          </h1>
          <div className="flex items-center w-[550px] mx-auto justify-center">
            <img
              className="  py-12 object-contain rounded-lg"
              src="fou.PNG"
              alt=""
            />
          </div>
        </SwiperSlide>
        <SwiperSlide className="flex flex-col">
          <h1 className="font-semibold px-4 mt-20">
            Un système d'authentification performant joue un rôle central dans
            la gestion des ventes de services, garantissant une expérience
            utilisateur fluide, des transactions sécurisées et une analyse
            précise des préférences client, éléments clés pour optimiser
            l'efficacité opérationnelle et maximiser la satisfaction de la
            clientèle.
          </h1>
          <div className="flex items-center w-[550px] mx-auto justify-center">
            <img
              className="py-12 object-contain rounded-lg"
              src="four.PNG"
              alt=""
            />
          </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
}
