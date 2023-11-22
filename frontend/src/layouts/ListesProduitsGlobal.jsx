import React, { useEffect } from "react";
import TableHeader from "../components/Tables/TableHeader";
import TableRow from "../components/Tables/TableRow";
import { BiRefresh } from "react-icons/bi";
import { FcDeleteDatabase } from "react-icons/fc";
import Button from "../components/Button";
import {
  useGetAllServiceQuery,
  useGetProduitByServiceQuery,
} from "../redux/slices/produitApiSlice";
// import Loading from "../components/Loading/Loading";
import { TabTitle } from "../utils/GeneralFunctions";
import { setTotalPage, setCurrentPage, setServiceId } from "../redux/slices/produitSlice";
import { useDispatch, useSelector } from "react-redux";
import CircleLoader from "../components/CircleLoader/CircleLoader";
import {
  HiChevronRight,
  HiChevronLeft,
} from "react-icons/hi2";
import DivisionEntiere from "../utils/divisionEntiere";
import clsx from "clsx";

const AjoutProduit = () => {
  TabTitle("Page de produit");
  const { serviceId, currentPage, totalPage } = useSelector((state) => state.produit);
  const {
    data: produits,
    isLoading,
    isFetching,
    isError,
    isSuccess,
    status,
    refetch,
  } = useGetProduitByServiceQuery( {id:serviceId,
    data: { page: (currentPage - 1) * 10 },
  });

  const dispatch = useDispatch();
  useEffect(() => {
    if (status === "fulfilled") {
      dispatch(setTotalPage(DivisionEntiere(produits.count)));
    }
  }, [status]);

  const func = (e) => {
    dispatch(setServiceId(e.target.value));
  };
  // const [service, setService] = useState("");

  // const onChangeService = (e) => {
  //   setService(e.target.value);
  // };
  const {
    data: services,
    isLoading: loadingService,
    isSuccess: successService,
  } = useGetAllServiceQuery();

  return (
    <div className="p-4">
      <div className="w-full min-h-[280px] mt-3 dark:bg-slate-800 shadow-lg bg-white overflow-hidden max-w-[1366px] xl:mx-auto">
        <div className="p-2">
          <h2 className="text-xl font-semibold">
            Listes de tous les produits par service [{produits?.count}]
          </h2>
          <div className="flex justify-end space-x-4 mt-10">
            <label htmlFor="" className="mt-2">
              Service
            </label>
            <select
              onChange={func}
              id="service"
              name="service"
              className="block w-full dark:bg-slate-700 rounded-md border-0 dark:focus:ring-slate-600 dark:text-white py-1.5 text-gray-900 shadow-sm ring-1 ring-inset dark:ring-slate-500 ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
            >
              {!loadingService &&
                successService &&
                services.map((item) => (
                  <option value={item.id} selected={serviceId === item.id}>
                    {item.nom_ser}
                  </option>
                ))}
            </select>
          </div>
        </div>
        <TableHeader col="md:grid-cols-[1fr,2fr,1fr,1fr,1fr] items-center">
          <div className="md:hidden">Informations des produits</div>
          <div className="hidden md:block">Nom service</div>
          <div className="hidden md:block">Dénomination</div>
          <div className="hidden md:block">Conditionnés en</div>
          <div className="hidden md:block ">Quantité en stock</div>
          <div className="hidden md:block ">Prix Unitaire en (Ar)</div>
        </TableHeader>
        <div className="flex flex-col">
          {(isLoading || isFetching) && (
            <div className="flex items-center justify-center ">
              <div>
                <CircleLoader />
              </div>
            </div>
          )}

          {!isLoading && !isFetching && isSuccess ? (
            <>
              {produits?.prods.length > 0 &&
                produits?.prods.map((item) => (
                  <TableRow
                    key={item.id}
                    col={"md:grid-cols-[1fr,2fr,1fr,1fr,1fr]"}
                  >
                    <div className="flex items-center">
                      <span className="md:hidden font-bold">Nom service :</span>{" "}
                      <span className="span inline-block">
                        {item.services?.nom_ser}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <span className="md:hidden font-bold">
                        Dénomination :
                      </span>{" "}
                      <span className="span inline-block">{item.design}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="md:hidden font-bold">
                        Conditionnés en :
                      </span>{" "}
                      <span className="span inline-block">UNITE</span>
                    </div>
                    <div className="flex items-center">
                      <span className="md:hidden font-bold">
                        Quantité en stock :
                      </span>{" "}
                      <span className="span inline-block">
                        {item.qte_stock}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <span className="md:hidden font-bold">
                        Prix Unitaire en (Ar) :
                      </span>{" "}
                      <span className="span inline-block">{item.pu}</span>
                    </div>
                  </TableRow>
                ))}
            </>
          ) : (
            isError && <ErrorBase refetch={refetch} />
          )}
        </div>
        <div className="flex items-center justify-center space-x-3 py-4">
          {currentPage > 1 && <Prev />}
          {totalPage > 1 &&
            isSuccess &&
            [...Array(totalPage).keys()].map((item) => (
              <PageItem
                key={item}
                number={item + 1}
                active={item + 1 === currentPage}
              />
            ))}
          {currentPage < totalPage && <Next />}
        </div>
      </div>
    </div>
  );
};

