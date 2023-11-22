import React, { useEffect, useState, useRef } from "react";
import TableHeader from "../components/Tables/TableHeader";
import TableRow from "../components/Tables/TableRow";
// import TableRows from "../components/Tables/TableRows";
// import TableFooter from "../components/Tables/TableFooter";
import { BiRefresh } from "react-icons/bi";
import DivisionEntiere from "../utils/divisionEntiere";
import {
  useGetAllRecetteQuery,
  useDeleteRecetteMutation,
  useCreateRecetteMutation,
  useUpdateRecetteMutation,
  useGetOneRecetteQuery,
} from "../redux/slices/recetteApiSlice";
import clsx from "clsx";
import {
  HiMiniTrash,
  HiPencil,
  HiPlus,
  HiChevronRight,
  HiChevronLeft,
} from "react-icons/hi2";
import Loading from "../components/Loading/Loading";
import { FcDeleteDatabase, FcFullTrash } from "react-icons/fc";
import CircleLoader from "../components/CircleLoader/CircleLoader";
import Button from "../components/Button";
import { Dialog } from "@headlessui/react";
import Modal from "../components/Modals/Modal";
import Message from "../components/Message/Message";
import Success from "../components/Success/Success";
import Loader from "../components/Loader/Loader";
import Input from "../components/Inputs/Input";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { TabTitle } from "../utils/GeneralFunctions";
import SlideModal from "../components/Modals/SlideModal";
import { useGetToutProduitQuery } from "../redux/slices/produitApiSlice";
import { setTotalPage, setCurrentPage } from "../redux/slices/recetteSlice";
import { useDispatch, useSelector } from "react-redux";

