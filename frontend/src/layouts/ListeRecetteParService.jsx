import { useEffect, useRef, useState } from "react";
import {
  useGetRecetteByServiceQuery,
  useGetAllServiceQuery,
} from "../redux/slices/recetteApiSlice";
// import { AiFillPrinter } from "react-icons/ai";
import { FcCancel, FcPrint } from "react-icons/fc";
import ListeRecettePdf from "../components/PDF/ListeRecettePdf";
import { useSelector, useDispatch } from "react-redux";
import { setServiceId } from "../redux/slices/recetteSlice";
import clsx from "clsx";
import ReactToPrint from "react-to-print";
import { TabTitle } from "../utils/GeneralFunctions";
import CircleLoader from "../components/CircleLoader/CircleLoader";

const ListeRecetteParService = () => {
  TabTitle("Page de l'impression recette");
  const {
    data: service,
    isLoading: serviceLoading,
    isSuccess: serviceSuccess,
  } = useGetAllServiceQuery();

  const pdfRef = useRef();

  const { serviceId } = useSelector((state) => state.recette);

  const [date, setDate] = useState(new Date().toISOString());

  const { data, isSuccess, isLoading, refetch } = useGetRecetteByServiceQuery({
    data: {
      serviceId,
      date,
    },
  });

  useEffect(() => {
    refetch();
  }, [date]);
  return (
    <>
      <div className="md:hidden flex flex-col items-center justify-center mt-10">
        <h1 className="text-base ">
          Cette page est non autorisée par le télephone mobile
        </h1>
        <FcCancel className="text-6xl" />
      </div>
      <section className="p-2 hidden md:block">
        <h1 className="text-2xl font-semibold my-2 text-center">
          Liste des recettes par service
        </h1>
        {serviceLoading ? (
          <div className="flex items-center rounded-lg justify-center py-12 bg-slate-200 dark:bg-slate-700 ">
            <CircleLoader />
          </div>
        ) : (
          <div>
            <div className="flex items-center space-x-4 justify-center py-3">
              {serviceSuccess &&
                service.map((item) => (
                  <ServiceItem
                    key={item.id}
                    nom={item.nom_ser}
                    id={item.id}
                    active={
                      serviceId === "first"
                        ? item.nom_ser === "FOURNITURE"
                        : serviceId === item.id
                    }
                  />
                ))}
            </div>
            <div className="flex items-center justify-between">
              <div className="px-14">
                <ReactToPrint
                  trigger={() => (
                    <button className="py-2 px-4 flex items-center space-x-3 mx-auto text-slate-50 justify-center dark:bg-purple-600 bg-slate-800 rounded-lg">
                      <FcPrint className="text-2xl" />
                      <p className="text-base">Imprimer</p>
                    </button>
                  )}
                  content={() => pdfRef.current}
                />
              </div>
              <div className="px-14">
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="block mx-auto my-3 dark:bg-slate-700 rounded-lg"
                />
              </div>
            </div>

            {isLoading && <p className="text-center">Chargement ...</p>}
            <div ref={pdfRef}>
              {isSuccess && <ListeRecettePdf data={data} date={date} />}
            </div>
          </div>
        )}
      </section>
    </>
  );
};

const ServiceItem = ({ id, nom, active }) => {
  const dispatch = useDispatch();
  const func = () => {
    dispatch(setServiceId(id));
  };
  return (
    <div
      onClick={func}
      className={clsx(
        "px-2 font-bold rounded py-2 cursor-pointer",
        active
          ? " dark:bg-purple-700 bg-slate-900 text-slate-50"
          : " dark:bg-purple-400 bg-slate-300 text-slate-900"
      )}
    >
      {nom}
    </div>
  );
};

export default ListeRecetteParService;
