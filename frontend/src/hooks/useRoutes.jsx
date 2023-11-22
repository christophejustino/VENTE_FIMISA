import {useMemo} from 'react';
import { useLocation } from 'react-router-dom';
import {BiHomeAlt} from 'react-icons/bi'
import {HiOutlineShoppingCart} from 'react-icons/hi'
import {PiListChecksFill} from 'react-icons/pi'
import { MdOutlineHomeRepairService, MdOutlineManageAccounts } from 'react-icons/md';



const useRoutes = () => {
    const pathname = useLocation().pathname
  const routes = useMemo(() => [
    {
        label: 'Accueil',
        icon : BiHomeAlt,
        path: '/',
        active : pathname === "/"
    },
    {
        label: 'Services',
        icon : MdOutlineHomeRepairService,
        path: '/service',
        active : pathname === "/service"
    },
    {
        label: 'Produits',
        icon : HiOutlineShoppingCart,
        path: '/produit',
        active : ["/produit", "/produit/ajout"].includes(pathname)
    },
    {
        label: 'Recettes',
        icon : PiListChecksFill,
        path: '/recette',
        active : ["/recette","/recette/parDate", "/recette/ajout"].includes(pathname)
    },
    {
        label: 'Comptes',
        icon : MdOutlineManageAccounts,
        path: '/compte',
        active : ["/compte"].includes(pathname)
    },
   
    
], [pathname])




  return routes;
}

export default useRoutes;