const Ajoutrecette = () => {
  TabTitle("Page de recette");
  const { currentPage, totalPage } = useSelector((state) => state.recette);

  const {
    data: recettes,
    isLoading,
    isFetching,
    isError,
    isSuccess,
    refetch,
    status,
  } = useGetAllRecetteQuery({
    data: {
      page: (currentPage - 1) * 10,
    },
  });

  const dispatch = useDispatch();

  useEffect(() => {
    if (status === "fulfilled") {
      dispatch(setTotalPage(DivisionEntiere(recettes.count)));
    }
  }, [status]);

  const [selectedId, setSelectedId] = useState("");
  const [deleteModal, setDeleteModal] = useState(false);
  const [addModal, setAddModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const toggleDeleteModal = () => setDeleteModal(!deleteModal);
  const toggleAddModal = () => setAddModal(!addModal);
  const toggleUpdateModal = () => setUpdateModal(!updateModal);

  // const [recetteTotal, setRecetteTotal] = useState(0);

  // useEffect(() => {
  //   if (recettes && recettes.length > 0) {
  //     let totalRecette = 0;

  //     recettes.forEach((item) => {
  //       const recette = item.qte_vendu * item.calendrierRecette[0].produit?.pu;
  //       totalRecette += recette;
  //     });

  //     setRecetteTotal(totalRecette);
  //   }
  // }, [recettes]);

  // const [depenseTotal, setDepenseTotal] = useState(0);
  // const [rapprochementCaisse, setRapprochementCaisse] = useState(0);

  // // Calcul de la dépense totale
  // useEffect(() => {
  //   if (recettes && recettes.length > 0) {
  //     let totalDepense = 0;

  //     recettes.forEach((item) => {
  //       const qteRestante =
  //         item.calendrierRecette[0].produit?.qte_stock - item.qte_vendu;
  //       const depense = qteRestante * item.calendrierRecette[0].produit?.pu;
  //       totalDepense += depense;
  //     });

  //     setDepenseTotal(totalDepense);
  //   }
  // }, [recettes]);

  // useEffect(() => {
  //   if (recetteTotal > depenseTotal) {
  //     const rapprochement = recetteTotal - depenseTotal;
  //     return setRapprochementCaisse(rapprochement);
  //   }
  //   if (recetteTotal < depenseTotal) {
  //     const rapprochement = (recetteTotal - depenseTotal) * -1;
  //     return setRapprochementCaisse(rapprochement);
  //   }
  // }, [recetteTotal, depenseTotal]);

  return (
    <div className="p-2">
      <div className="w-full min-h-[280px] mt-3 dark:bg-slate-800 bg-white shadow-lg overflow-hidden max-w-[1366px] xl:mx-auto">
        <div className="p-2">
          <h2 className="text-xl font-semibold">
            Listes de tous les recettes [{recettes?.count}]
          </h2>
          <div className="flex justify-end md:mt-8 mt-8">
            <Button
              type={"submit"}
              width="md:w-[190px] w-full block"
              onClick={toggleAddModal}
              styles="md:mt-1 mt-1 flex justify-center items-center md:space-x-2 space-x-1 block"
              color="bg-gradient-to-r from-indigo-800 to-blue-400"
            >
              <HiPlus className="md:text-2xl text-2xl" />
              <h1>Ajout un recette</h1>
            </Button>
          </div>
        </div>
        <TableHeader col="md:grid-cols-[1fr,1.5fr,1fr,1.2fr,1fr,1fr,1.5fr,max-content]">
          <div className="md:hidden">Informations des recettes</div>
          <div className="hidden md:block">Nom service</div>
          <div className="hidden md:block">Nom produit</div>
          <div className="hidden md:block">Quantité reçus</div>
          <div className="hidden md:block">Quantité vendus</div>
          <div className="hidden md:block">Recette(Ar)</div>
          <div className="hidden md:block">Depense(Ar)</div>
          <div className="hidden md:block">Date paiement</div>
          <div className="hidden md:block">Actions</div>
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
              {recettes?.recettes.map((item) => (
                <>
                  <TableRow
                    key={item.id}
                    col={
                      "md:grid-cols-[1fr,1.5fr,1fr,1.2fr,1fr,1fr,1.5fr,max-content]"
                    }
                  >
                    <div className="flex items-center space-x-2 md:space-x-0">
                      <span className="md:hidden font-bold">Nom service:</span>{" "}
                      <span className="span inline-block">
                        {item.services?.nom_ser}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 md:space-x-0">
                      <span className="md:hidden font-bold">Nom produit:</span>{" "}
                      <span className="span inline-block">
                        {item.calendrierRecette[0].produit?.design}
                      </span>
                    </div>

                    <div className="flex items-center space-x-2 md:space-x-0">
                      <span className="md:hidden font-bold">
                        Quantité reçus:
                      </span>{" "}
                      <span className="span inline-block">{item.qte_recu}</span>
                    </div>
                    <div className="flex items-center space-x-2 md:space-x-0">
                      <span className="md:hidden font-bold">
                        Quantité vendus:
                      </span>{" "}
                      <span className="span inline-block">
                        {item.qte_vendu}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 md:space-x-0">
                      <span className="md:hidden font-bold">Recette:</span>{" "}
                      <span className="span inline-block">
                        {item.qte_vendu * item.calendrierRecette[0].produit?.pu}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 md:space-x-0">
                      <span className="md:hidden font-bold">Depense:</span>{" "}
                      <span className="span inline-block">
                        {item.qte_recu * item.calendrierRecette[0].produit?.pu}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 md:space-x-0">
                      <span className="md:hidden font-bold">
                        Date paiement:
                      </span>{" "}
                      <span className="span inline-block">
                        {`${new Date(
                          item.calendrierRecette[0].date_paiement
                        ).toLocaleDateString()} à
                         ${new Date(
                           item.calendrierRecette[0].date_paiement
                         ).toLocaleTimeString()}`}
                      </span>
                    </div>

                    <Actions
                      id={item.id}
                      setSelectedId={setSelectedId}
                      toggleDeleteModal={toggleDeleteModal}
                      toggleAddModal={toggleAddModal}
                      toggleUpdateModal={toggleUpdateModal}
                    />
                  </TableRow>
                </>
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
      <DeleteModal
        open={deleteModal}
        setOpen={setDeleteModal}
        toggleDeleteModal={toggleDeleteModal}
        id={selectedId}
        refetch={refetch}
      />
      <AddModal
        open={addModal}
        setOpen={setAddModal}
        toggleAddModal={toggleAddModal}
        refetch={refetch}
      />
      <UpdateModal
        open={updateModal}
        setOpen={setUpdateModal}
        toggleUpdateModal={toggleUpdateModal}
        id={selectedId}
        refetch={refetch}
      />
    </div>
  );
};

const Actions = ({
  id,
  setSelectedId,
  toggleDeleteModal,
  toggleUpdateModal,
}) => {
  const deleteFunc = () => {
    setSelectedId(id);
    toggleDeleteModal();
  };

  const updateFunc = (e) => {
    setSelectedId(id);
    toggleUpdateModal();
  };
  return (
    <div className="flex items-center justify-center space-x-4 md:mt-0 mt-2">
      <HiPencil onClick={updateFunc} className="text-xl text-green-700" />
      <HiMiniTrash onClick={deleteFunc} className="text-xl text-red-700" />
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

const DeleteModal = ({ open, setOpen, id, refetch }) => {
  const [show, setShow] = useState(true);

  const [deleteRecette, { isLoading, isSuccess, isError }] =
    useDeleteRecetteMutation();

  const handleDelete = async () => {
    try {
      setShow(false);
      const res = await deleteRecette(id).unwrap();
      refetch();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isSuccess || isError) {
      setTimeout(() => {
        setOpen(false);
        setShow(true);
      }, 2500);
    }
  }, [isSuccess, isError]);

  return (
    <Modal open={open} setOpen={setOpen}>
      {show ? (
        <>
          <div className="h-26 w-80 sm:w-[500px] sm:h-70 ">
            <div className="sm:flex flex items-center justify-center sm:items-center sm:justify-center">
              <div className="mt-3 text-center ml-8 sm:ml-2 sm:mt-2 sm:text-left">
                <Dialog.Title className="text-base font-semibold dark:text-slate-50 text-center leading-6 text-gray-900">
                  Voulez-vous supprimer cette recette ? {id}
                </Dialog.Title>
                <div className="mt-6 flex items-center justify-center">
                  <FcFullTrash className="sm:text-[200px] text-[100px]" />
                </div>
              </div>
            </div>
          </div>
          <div className=" px-4 py-4 sm:flex sm:items-center sm:justify-center sm:space-x-6">
            <button
              type="button"
              className="inline-flex w-full justify-center rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
              onClick={handleDelete}
            >
              Oui,supprimer
            </button>
            <button
              type="button"
              className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
              onClick={() => setOpen(false)}
            >
              Fermer
            </button>
          </div>
        </>
      ) : isLoading ? (
        <Message message="Suppression en cours" icon={CircleLoader} />
      ) : isSuccess ? (
        <Message message="Suppression avec succès" icon={Success} />
      ) : (
        isError && (
          <Message
            message="Une erreur s'est produite"
            icon={FcDeleteDatabase}
          />
        )
      )}
    </Modal>
  );
};

const AddModal = ({ open, setOpen, refetch }) => {
  const [qte, setQte] = useState(0);
  const schema = yup.object().shape({
    qte_vendu: yup
      .number("Entrez votre nombre ")
      .positive("Désolé, nombre négative ")
      .min(1)
      .max(
        qte,
        `La quantité en stock disponible est de ${qte}. Essayez de saisir une valeur inférieure ou égale dans le stockage.`
      )
      .required("Veuillez entre votre nombre"),
  });

  const [serviceId, setServiceId] = useState("");

  const [createRecette, { isLoading, isSuccess, isError }] =
    useCreateRecetteMutation();

  const [show, setShow] = useState(true);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
    getValues,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const {
    data: produits,
    isLoading: loadingProduit,
    isSuccess: successProduit,
    refetch: refetchProd,
  } = useGetToutProduitQuery();

  const onSubmit = async (data) => {
    try {
      setShow(false);
      const res = await createRecette({
        qte_vendu: Number(data.qte_vendu),
        produitId: data.produitId,
        serviceId,
      }).unwrap();
      refetch();
    } catch (error) {
      console.log(error);
    }
  };

  const onChangeService = (e) => {
    const id = e.target.value;
    const selected = e.target
      .querySelector(`.id${id}`)
      .getAttribute("serviceId");
    const stock = e.target.querySelector(`.id${id}`).getAttribute("qte_stock");
    setQte(Number(stock));
    console.log(selected);
    setServiceId(selected);
  };

  useEffect(() => {
    if (isSuccess || isError) {
      setTimeout(() => {
        setOpen(false);
        setShow(true);
      }, 2500);
    }
  }, [isSuccess, isError]);

  useEffect(() => {
    if (!open) {
      reset();
      setServiceId("");
    } else {
      refetchProd();
      setQte(0);
    }
  }, [open]);

  return (
    <SlideModal open={open} setOpen={setOpen}>
      {show ? (
        <div className="mt-4">
          <h1 className="text-center font-bold mt-8 text-xl">
            Ajout une recette
          </h1>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="px-4 mt-8 space-y-4"
          >
            <div className="mt-2 flex items-center space-x-2 md:space-x-10">
              <label htmlFor="">Produit:</label>
              <select
                name="produit"
                {...register("produitId")}
                onChange={onChangeService}
                className="block w-full rounded-md border-0 py-1.5 dark:bg-slate-800 dark:text-white text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
              >
                <option value="">-- Choisir un produit --</option>
                {!loadingProduit &&
                  successProduit &&
                  produits.map((produit) => (
                    <option
                      className={"id" + produit.id}
                      serviceId={produit.serviceId}
                      key={produit.id}
                      value={produit.id}
                      qte_stock={produit.qte_stock}
                    >
                      {produit.design}{" "}
                      <span className="text-green-800">
                        ({produit.qte_stock})
                      </span>
                    </option>
                  ))}
              </select>
            </div>
            <div>
              <Input
                label={`Quantité vendu (${qte} quantité restantes)`}
                type={"number"}
                state={{ ...register("qte_vendu") }}
                error={errors?.qte_vendu}
              />
              <p className="text-sm text-rose-500">
                {errors?.qte_vendu?.message}
              </p>
            </div>

            <div className="flex justify-center items-center space-x-6 mt-6">
              <Button
                type="submit"
                width="w-[100px] block"
                styles="flex items-center justify-center"
                color="bg-gradient-to-r from-indigo-800 to-blue-400"
              >
                <h1>Ajouter</h1>
              </Button>

              <Button
                type="button"
                width="w-[100px] block"
                onClick={() => setOpen(false)}
                styles="flex items-center justify-center"
                color="bg-gradient-to-r from-red-800 to-red-400"
              >
                <h1 className="ml-2">Fermer</h1>
              </Button>
            </div>
          </form>
        </div>
      ) : isLoading ? (
        <div className="h-full w-full flex items-center justify-center">
          <Message message="Ajout en cours" icon={CircleLoader} />
        </div>
      ) : isSuccess ? (
        <div className="h-full w-full flex items-center justify-center">
          <Message message="Ajout avec succès" icon={Success} />
        </div>
      ) : (
        isError && (
          <div className="h-full w-full flex items-center justify-center">
            <Message
              message="Une erreur s'est produite"
              icon={FcDeleteDatabase}
            />
          </div>
        )
      )}
    </SlideModal>
  );
};

const UpdateModal = ({ open, setOpen, refetch, id }) => {
  const {
    data: recettes,
    isSuccess: recetteSuccess,
    status,
    refetch: refetchRecette,
  } = useGetOneRecetteQuery(id, {
    skip: !open,
  });
  const schema = yup.object().shape({
    qte_vendu: yup.string().required("Entrer votre quantité vendu"),
  });

  const [updateRecette, { isLoading, isSuccess, isError }] =
    useUpdateRecetteMutation();

  const [serviceId, setServiceId] = useState("");

  const [show, setShow] = useState(true);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  useEffect(() => {
    if (status === "fulfilled") {
      setValue("qte_vendu", recettes.qte_vendu);
      setServiceId(recettes.serviceId);
      setValue("produitId", recettes.produitId);
    }
  }, [status]);

  const {
    data: produits,
    isLoading: loadingProduit,
    isSuccess: successProduit,
  } = useGetToutProduitQuery();

  const onSubmit = async (data) => {
    try {
      setShow(false);
      const res = await updateRecette({
        data: { ...data, serviceId },
        id,
      }).unwrap();
      refetch();
      refetchRecette();
    } catch (error) {
      console.log(error);
    }
  };

  const onChangeService = (e) => {
    const id = e.target.value;
    const selected = e.target
      .querySelector(`.id${id}`)
      .getAttribute("serviceId");
    console.log(selected);
    setServiceId(selected);
  };

  useEffect(() => {
    if (isSuccess || isError) {
      setTimeout(() => {
        setOpen(false);
        setShow(true);
      }, 2500);
    }
  }, [isSuccess, isError]);

  useEffect(() => {
    if (!open) {
      reset();
      setServiceId("");
    }
  }, [open]);

  return (
    <SlideModal open={open} setOpen={setOpen}>
      {show ? (
        <div>
          <h1 className="text-center font-bold mt-8 text-xl">
            Modifier une recette
          </h1>
          <form onSubmit={handleSubmit(onSubmit)} className="px-4 mt-4">
            <Input
              label={"Quantité vendu"}
              type={"number"}
              state={{ ...register("qte_vendu") }}
              error={errors?.qte_vendu}
            />
            <p className="text-sm text-rose-500">
              {errors?.qte_vendu?.message}
            </p>
            <div className="mt-2 flex items-center space-x-2 md:space-x-10">
              <label htmlFor="">Produit: </label>
              <select
                name="produit"
                {...register("produitId")}
                onChange={onChangeService}
                className="block w-full rounded-md border-0 py-1.5 dark:bg-slate-800 dark:text-white text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
              >
                {!loadingProduit &&
                  successProduit &&
                  produits.map((produit) => (
                    <option
                      className={"id" + produit.id}
                      serviceId={produit.serviceId}
                      key={produit.id}
                      value={produit.id}
                    >
                      {produit.design}
                    </option>
                  ))}
              </select>
            </div>

            <div className="flex justify-center items-center space-x-6 mt-6">
              <Button
                type="submit"
                width="w-[100px] block"
                styles="flex items-center justify-center"
                color="bg-gradient-to-r from-green-800 to-green-400"
              >
                <h1>Modifier</h1>
              </Button>

              <Button
                type="button"
                width="w-[100px] block"
                onClick={() => setOpen(false)}
                styles="flex items-center justify-center"
                color="bg-gradient-to-r from-red-800 to-red-400"
              >
                <h1 className="ml-2">Fermer</h1>
              </Button>
            </div>
          </form>
        </div>
      ) : isLoading ? (
        <div className="h-full w-full flex items-center justify-center">
          <Message message="Modification en cours" icon={CircleLoader} />
        </div>
      ) : isSuccess ? (
        <div className="h-full w-full flex items-center justify-center">
          <Message message="Modification avec succès" icon={Success} />
        </div>
      ) : (
        isError && (
          <div className="h-full w-full flex items-center justify-center">
            <Message
              message="Une erreur s'est produite"
              icon={FcDeleteDatabase}
            />
          </div>
        )
      )}
    </SlideModal>
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

  const { currentPage } = useSelector((state) => state.recette);
  const handleClick = () => {
    if (currentPage === 1) return;
    dispatch(setCurrentPage(currentPage - 1));
  };
  return (
    <div
      onClick={handleClick}
      className="md:w-28 w-10 h-8 rounded-lg space-x-1 md:space-x-0 px-2  bg-zinc-800 text-white cursor-pointer flex items-center justify-center"
    >
      <HiChevronLeft />
      <p className="md:block hidden">Precédent</p>
    </div>
  );
};
const Next = () => {
  const dispatch = useDispatch();

  const { currentPage, totalPage } = useSelector((state) => state.recette);
  const handleClick = () => {
    if (currentPage === totalPage) return;
    dispatch(setCurrentPage(currentPage + 1));
  };
  return (
    <div
      onClick={handleClick}
      className="md:w-24 w-10 h-8 rounded-lg px-2 md:space-x-0  bg-zinc-800 text-white cursor-pointer flex items-center justify-center space-x-1"
    >
      <p className="md:block hidden">Suivant</p>
      <HiChevronRight />
    </div>
  );
};

export default Ajoutrecette;
