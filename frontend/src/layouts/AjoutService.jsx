import React, { useEffect, useState, useRef } from "react";
import { HiMiniTrash, HiPencil, HiPlus } from "react-icons/hi2";
import { BiRefresh } from "react-icons/bi";
import { FcDeleteDatabase, FcFullTrash } from "react-icons/fc";
import { BiDotsVertical } from "react-icons/bi";
import {
  useGetAllServiceQuery,
  useDeleteServiceMutation,
  useCreateServiceMutation,
  useUpdateServiceMutation,
  useGetOneServiceQuery,
} from "../redux/slices/serviceApiSlice";
import { FcImageFile } from "react-icons/fc";
import CircleLoader from "../components/CircleLoader/CircleLoader";
import Button from "../components/Button";
import { Dialog } from "@headlessui/react";
import Modal from "../components/Modals/Modal";
import Message from "../components/Message/Message";
import Success from "../components/Success/Success";
import Loading from "../components/Loading/Loading";
import Input from "../components/Inputs/Input";
import { set, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { TabTitle } from "../utils/GeneralFunctions";
import SlideModal from "../components/Modals/SlideModal";
import { BiSolidCameraPlus } from "react-icons/bi";
import { useUploadImageMutation } from "../redux/slices/uploadSlice";
import { motion } from "framer-motion";

// const container = {
//   hidden: { opacity: 1, scale: 0 },
//   visible: {
//     opacity: 1,
//     scale: 1,
//     transition: {
//       delayChildren: 0.2,
//       staggerChildren: 0.2,
//     },
//   },
// };
// const item = {
//   hidden: { y: 20, opacity: 0 },
//   visible: {
//     y: 0,
//     opacity: 1,
//   },
// };
const AjoutService = () => {
  TabTitle("Page de service");

  const {
    data: services,
    isLoading,
    isSuccess,
    isError,
    refetch,
    isFetching,
  } = useGetAllServiceQuery();

  const [selectedId, setSelectedId] = useState("");
  const [deleteModal, setDeleteModal] = useState(false);
  const [addModal, setAddModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);

  const toggleDeleteModal = () => {
    setDeleteModal(!deleteModal);
  };
  const toggleAddModal = () => {
    setAddModal(!addModal);
  };
  const toggleUpdateModal = () => {
    setUpdateModal(!updateModal);
  };

  return (
    <div className=" w-full bg-white dark:bg-slate-900 justify-center flex flex-col">
      <div className="w-full min-h-[150px] dark:bg-slate-700 justify-center overflow-hidden max-w-[1366px] mx-auto">
        <div className="flex justify-between p-3 items-center">
          <h1 className="text-2xl font-bold p-2">Listes des services</h1>
          <Button
            type={"submit"}
            width="md:w-[100px] w-[75px]  block"
            onClick={toggleAddModal}
            styles="md:mt-1 mt-1 flex justify-center items-center md:space-x-2 space-x-1 block"
            color="bg-gradient-to-r from-indigo-800 to-blue-400"
          >
            <HiPlus className="md:text-3xl text-3xl" />
          </Button>
        </div>
        <div className=" grid md:grid-cols-2 xl:grid-cols-3 shadow-lg dark:bg-slate-800 bg-zinc-100 grid-cols-1 px-2 w-full md:ml-0 ">
          {(isLoading || isFetching) && (
            <div className=" flex  items-center py-14 justify-center mt-6">
              <div className="flex items-center justify-center md:pl-[700px] ">
                <CircleLoader />
              </div>
            </div>
          )}

          {!isLoading && !isFetching && isSuccess ? (
            <>
              {services.map((item) => (
                <div className="m-2 shadow-sm relative dark:bg-slate-950 bg-white space-y-3">
                  <ServiceComp
                    picture={item.image}
                    id={item.id}
                    nom_ser={item.nom_ser}
                    setSelectedId={setSelectedId}
                    toggleDeleteModal={toggleDeleteModal}
                    toggleUpdateModal={toggleUpdateModal}
                  />
                </div>
              ))}
            </>
          ) : (
            isError && <ErrorBase refetch={refetch} />
          )}
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
    <div className="flex flex-col duration-500 ease-in-out absolute top-12 space-y-4 right-2 mt-2">
      <HiPencil onClick={updateFunc} className="text-xl text-green-700" />
      <HiMiniTrash onClick={deleteFunc} className="text-xl text-red-700" />
    </div>
  );
};

const ErrorBase = ({ refetch }) => {
  return (
    <div className="w-full h-32 md:h-60">
      <div className="flex items-center flex-col bg-white  shadow-lg md:py-[22px] md:px-[550px] mt-4 md:mt-8 justify-center ">
        <FcDeleteDatabase className="md:text-[170px] text-[80px]" />
        <h2 className="md:text-xl md:hidden text-center dark:text-slate-50 font-semibold">
          Une erreur s'est produite
        </h2>
      </div>
      <div className="flex justify-start md:-mt-52 -mt-32 m-1">
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

const AddModal = ({ open, setOpen, refetch }) => {
  const schema = yup.object().shape({
    nom_ser: yup.string().required("Entrer votre nom de service"),
  });

  const [uploadImage] = useUploadImageMutation();
  const [createService, { isLoading, isSuccess, isError }] =
    useCreateServiceMutation();
  const [image, setImage] = useState("");

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    try {
      const res = await uploadImage(formData).unwrap();
      setImage(res.url);
    } catch (error) {
      console.log(error);
    }
  };

  const [show, setShow] = useState(true);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    try {
      setShow(false);
      const res = await createService({ ...data, image }).unwrap();
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
      setImage("");
    }
  }, [open]);

  return (
    <SlideModal open={open} setOpen={setOpen}>
      {show ? (
        <div>
          <h1 className="text-center font-bold mt-10 text-xl">
            Ajout un service
          </h1>
          <div className="flex items-center justify-center mt-4">
            <div className="md:w-[415px] w-[335px] h-[200px] md:h-[220px] border border-dashed dark:border-white border-slate-950 flex items-center justify-center relative">
              {image === "" ? (
                <BiSolidCameraPlus className="text-[150px]" />
              ) : (
                <img
                  src={"/api" + image}
                  alt=""
                  className="w-full h-full object-cover"
                />
              )}
              <input
                type="file"
                onChange={handleUpload}
                id=""
                name=""
                className="absolute  w-full h-full opacity-0 cursor-pointer"
              />
            </div>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="px-4 mt-4">
            <Input
              state={{ ...register("nom_ser") }}
              type={"text"}
              label={"Nom service"}
              error={errors?.nom_ser}
            />
            <p className="text-sm text-rose-500">{errors?.nom_ser?.message}</p>

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

const DeleteModal = ({ open, setOpen, id, refetch }) => {
  const [show, setShow] = useState(true);

  const [deleteService, { isLoading, isSuccess, isError }] =
    useDeleteServiceMutation();

  const handleDelete = async () => {
    try {
      setShow(false);
      const res = await deleteService(id).unwrap();
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
                  Voulez-vous supprimer ce service ? {id}
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
const UpdateModal = ({ open, setOpen, refetch, id }) => {
  const {
    data: services,
    isSuccess: serviceSuccess,
    status,
    refetch: refetchService,
  } = useGetOneServiceQuery(id, {
    skip: !open,
  });
  const schema = yup.object().shape({
    nom_ser: yup.string().required("Veuillez modifié votre nom de service"),
  });

  const [uploadImage] = useUploadImageMutation();

  const [updateService, { isLoading, isSuccess, isError }] =
    useUpdateServiceMutation();

  const [image, setImage] = useState("");

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    try {
      const res = await uploadImage(formData).unwrap();
      setImage(res.url);
    } catch (error) {
      console.log(error);
    }
  };

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
      setValue("nom_ser", services.nom_ser);
      setImage(services.image);
    }
  }, [status]);

  const onSubmit = async (data) => {
    try {
      setShow(false);
      const res = await updateService({
        ...data,
        image,
        id,
      }).unwrap();
      refetch();
      refetchService();
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
      setImage("");
    }
  }, [open]);

  return (
    <SlideModal open={open} setOpen={setOpen}>
      {show ? (
        <div>
          <h1 className="text-center font-bold mt-10 text-xl">
            Modifier un service
          </h1>
          <div className="flex items-center justify-center mt-4">
            <div className="md:w-[415px] w-[335px] h-[200px] md:h-[220px] border border-dashed dark:border-white border-slate-950 flex items-center justify-center relative">
              {image === "" || image === null ? (
                <BiSolidCameraPlus className="text-[150px]" />
              ) : (
                <img
                  src={"/api" + image}
                  alt=""
                  className="w-full h-full object-cover"
                />
              )}
              <input
                type="file"
                onChange={handleUpload}
                id=""
                name=""
                className="absolute  w-full h-full opacity-0 cursor-pointer"
              />
            </div>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="px-4 mt-4">
            <Input
              state={{ ...register("nom_ser") }}
              type={"text"}
              label={"Nom service"}
              error={errors?.nom_ser}
            />
            <p className="text-sm text-rose-500">{errors?.nom_ser?.message}</p>

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

const ServiceComp = ({
  picture,
  nom_ser,
  id,
  toggleUpdateModal,
  setSelectedId,
  toggleDeleteModal,
}) => {
  const [open, setOpen] = useState(false);

  const toggle = () => {
    setOpen(!open);
  };
  return (
    <div className="flex flex-col space-y-1">
      {picture === "" ? (
        <FcImageFile className="w-full h-[190px]" />
      ) : (
        <img
          src={"/api" + picture}
          alt=""
          className=" h-[220px] w-full object-cover"
        />
      )}
      <div className="p-2">
        <div className="flex space-x-2 ">
          <span className=" font-bold">Nom de service :</span>
          <span>{nom_ser}</span>
        </div>
      </div>
      {/* <div className="px-2">
        <div className="flex space-x-2 ">
          <span className=" font-bold">Date :</span>{" "}
          <span>{new Date(date_ser).toLocaleDateString()}</span>
        </div>
      </div> */}
      <div className=" absolute w-8 h-8 right-1 top-2 dark:bg-slate-100 rounded-full flex items-center justify-center bg-slate-900">
        <BiDotsVertical
          onClick={toggle}
          className=" cursor-pointer text-2xl text-slate-50 dark:text-slate-950"
        />
      </div>
      {open && (
        <Actions
          id={id}
          setSelectedId={setSelectedId}
          toggleDeleteModal={toggleDeleteModal}
          toggleUpdateModal={toggleUpdateModal}
        />
      )}
    </div>
  );
};

export default AjoutService;
