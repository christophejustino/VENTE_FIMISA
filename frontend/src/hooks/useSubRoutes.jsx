import { useMemo } from "react";
import { useLocation } from "react-router-dom";

const useSubRoutes = () => {
  const pathname = useLocation().pathname;
  const subRoutes = useMemo(
    () => [
      {
        label: "Listes de tous les produits",
        path: "/produit",
        page: "produit",
        active: pathname === "/produit",
      },
      {
        label: "Listes de tous les produits par service",
        path: "/produit/ajout",
        page: "produit",
        active: pathname === "/produit/ajout",
      },
      {
        label: "Listes de toutes les recettes par service",
        path: "/recette",
        page: "recette",
        active: pathname === "/recette",
      },

      {
        label: "Listes des recettes par date de paiement",
        path: "/recette/parDate",
        page: "recette",
        active: pathname === "/recette/parDate",
      },
      {
        label: "Listes de toutes les recettes par service en pdf",
        path: "/recette/ajout",
        page: "recette",
        active: pathname === "/recette/ajout",
      },
      {
        label: "Listes de toutes les comptes à créer",
        path: "/compte",
        page: "compte",
        active: pathname === "/compte",
      }
    ],
    [pathname]
  );

  return subRoutes;
};

export default useSubRoutes;
