import React, { useEffect, useState, useRef } from "react";
import TableHeader from "../components/Tables/TableHeader";
import TableRow from "../components/Tables/TableRow";
import {
  HiMiniTrash,
  HiPencil,
  HiPlus,
  HiChevronRight,
  HiChevronLeft,
} from "react-icons/hi2";
import { BiRefresh } from "react-icons/bi";
import { FcDeleteDatabase, FcFullTrash } from "react-icons/fc";
import { BiSearch } from "react-icons/bi";
import CircleLoader from "../components/CircleLoader/CircleLoader";
import Load from "../components/Load/Load";
import Button from "../components/Button";
import { Dialog } from "@headlessui/react";
import Modal from "../components/Modals/Modal";
import Message from "../components/Message/Message";
import {
  useCreateProduitMutation,
  useDeleteProduitMutation,
  useGetOneProduitQuery,
  useGetAllProduitQuery,
  useUpdateProduitMutation,
  useGetAllServiceQuery,
} from "../redux/slices/produitApiSlice";
import Success from "../components/Success/Success";
import Loading from "../components/Loading/Loading";
import Input from "../components/Inputs/Input";
import { set, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { TabTitle } from "../utils/GeneralFunctions";
import SlideModal from "../components/Modals/SlideModal";
import { useSelector, useDispatch } from "react-redux";
import {
  setCurrentPage,
  setSearchValue,
  setTotalPage,
} from "../redux/slices/produitSlice";
import DivisionEntiere from "../utils/divisionEntiere";
import clsx from "clsx";

const ListesProduitsGlobal = () => {
  TabTitle("Page de produit");
  const { search_value, currentPage, totalPage } = useSelector(
    (state) => state.produit
  );

  const {
    data: produit,
    isLoading,
    isFetching,
    isError,
    refetch,
    isSuccess,
    status,
  } = useGetAllProduitQuery({
    data: {
      search_value,
      page: ((currentPage - 1) * 10),
    },
  });

  const dispatch = useDispatch();

  const [selectedId, setSelectedId] = useState("");
  const [deleteModal, setDeleteModal] = useState(false);
  const [addModal, setAddModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);

  const toggleDeleteModal = () => setDeleteModal(!deleteModal);
  const toggleAddModal = () => setAddModal(!addModal);
  const toggleUpdateModal = () => setUpdateModal(!updateModal);

  const [val, setVal] = useState(search_value === "%20" ? "" : search_value);

  const searchFunc = (e) => {
    dispatch(setCurrentPage(1));
    setVal(e.target.value);
    if (e.target.value === "") {
      dispatch(setSearchValue("%20"));
      return;
    }
    dispatch(setSearchValue(e.target.value));
  };

  useEffect(() => {
    if (status === "fulfilled") {
      dispatch(setTotalPage(DivisionEntiere(produit.count)));
    }
  }, [status]);

  return (
    <div className="p-2">
      <div className="w-full min-h-[280px] mt-4 shadow-lg dark:bg-slate-800 bg-white overflow-hidden max-w-[1366px] xl:mx-auto">
        <div className="p-2">
          <h2 className="text-xl font-semibold">
            Listes de tous les produits [{produit?.count}]
          </h2>
          <div className="flex justify-between md:space-x-0 space-x-2 md:mt-10 mt-6">
            <div className="flex items-center mt-2 relative">
              <div className="absolute left-4">
                <BiSearch className="text-gray-400 dark:text-white md:text-2xl" />
              </div>
              <input
                type="text"
                value={val}
                onChange={searchFunc}
                placeholder="Rechercher un produit"
                className="outline-none rounded-lg w-full md:w-[400px] h-10 dark:bg-slate-400 dark:text-white border-b-2 border-gray-400 pl-10 md:pl-12"
              />
            </div>

            <Button
              type={"submit"}
              width="md:w-[190px] w-[90px] block"
              onClick={toggleAddModal}
              styles="md:mt-2 mt-2 flex justify-center items-center md:space-x-2 space-x-1 block"
              color="bg-gradient-to-r from-indigo-800 to-blue-400"
            >
              <HiPlus className="md:text-2xl text-3xl" />
              <h1 className="hidden md:block">Ajout un produit</h1>
            </Button>
          </div>
        </div>
        <TableHeader col="md:grid-cols-[2fr,1fr,1fr,1fr,1fr,max-content]">
          <div className="md:hidden">Informations des produits</div>
          <div className="hidden md:block">Dénomination</div>
          <div className="hidden md:block">Conditionnés en</div>
          <div className="hidden md:block">Quantité en stock</div>
          <div className="hidden md:block">Prix Unitaire en (Ar)</div>
          <div className="hidden md:block">Nom de service</div>
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
              {produit.produits.map((item) => (
                <TableRow
                  key={item.id}
                  col={
                    "md:grid-cols-[2fr,1fr,1fr,1fr,1fr,max-content]  items-center"
                  }
                >
                  <div className="flex items-center space-x-2 md:space-x-0">
                    <span className="md:hidden font-bold">Dénomination :</span>{" "}
                    <span className="span inline-block">{item.design}</span>
                  </div>
                  <div className="flex items-center space-x-2 md:space-x-0">
                    <span className="md:hidden font-bold">
                      Conditionnés en :
                    </span>{" "}
                    <span className="span inline-block">UNITE</span>
                  </div>
                  <div className="flex items-center space-x-2 md:space-x-0">
                    <span className="md:hidden font-bold">
                      Quantité en stock :
                    </span>{" "}
                    <span className="span inline-block">{item.qte_stock}</span>
                  </div>
                  <div className="flex items-center space-x-2 md:space-x-0">
                    <span className="md:hidden font-bold">
                      Prix Unitaire en (Ar) :
                    </span>{" "}
                    <span className="span inline-block">{item.pu}</span>
                  </div>
                  <div className="flex items-center space-x-2 md:space-x-0">
                    <span className="md:hidden font-bold">Service :</span>{" "}
                    <span className="span inline-block">
                      {item.services.nom_ser}
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
  const updateFunc = () => {
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
          color="bg-gradient-to-r from-zinc-700 dark:from-purple-900 dark:to-purple-500 to-gray-500 text-white"
        >
          <BiRefresh className=" text-[50px] text-slate-50" />
        </Button>
      </div>
    </div>
  );
};

const DeleteModal = ({ open, setOpen, id, refetch }) => {
  const [show, setShow] = useState(true);

  const [deleteProduit, { isLoading, isSuccess, isError }] =
    useDeleteProduitMutation();

  const handleDelete = async () => {
    try {
      setShow(false);
      const res = await deleteProduit(id).unwrap();
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
                  Voulez-vous supprimer ce produit ? {id}
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
  const schema = yup.object().shape({
    design: yup.string().required("Entrer votre nom produit"),
    qte_stock: yup.string().required("Entrer votre quantité en stock"),
    pu: yup.string().required("Entrer votre prix unitaire"),
  });

  const [createProduit, { isLoading, isSuccess, isError }] =
    useCreateProduitMutation();

  const [show, setShow] = useState(true);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const {
    data: services,
    isLoading: loadingService,
    isSuccess: successService,
  } = useGetAllServiceQuery();

  const onSubmit = async (data) => {
    try {
      setShow(false);
      const res = await createProduit(data).unwrap();
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

  useEffect(() => {
    if (!open) {
      reset();
    }
  }, [open]);

  return (
    <SlideModal open={open} setOpen={setOpen}>
      {show ? (
        <div>
          <h1 className="text-center font-bold mt-8 text-xl">
            Ajout un produit
          </h1>
          <form onSubmit={handleSubmit(onSubmit)} className="px-4 mt-4">
            <Input
              state={{ ...register("design") }}
              type={"text"}
              label={"Désignation"}
              error={errors?.design}
            />
            <p className="text-sm text-rose-500">{errors?.design?.message}</p>
            <Input
              state={{ ...register("qte_stock") }}
              type={"number"}
              label={"Quantité en stock"}
              error={errors?.qte_stock}
            />
            <p className="text-sm text-rose-500">
              {errors?.qte_stock?.message}
            </p>

            <Input
              state={{ ...register("pu") }}
              type={"text"}
              label={"Prix unitaire"}
              error={errors?.pu}
            />
            <p className="text-sm text-rose-500">{errors?.pu?.message}</p>

            <div className="mt-2 flex items-center space-x-2 md:space-x-10">
              <label htmlFor="">Service: </label>
              <select
                id="service"
                name="service"
                {...register("serviceId")}
                className="block w-full rounded-md border-0 py-1.5 dark:bg-slate-800 dark:text-white text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
              >
                <option value="">--- Choisir un service ---</option>
                {!loadingService &&
                  successService &&
                  services.map((service) => (
                    <option key={service.id} value={service.id}>
                      {service.nom_ser}
                    </option>
                  ))}
              </select>
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
    data: produit,
    isSuccess: produitSuccess,
    status,
    refetch: refetchProduit,
  } = useGetOneProduitQuery(id, {
    skip: !open,
  });
  const schema = yup.object().shape({
    design: yup.string().required("Entrer votre nom produit"),
    qte_stock: yup.string().required("Entrer votre quantité en stock"),
    pu: yup.string().required("Entrer votre prix unitaire"),
  });

  const [updateProduit, { isLoading, isSuccess, isError }] =
    useUpdateProduitMutation();

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
      setValue("design", produit.design);
      setValue("qte_stock", produit.qte_stock);
      setValue("pu", produit.pu);
      setValue("serviceId", produit.serviceId);
    }
  }, [status]);

  const {
    data: services,
    isLoading: loadingService,
    isSuccess: successService,
  } = useGetAllServiceQuery();

  const onSubmit = async (data) => {
    try {
      setShow(false);
      const res = await updateProduit({ ...data, id }).unwrap();
      refetch();
      refetchProduit();
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

  useEffect(() => {
    if (!open) {
      reset();
    }
  }, [open]);

  return (
    <SlideModal open={open} setOpen={setOpen}>
      {show ? (
        <div>
          <h1 className="text-center font-bold mt-8 text-xl">
            Modifier un produit
          </h1>
          <form onSubmit={handleSubmit(onSubmit)} className="px-4 mt-4">
            <Input
              state={{ ...register("design") }}
              type={"text"}
              label={"Désignation"}
              error={errors?.design}
            />
            <p className="text-sm text-rose-500">{errors?.design?.message}</p>
            <Input
              state={{ ...register("qte_stock") }}
              type={"number"}
              label={"Quantité en stock"}
              error={errors?.qte_stock}
            />
            <p className="text-sm text-rose-500">
              {errors?.qte_stock?.message}
            </p>

            <Input
              state={{ ...register("pu") }}
              type={"text"}
              label={"Prix unitaire"}
              error={errors?.pu}
            />
            <p className="text-sm text-rose-500">{errors?.pu?.message}</p>

            <div className="mt-2 flex items-center space-x-2 md:space-x-10">
              <label htmlFor="">Service: </label>
              <select
                id="service"
                name="service"
                {...register("serviceId")}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
              >
                {!loadingService &&
                  successService &&
                  services.map((service) => (
                    <option key={service.id} value={service.id}>
                      {service.nom_ser}
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

  const { currentPage } = useSelector((state) => state.produit);
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

  const { currentPage, totalPage } = useSelector((state) => state.produit);
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

export default ListesProduitsGlobal;
