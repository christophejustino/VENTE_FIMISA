import { useMemo, useState } from "react";
import { useLocation } from "react-router-dom";

const useTitle = () => {
  const [title, setTitle] = useState("Accueil");

  const pathname = useLocation().pathname;

  useMemo(() => {
    switch (pathname) {
      case "/":
        setTitle("Accueil");
        break;
      case "/service":
        setTitle("Service");
        break;
      case "/produit":
        setTitle("Produit");
        break;
      case "/produit/ajout":
        setTitle("Produit");
        break;
      case "/recette":
        setTitle("Recette");
        break;
      case "/recette/ajout":
        setTitle("Recette");
        break;
      case "/recette/parDate":
        setTitle("Recette");
        break;
      case "/compte":
        setTitle("Compte");
        break;
    }
  }, [pathname]);
  return title;
};

export default useTitle;
