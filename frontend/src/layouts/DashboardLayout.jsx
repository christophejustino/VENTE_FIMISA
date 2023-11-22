import React from "react";
import { TabTitle } from "../utils/GeneralFunctions";
import { MdOutlineHomeRepairService } from "react-icons/md";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { PiListChecksFill } from "react-icons/pi";
import Card from "../components/Dashboard/Card";
import Cards from "../components/Dashboard/Cards";
import { useGetDashQuery } from "../redux/slices/dashboardApiSlice";
import { useGetMostProductQuery } from "../redux/slices/produitApiSlice";
import BarChart from "../components/Dashboard/BarChart";
import LineChart from "../components/Dashboard/LineChart";
import PieChart from "../components/Dashboard/PieChart";
import DonutChart from "../components/Dashboard/DonutChart";
import { motion } from "framer-motion";
import CircleLoader from "../components/CircleLoader/CircleLoader";
import { FcDeleteDatabase } from "react-icons/fc";
import Button from "../components/Button";
import { BiRefresh } from "react-icons/bi";
import { useRecetteParMoisQuery } from "../redux/slices/CalendrierApiSlice";

const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.9,
      staggerChildren: 0.2,
    },
  },
};
const year = 2023;

const item = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

const DashboardLayout = () => {
  TabTitle("Page d'accueil");

  const {
    data: dash,
    isError,
    isLoading,
    refetch,
    isSuccess,
  } = useGetDashQuery();

  const {
    data: rec,
    isError: erreur,
    isLoading: Loading,
    isSuccess: succes,
  } = useRecetteParMoisQuery(year);

  const {
    data: prod,
    isError: err,
    isLoading: load,
    refetch: ref,
    isSuccess: succ,
  } = useGetMostProductQuery();

  const icons = [
    MdOutlineHomeRepairService,
    PiListChecksFill,
    HiOutlineShoppingCart,
  ];
  const colors = [
    "bg-blue-500 dark:bg-blue-500 dark:text-slate-950",
    "bg-purple-500 dark:bg-purple-500 dark:text-slate-950",
    "bg-rose-300 dark:bg-rose-500 dark:text-slate-950",
  ];
  return (
    <section className="p-6">
      {isLoading ? (
            <div className="flex items-center -mt-28 md:-mt-20 h-screen justify-center">
              <CircleLoader />
            </div>
      ) : (
        <div>
          {isSuccess ? (
            <>
              <motion.div
                variants={container}
                initial="hidden"
                animate="visible"
                className="max-w-[1280px] mx-auto grid md:grid-cols-3 min-[500px]:grid-cols-2 grid-cols-1 sm:grid-cols-4 gap-4"
              >
                {isSuccess &&
                  dash.generalStat.map((stat, index) => (
                    <Card
                      key={index}
                      color={colors[index]}
                      tittle={stat.tittle}
                      data={stat.data}
                      icon={icons[index]}
                    />
                  ))}
              </motion.div>
              <motion.div
                variants={container}
                initial="hidden"
                animate="visible"
                className="max-w-[1280px] mx-auto py-4 grid md:grid-cols-3 min-[500px]:grid-cols-2 grid-cols-1 sm:grid-cols-4 gap-4"
              >
                {succ && (
                  <>
                    <Cards
                      label={"Produit le plus vendu"}
                      tittle={prod.design}
                      data={prod.max}
                    />
                  </>
                )}
              </motion.div>
              <motion.div
                variants={container}
                initial="hidden"
                animate="visible"
                className="mt-2 max-w-[1280px] grid md:grid-cols-2 sm:grid-cols-4 grid-cols-1  gap-4 mx-auto"
              >
                <motion.div
                  variants={item}
                  animate="visible"
                  initial="hidden"
                  className="p-3 bg-white dark:bg-slate-800 rounded-lg shadow-lg"
                >
                  <p className="font-semibold">
                    Nombre des produits par service
                  </p>
                  <div className="h-[300px]">
                    {isSuccess && (
                      <BarChart
                        name="Nombre des produits par service"
                        data={dash.nbProduits}
                        categories={dash.nameServices}
                      />
                    )}
                  </div>
                </motion.div>
                <motion.div
                  variants={item}
                  animate="visible"
                  initial="hidden"
                  className="p-3 bg-white dark:bg-slate-800 rounded-lg shadow-lg"
                >
                  <p className="font-semibold">Nombre des recettes par mois</p>
                  <div className="h-[300px]">
                    {succes && (
                      <LineChart
                        name="Nombre des recettes par mois"
                        data={rec.categories}
                        categories={rec.data}
                      />
                    )}
                  </div>
                </motion.div>
                <motion.div
                  variants={item}
                  animate="visible"
                  initial="hidden"
                  className="p-3 bg-white dark:bg-slate-800 rounded-lg shadow-lg"
                >
                  <p className="font-semibold">Nombre des recettes par mois</p>
                  <div className="h-[300px]">
                    {succes && (
                      <PieChart data={rec.categories} labels={rec.data} />
                    )}
                  </div>
                </motion.div>
                <motion.div
                  variants={item}
                  animate="visible"
                  initial="hidden"
                  className="p-3 bg-white dark:bg-slate-800 rounded-lg shadow-lg"
                >
                  <p className="font-semibold">
                    Nombre des recettes par service
                  </p>
                  <div className="h-[300px]">
                    {isSuccess && (
                      <DonutChart
                        data={dash.nbRecettes}
                        labels={dash.nameServices}
                      />
                    )}
                  </div>
                </motion.div>
              </motion.div>
            </>
          ) : (
            isError && <ErrorBase refetch={refetch} />
          )}
        </div>
      )}
    </section>
  );
};

const ErrorBase = ({ refetch }) => {
  return (
    <div className="w-full h-30 md:h-60">
      <div className="flex items-center bg-white shadow-lg flex-col md:mt-16 mt-16 justify-center md:space-y-3">
        <FcDeleteDatabase className="md:text-[160px] text-[80px] md:mt-0 mt-4" />
        <h2 className="md:text-xl text-center dark:text-slate-50 font-semibold">
          Une erreur s'est produite
        </h2>
      </div>
      <div className="flex justify-start md:-mt-48 -mt-32 mx-2 md:mx-2">
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

export default DashboardLayout;
