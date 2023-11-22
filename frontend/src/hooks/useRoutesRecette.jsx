import {useMemo} from 'react';
import { useLocation } from 'react-router-dom';



const useRoutesRecette = () => {
    const pathname = useLocation().pathname
  const routesRecette = useMemo(() => [
    {
        label: 'Listes de toutes les recettes',
        path: '/recette',
        active : pathname === "/recette"
    },
    {
        label: 'Listes des recettes par services',
        path: '/recette/ajout',
        active : pathname === "/recette/ajout"
    },
    
], [pathname])




  return routesRecette;
}

export default useRoutesRecette;