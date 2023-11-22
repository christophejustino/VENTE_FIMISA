import React, { useEffect, useState } from "react";
import TableHeader from "../components/Tables/TableHeader";
import TableRow from "../components/Tables/TableRow";
import { HiMiniTrash, HiPencil, HiPlus } from "react-icons/hi2";
import { BiRefresh } from "react-icons/bi";
import { FcDeleteDatabase, FcFullTrash } from "react-icons/fc";
import { PiUserCircleDuotone } from "react-icons/pi";
import {
  useCreateCompteMutation,
  useDeleteCompteMutation,
  useGetAllCompteQuery,
  useGetServiceQuery,
} from "../redux/slices/compteApiSlice";
import CircleLoader from "../components/CircleLoader/CircleLoader";
import Button from "../components/Button";
import { Dialog } from "@headlessui/react";
import Modal from "../components/Modals/Modal";
import Message from "../components/Message/Message";
import Success from "../components/Success/Success";
import Loading from "../components/Loading/Loading";
import Loader from "../components/Loader/Loader";
import Input from "../components/Inputs/Input";
import { set, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { TabTitle } from "../utils/GeneralFunctions";
import SlideModal from "../components/Modals/SlideModal";
import { BiSolidCameraPlus } from "react-icons/bi";
import { useUploadImageMutation } from "../redux/slices/uploadSlice";

const AjoutCompte = () => {
  TabTitle("Page de compte");

  const {
    data: comptes,
    isLoading,
    isSuccess,
    isError,
    refetch,
    isFetching,
  } = useGetAllCompteQuery();

  const [selectedId, setSelectedId] = useState("");
  const [deleteModal, setDeleteModal] = useState(false);
  const [addModal, setAddModal] = useState(false);
  // const [updateModal, setUpdateModal] = useState(false);
  const toggleDeleteModal = () => setDeleteModal(!deleteModal);
  const toggleAddModal = () => setAddModal(!addModal);
  // const toggleUpdateModal = () => setUpdateModal(!updateModal);

  return (
    <div className=" p-4 dark:bg-slate-900">
      <div className="w-full min-h-[280px] mt-4 dark:bg-slate-800 bg-white shadow-lg overflow-hidden max-w-[1366px] xl:mx-auto">
        <div className="p-2">
          <h2 className="text-xl font-semibold">Listes des comptes</h2>
          <div className="flex justify-end md:mt-8 mt-10">
            <Button
              type={"submit"}
              width="md:w-[200px] w-full block"
              onClick={toggleAddModal}
              styles="md:mt-2 mt-1 flex justify-center items-center md:space-x-2 space-x-1 block"
              color="bg-gradient-to-r from-indigo-800 to-blue-400"
            >
              <HiPlus className="md:text-2xl text-xl" />
              <h1 className="">Ajout un compte</h1>
            </Button>
          </div>
        </div>
        <TableHeader col="md:grid-cols-[1fr,1fr,1fr,max-content]">
          <div className="md:hidden">Informations des comptes</div>
          <div className="hidden md:block">Pseudo</div>
          <div className="hidden md:block">Email</div>
          {/* <div className="hidden md:block">Password</div> */}
          <div className="hidden md:block">Nom de service</div>
          <div className="hidden md:block">Actions</div>
        </TableHeader>
        <div className="flex flex-col">
          {(isLoading || isFetching) && (
            <div className="flex items-center justify-center ">
              <div className="flex items-center justify-center ">
                <CircleLoader />
              </div>
            </div>
          )}

          {!isLoading && !isFetching && isSuccess ? (
            <>
              {comptes.map((item) => (
                <TableRow
                  key={item.id}
                  col={"md:grid-cols-[1fr,1fr,1fr,54px]"}
                >
                  <div className="flex items-center space-x-2">
                    {item.image === "" ? (
                      <PiUserCircleDuotone className="w-10 h-10" />
                    ) : (
                      <img
                        src={"/api" + item.image}
                        alt=""
                        className="w-10 h-10 object-cover rounded-full"
                      />
                    )}
                    {/* <span className="md:hidden font-bold">Pseudo : {""}</span> */}
                    <span>{item.pseudo}</span>
                  </div>
                  <div className="flex items-center space-x-2 md:space-x-0 ">
                    <span className="md:hidden font-bold">Email : </span>{" "}
                    <span>{item.email}</span>
                  </div>
                  {/* <div className="flex items-center space-x-2 md:space-x-0">
                    <span className="md:hidden font-bold">Password : </span>
                    <span>***********</span>
                  </div> */}
                  <div className="flex items-center space-x-2 md:space-x-0">
                    <span className="md:hidden font-bold">
                      Nom de service :{" "}
                    </span>{" "}
                    <span>{item.services.nom_ser}</span>
                  </div>
                  <Actions
                    id={item.id}
                    setSelectedId={setSelectedId}
                    toggleDeleteModal={toggleDeleteModal}
                    toggleAddModal={toggleAddModal}
                  />
                </TableRow>
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
      {/* <UpdateModal
        open={updateModal}
        setOpen={setUpdateModal}
        toggleUpdateModal={toggleUpdateModal}
        refetch={refetch}
        id={selectedId}
      /> */}
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
  // const updateFunc = () => {
  //   setSelectedId(id);
  //   toggleUpdateModal();
  // };

  return (
    <div className="flex items-center justify-center space-x-4 md:mt-0 mt-2">
      {/* <HiPencil onClick={updateFunc} className="text-xl text-green-700" /> */}
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
          color="bg-gradient-to-r from-slate-700 dark:from-purple-900 dark:to-purple-500 to-gray-500 text-white"
        >
          <BiRefresh className=" text-[50px] text-slate-50" />
        </Button>
      </div>
    </div>
  );
};

const DeleteModal = ({ open, setOpen, id, refetch }) => {
  const [show, setShow] = useState(true);

  const [deleteCompte, { isLoading, isSuccess, isError }] =
    useDeleteCompteMutation();

  const handleDelete = async () => {
    try {
      setShow(false);
      const res = await deleteCompte(id).unwrap();
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
                  Voulez-vous supprimer ce compte ? {id}
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
    pseudo: yup.string().required("Entrer votre pseudo"),
    email: yup.string().email("Email invalide").required("Entrer votre email"),
    clerkId: yup.string().required("Entrer votre Clerk id"),
  });

  const [uploadImage] = useUploadImageMutation();
  const [createCompte, { isLoading, isSuccess, isError }] =
    useCreateCompteMutation();
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

  const {
    data: services,
    isLoading: loadingService,
    isSuccess: successService,
  } = useGetServiceQuery();

  const onSubmit = async (data) => {
    try {
      setShow(false);
      const res = await createCompte({ ...data, image }).unwrap();
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
          <h1 className="text-center font-bold mt-8 text-xl">
            Ajout un compte
          </h1>
          <div className="flex items-center justify-center mt-4">
            <div className="w-40 h-40 rounded-full  border border-dashed dark:border-white border-slate-950 flex items-center justify-center relative">
              {image === "" ? (
                <BiSolidCameraPlus className="text-[100px]" />
              ) : (
                <img
                  src={"/api" + image}
                  alt=""
                  className="w-full h-full object-cover rounded-full"
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
              state={{ ...register("pseudo") }}
              type={"text"}
              label={"Pseudo"}
              error={errors?.pseudo}
            />
            <p className="text-sm text-rose-500">{errors?.pseudo?.message}</p>
            <Input
              state={{ ...register("email") }}
              type={"text"}
              label={"Email"}
              error={errors?.email}
            />
            <p className="text-sm text-rose-500">{errors?.email?.message}</p>

            <Input
              state={{ ...register("clerkId") }}
              type={"text"}
              label={"clerkId"}
              error={errors?.clerkId}
            />
            <p className="text-sm text-rose-500">{errors?.clerkId?.message}</p>

            <div className="mt-2 flex items-center space-x-2 md:space-x-10">
              <label htmlFor="">Service: </label>
              <select
                id="service"
                name="service"
                {...register("serviceId")}
                className="block w-full rounded-md border-0 py-1.5 dark:bg-slate-800 dark:text-white text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
              >
                <option value="">---Choisir un service---</option>
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
// const UpdateModal = ({ open, setOpen, refetch, id }) => {
//   const {
//     data: compte,
//     isSuccess: compteSuccess,
//     status,
//     refetch: refetchCompte,
//   } = useGetOneCompteQuery(id, {
//     skip: !open,
//   });
//   const schema = yup.object().shape({
//     pseudo: yup.string().required("Entrer votre pseudo"),
//     email: yup.string().email("Email invalide").required("Entrer votre email"),
//     // password: yup.string().required("Entrer votre password"),
//   });

//   const [uploadImage] = useUploadImageMutation();

//   const [updateCompte, { isLoading, isSuccess, isError }] =
//     useUpdateCompteMutation();

//   const [image, setImage] = useState("");

//   const handleUpload = async (e) => {
//     const file = e.target.files[0];
//     const formData = new FormData();
//     formData.append("image", file);
//     try {
//       const res = await uploadImage(formData).unwrap();
//       setImage(res.url);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const [show, setShow] = useState(true);
//   const {
//     register,
//     handleSubmit,
//     reset,
//     setValue,
//     formState: { errors },
//   } = useForm({ resolver: yupResolver(schema) });

//   useEffect(() => {
//     if (status === "fulfilled") {
//       setValue("pseudo", compte.pseudo);
//       setValue("email", compte.email);
//       // setValue("password", compte.password);
//       setValue("serviceId", compte.serviceId);
//       setImage(compte.image);
//     }
//   }, [status]);

//   const {
//     data: services,
//     isLoading: loadingService,
//     isSuccess: successService,
//   } = useGetServiceQuery();

//   const onSubmit = async (data) => {
//     try {
//       setShow(false);
//       const res = await updateCompte({
//         data: {
//           ...data,
//           image,
//         },
//         id,
//       }).unwrap();
//       refetch();
//       refetchCompte();
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     if (isSuccess || isError) {
//       setTimeout(() => {
//         setOpen(false);
//         setShow(true);
//       }, 2500);
//     }
//   }, [isSuccess, isError]);

//   useEffect(() => {
//     if (!open) {
//       reset();
//       setImage("");
//     }
//   }, [open]);

//   return (
//     <SlideModal open={open} setOpen={setOpen}>
//       {show ? (
//         <div>
//           <h1 className="text-center font-bold mt-8 text-xl">
//             Modifier un compte
//           </h1>
//           <div className="flex items-center justify-center mt-4">
//             <div className="w-40 h-40 rounded-full  border border-dashed border-slate-950 flex items-center justify-center relative">
//               {image === "" || image === null ? (
//                 <BiSolidCameraPlus className="text-[100px]" />
//               ) : (
//                 <img
//                   src={"http://localhost:5000" + image}
//                   alt=""
//                   className="w-full h-full object-cover rounded-full"
//                 />
//               )}
//               <input
//                 type="file"
//                 onChange={handleUpload}
//                 id=""
//                 name=""
//                 className="absolute  w-full h-full opacity-0 cursor-pointer"
//               />
//             </div>
//           </div>
//           <form onSubmit={handleSubmit(onSubmit)} className="px-4 mt-4">
//             <Input
//               state={{ ...register("pseudo") }}
//               type={"text"}
//               label={"Pseudo"}
//               error={errors?.pseudo}
//             />
//             <p className="text-sm text-rose-500">{errors?.pseudo?.message}</p>
//             <Input
//               state={{ ...register("email") }}
//               type={"text"}
//               label={"Email"}
//               error={errors?.email}
//             />
//             <p className="text-sm text-rose-500">{errors?.email?.message}</p>

//             {/* <Input
//               state={{ ...register("password") }}
//               type={"password"}
//               label={"Password"}
//               error={errors?.password}
//             />
//             <p className="text-sm text-rose-500">{errors?.password?.message}</p> */}

//             <div className="mt-2 flex items-center space-x-2 md:space-x-10">
//               <label htmlFor="">Service: </label>
//               <select
//                 id="service"
//                 name="service"
//                 {...register("serviceId")}
//                 className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
//               >
//                 {!loadingService &&
//                   successService &&
//                   services.map((service) => (
//                     <option key={service.id} value={service.id}>
//                       {service.nom_ser}
//                     </option>
//                   ))}
//               </select>
//             </div>

//             <div className="flex justify-center items-center space-x-6 mt-6">
//               <Button
//                 type="submit"
//                 width="w-[100px] block"
//                 styles="flex items-center justify-center"
//                 color="bg-gradient-to-r from-green-800 to-green-400"
//               >
//                 <h1>Modifier</h1>
//               </Button>

//               <Button
//                 type="button"
//                 width="w-[100px] block"
//                 onClick={() => setOpen(false)}
//                 styles="flex items-center justify-center"
//                 color="bg-gradient-to-r from-red-800 to-red-400"
//               >
//                 <h1 className="ml-2">Fermer</h1>
//               </Button>
//             </div>
//           </form>
//         </div>
//       ) : isLoading ? (
//         <div className="h-full w-full flex items-center justify-center">
//           <Message message="Modification en cours" icon={CircleLoader} />
//         </div>
//       ) : isSuccess ? (
//         <div className="h-full w-full flex items-center justify-center">
//           <Message message="Modification avec succès" icon={Success} />
//         </div>
//       ) : (
//         isError && (
//           <div className="h-full w-full flex items-center justify-center">
//             <Message
//               message="Une erreur s'est produite"
//               icon={FcDeleteDatabase}
//             />
//           </div>
//         )
//       )}
//     </SlideModal>
//   );
// };

export default AjoutCompte;
