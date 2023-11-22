import React from "react";
import { Route, Routes } from "react-router-dom";
import PrivateRoute from "../utils/PrivateRoute";
import AdminPageLayout from "../layouts/AdminPageLayout";
import BodyContentLayout from "../layouts/BodyContentLayout.jsx";
import DashboardLayout from "../layouts/DashboardLayout.jsx";
import ProduitLayout from "../layouts/ProduitLayout.jsx";
import ListesRecettesGlobal from "../layouts/ListesRecettesGlobal.jsx";
// import AjoutRecette from "./layouts/AjoutRecette.jsx";
import AjoutService from "../layouts/AjoutService.jsx";
import AjoutProduit from "../layouts/AjoutProduit.jsx";
import RecetteLayout from "../layouts/RecetteLayout.jsx";
import ListesProduitsGlobal from "../layouts/ListesProduitsGlobal.jsx";
import AjoutCompte from "../layouts/AjoutCompte.jsx";
import ErrorPage from "../layouts/ErrorPage.jsx";
import ListeRecetteParService from "../layouts/ListeRecetteParService.jsx";
import RecetteParDate from "../layouts/RecetteParDate.jsx";
// import AuthLayout from "../layouts/AuthLayout.jsx";
// import App from "../App.jsx";

const Routers = () => {
  return (
    <Routes>
      <Route path="*" element={<ErrorPage />} />
      <Route path="/" element={<PrivateRoute />}>
        <Route path="/" element={<AdminPageLayout />}>
          <Route path="/" element={<BodyContentLayout />}>
            <Route path="/" element={<DashboardLayout />} />
            <Route path="/service" element={<AjoutService />} />
            <Route path="/produit" element={<ProduitLayout />}>
              <Route path="/produit" element={<AjoutProduit />} />
              <Route path="/produit/ajout" element={<ListesProduitsGlobal />} />
            </Route>
            <Route path="/recette" element={<RecetteLayout />}>
              <Route path="/recette" element={<ListesRecettesGlobal />} />
              <Route path="/recette/parDate" element={<RecetteParDate />} />
              <Route
                path="/recette/ajout"
                element={<ListeRecetteParService />}
              />
            </Route>
            <Route path="/compte" element={<AjoutCompte />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
};

export default Routers;