const ErrorBase = ({ refetch }) => {
  return (
    <div className="w-full h-30 md:h-60">
      <div className="flex items-center flex-col md:mt-4 justify-center md:space-y-3">
        <FcDeleteDatabase className="md:text-[160px] text-[80px]" />
        <h2 className="md:text-xl text-center dark:text-slate-50 font-semibold">
          Une erreur s'est produite
        </h2>
      </div>
      <div className="flex justify-start md:-mt-52 -mt-28 mx-2 md:mx-2">
        <Button
          onClick={refetch}
          width="w-[60px] block"
          styles="flex mt-4 md:-m-0 items-center justify-center"
          color="bg-gradient-to-r from-zinc-800 dark:from-purple-900 dark:to-purple-500 to-gray-500 text-white"
        >
          <BiRefresh className=" text-[50px] text-slate-50" />
        </Button>
      </div>
    </div>
  );
};

const PageItem = ({ number, active }) => {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(setCurrentPage(number));
  };

  return (
    <div
      onClick={handleClick}
      className={clsx(
        "w-8 h-8 text-white  rounded-lg cursor-pointer hidden md:flex items-center justify-center",
        active ? "bg-slate-900" : "bg-slate-400 hover:bg-white hover:text-black"
      )}
    >
      {number}
    </div>
  );
};

const Prev = () => {
  const dispatch = useDispatch();

  const { currentPage } = useSelector((state) => state.produit);
  const handleClick = () => {
    if (currentPage === 1) return;
    dispatch(setCurrentPage(currentPage - 1));
  };
  return (
    <div
      onClick={handleClick}
      className="w-10 md:w-28 h-8 rounded-lg space-x-1 md:space-x-0 px-2  bg-zinc-800 text-white cursor-pointer flex items-center justify-center"
    >
      <HiChevronLeft />
      <p className="md:block hidden">Precédent</p>
    </div>
  );
};
const Next = () => {
  const dispatch = useDispatch();

  const { currentPage, totalPage } = useSelector((state) => state.produit);
  const handleClick = () => {
    if (currentPage === totalPage) return;
    dispatch(setCurrentPage(currentPage + 1));
  };
  return (
    <div
      onClick={handleClick}
      className="w-10 md:w-24 h-8 rounded-lg px-2 md:space-x-0  bg-zinc-800 text-white cursor-pointer flex items-center justify-center space-x-1"
    >
      <p className="md:block hidden">Suivant</p>
      <HiChevronRight />
    </div>
  );
};

export default AjoutProduit;
