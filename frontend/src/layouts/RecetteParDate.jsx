import React, { useEffect, useState, useRef } from "react";
import TableHeader from "../components/Tables/TableHeader";
import TableRow from "../components/Tables/TableRow";
import { BiRefresh } from "react-icons/bi";
import { FcDeleteDatabase, FcFullTrash } from "react-icons/fc";
import Button from "../components/Button";
import Input from "../components/Inpu/Input";
import { TabTitle } from "../utils/GeneralFunctions";
import { useCalendrierFindByDateQuery } from "../redux/slices/CalendrierApiSlice";
import { setDate_paiement } from "../redux/slices/calendrierSlice";
import { useSelector, useDispatch } from "react-redux";
import CircleLoader from "../components/CircleLoader/CircleLoader";

const Ajoutrecette = () => {
  TabTitle("Page de recette");
  const { date_paiement } = useSelector((state) => state.calendrier);
  console.log(date_paiement);

  const dispatch = useDispatch();
  const funct = (e) => {
    dispatch(setDate_paiement(e.target.value));
  };

  const {
    data: calendriers,
    isLoading,
    isSuccess,
    isError,
    isFetching,
    refetch,
  } = useCalendrierFindByDateQuery(date_paiement);

  return (
    <div className="p-4">
      <div className="w-full min-h-[230px] mt-3 dark:bg-slate-800 bg-white shadow-lg overflow-hidden max-w-[1366px] xl:mx-auto">
        <div className="p-2">
          <h1 className="font-bold text-xl">
            Liste des recettes par date de paiement
          </h1>
          <div className="flex justify-end items-center md:mt-4 mt-2 md:space-x-3">
            <h1 className="hidden md:block">Choisir date :</h1>
            <Input type="date" value={date_paiement} onChange={funct} />
          </div>
        </div>
        <TableHeader col="md:grid-cols-[1fr,1.5fr,1fr,1fr,1.2fr,1fr,max-content]">
          <div className="md:hidden">Informations des recettes</div>
          <div className="hidden md:block">Nom service</div>
          <div className="hidden md:block">Nom produit</div>
          <div className="hidden md:block">Quantité reçus</div>
          <div className="hidden md:block">Quantité vendus</div>
          <div className="hidden md:block">Recette(Ar)</div>
          <div className="hidden md:block">Depense(Ar)</div>
          <div className="hidden md:block">Date paiement</div>
          {/* <div className="hidden md:block">Actions</div> */}
        </TableHeader>
        <div className="flex flex-col">
          {(isLoading || isFetching) && (
            <div className="flex items-center justify-center mt-2 md:mt-2">
              <div className="flex items-center justify-center ">
                <CircleLoader />
              </div>
            </div>
          )}

          {!isLoading && !isFetching && isSuccess ? (
            <>
              {calendriers.produit.map((item) => (
                <TableRow
                  key={item.id}
                  col={"md:grid-cols-[1fr,1.5fr,1fr,1fr,1.2fr,1fr,106px]"}
                >
                  <div className="flex items-center">
                    <span className="md:hidden font-bold">Nom service:</span>{" "}
                    <span className="span inline-block">
                      {item.services?.nom_ser}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <span className="md:hidden font-bold">Nom produit:</span>{" "}
                    <span className="span inline-block">
                      {item.design}
                    </span>
                  </div>
                 
                  <div className="flex items-center">
                    <span className="md:hidden font-bold">Quantité reçus:</span>{" "}
                    <span className="span inline-block">
                      {item.qte_recu}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <span className="md:hidden font-bold">
                      Quantité vendus:
                    </span>{" "}
                    <span className="span inline-block">
                      {item.qte_vendu}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <span className="md:hidden font-bold">Recette:</span>{" "}
                    <span className="span inline-block">
                      {item.qte_vendu * Number(item.pu)}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <span className="md:hidden font-bold">Depense:</span>{" "}
                    <span className="span inline-block">
                      {(item.qte_recu) *
                        Number(item.pu)}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <span className="md:hidden font-bold">Date paiement:</span>{" "}
                    <span className="span inline-block">
                      {new Date(item.date_paiement).toLocaleDateString()}
                    </span>
                  </div>
                </TableRow>
              ))}
            </>
          ) : (
            isError && <ErrorBase refetch={refetch} />
          )}
        </div>
      </div>
    </div>
  );
};

// const Actions = ({

// }) => {
//   const deleteFunc = () => {
//     setSelectedId(id);
//     toggleDeleteModal();
//   };

//   const updateFunc = (e) => {
//     setSelectedId(id);
//     toggleUpdateModal();
//   };
//   return (
//     <div className="flex items-center justify-center space-x-4 md:mt-0 mt-2">
//       <HiPencil onClick={updateFunc} className="text-xl text-green-700" />
//       <HiMiniTrash onClick={deleteFunc} className="text-xl text-red-700" />
//     </div>
//   );
// };

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

export default Ajoutrecette;
