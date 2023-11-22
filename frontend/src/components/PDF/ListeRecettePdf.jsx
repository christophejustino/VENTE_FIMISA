import React, { useEffect, useState } from "react";

const ListeRecettePdf = ({ data, date }) => {
  const [recetteTotal, setRecetteTotal] = useState(0);

  useEffect(() => {
    if (data && data.length > 0) {
      let totalRecette = 0;

      data.forEach((item) => {
        const recette = item.qte_vendu * item.calendrierRecette[0].produit?.pu;
        totalRecette += recette;
      });

      setRecetteTotal(totalRecette);
    }
  }, [data]);
  const [depenseTotal, setDepenseTotal] = useState(0);
  const [rapprochementCaisse, setRapprochementCaisse] = useState(0);

  //Calcul de la dépense totale
  useEffect(() => {
    if (data && data.length > 0) {
      let totalDepense = 0;

      data.forEach((item) => {
        const qteRestante =
          item.calendrierRecette[0].produit?.qte_stock - item.qte_vendu;
        const depense = qteRestante * item.calendrierRecette[0].produit?.pu;
        totalDepense += depense;
      });

      setDepenseTotal(totalDepense);
    }
  }, [data]);

  useEffect(() => {
    const rapprochement = (recetteTotal - depenseTotal) * -1;
    setRapprochementCaisse(rapprochement);
  }, [recetteTotal, depenseTotal]);
  return (
    <div className="mx-auto w-[28cm] bg-white min-h-[400px]">
      <div className="dark:text-black font-semibold px-10 py-14 flex items-center justify-start space-x-8 text-base">
        <div className="flex flex-col justify-start space-y-3">
          <div>
            {/* <h1>ANNEE {new Date(data[0]?.date_paiement).getUTCFullYear()}</h1> */}
            <h1 className="text-lg">ANNEE {new Date(date).getFullYear()}</h1>
          </div>
          <div>
            <h1 className="text-lg">SERVICE {data[0]?.services.nom_ser}</h1>
            {/* <h1>DATE : {new Date(data[0]?.date_paiement).toLocaleDateString()}</h1> */}
          </div>
        </div>
        <div className="flex space-y-3 justify-start flex-col">
          <div>
            <h1 className="text-lg">GESTION DE VENTE</h1>
            {/* <h1>ANNEE {new Date(data[0]?.date_paiement).getUTCFullYear()}</h1> */}
          </div>
          <div>
            <h1 className="text-lg">
              Date: {new Date(date).toLocaleDateString()}
            </h1>
            {/* <h1>DATE : {new Date(data[0]?.date_paiement).toLocaleDateString()}</h1> */}
          </div>
        </div>
      </div>
      <div className="mx-2 -mt-8">
        <div className="grid grid-cols-1 md:grid-cols-[191px,127px,120px,127px,127px,127px,127px,127px] dark:text-black  font-bold border border-slate-950">
          <p className="border-r text-center border-r-slate-950 last:border-r-0 pl-2 first:pl-0">
            DENOMINATION
          </p>
          <p className="border-r text-center border-r-slate-950 last:border-r-0 pl-2 first:pl-0">
            Conditionnés en
          </p>
          <p className="border-r text-center border-r-slate-950 last:border-r-0 pl-2 first:pl-0">
            Prix U (Ar)
          </p>
          <p className="border-r text-center border-r-slate-950 last:border-r-0 pl-2 first:pl-0">
            Quantité stock
          </p>
          <p className="border-r text-center border-r-slate-950 last:border-r-0 pl-2 first:pl-0">
            Quantité récu
          </p>
          <p className="border-r text-center border-r-slate-950 last:border-r-0 pl-2 first:pl-0">
            Quantité vendu
          </p>
          <p className="border-r text-center border-r-slate-950 last:border-r-0 pl-2 first:pl-0">
            Recette
          </p>
          <p className="border-r border-r-slate-950 last:border-r-0 last:pl-4 first:pl-0">
            Depense
          </p>
        </div>
        {data.length > 0 &&
          data.map((item) => (
            <div
              key={item.id}
              className=" grid-cols-1  grid md:grid-cols-[191px,127px,120px,127px,127px,127px,127px,127px] dark:text-black border border-slate-950"
            >
              <p className="border-r text-center border-r-slate-950 last:border-r-0 pl-2 first:pl-0">
                {item.calendrierRecette[0].produit?.design}
              </p>
              <p className="border-r text-center border-r-slate-950 last:border-r-0 pl-2 first:pl-0">
                UNITE
              </p>
              <p className="border-r text-center border-r-slate-950 last:border-r-0 pl-2 first:pl-0">
                {(item.calendrierRecette[0].produit?.pu).toLocaleString()}
              </p>
              <p className="border-r text-center border-r-slate-950 last:border-r-0 pl-2 first:pl-0">
                {item.calendrierRecette[0].produit?.qte_stock}
              </p>
              <p className="border-r text-center border-r-slate-950 last:border-r-0 pl-2 first:pl-0">
                {item.calendrierRecette[0].produit?.qte_stock - item.qte_vendu}
              </p>
              <p className="border-r text-center border-r-slate-950 last:border-r-0 pl-2 first:pl-0">
                {item.qte_vendu}
              </p>
              <p className="border-r text-center border-r-slate-950 last:border-r-0 pl-2 first:pl-0">
                {(
                  item.qte_vendu * item.calendrierRecette[0].produit?.pu
                ).toLocaleString()}
              </p>
              <p className="border-r border-r-slate-950 last:border-r-0 last:pl-4 first:pl-0">
                {(
                  (item.calendrierRecette[0].produit?.qte_stock -
                    item.qte_vendu) *
                  item.calendrierRecette[0].produit?.pu
                ).toLocaleString()}
              </p>
            </div>
          ))}
        <div className="grid grid-cols-1 md:grid-cols-[191px,127px,120px,127px,127px,381px] dark:text-black text-center font-bold border border-slate-950">
          <p className="border-r border-r-slate-950 last:border-r-0 pl-2 first:pl-0">
            Rapprochement caisse
          </p>
          <p className="border-r border-r-slate-950 last:border-r-0 pl-2 first:pl-0"></p>
          <p className="border-r border-r-slate-950 last:border-r-0 pl-2 first:pl-0"></p>
          <p className="border-r border-r-slate-950 last:border-r-0 pl-2 first:pl-0">
            RECETTE .T
          </p>
          <p className="border-r border-r-slate-950 last:border-r-0 pl-2 first:pl-0">
            DEPENSE .T
          </p>
          <p className="border-r border-r-slate-950 last:border-r-0 pl-2 first:pl-0">
            RECETTE NET(Ar)
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-[191px,127px,120px,127px,127px,381px] dark:text-black text-center border border-slate-950">
          <p className="border-r border-r-slate-950 last:border-r-0 pl-2 first:pl-0">
            {rapprochementCaisse.toLocaleString()} Ar
          </p>
          <p className="border-r border-r-slate-950 last:border-r-0 pl-2 first:pl-0"></p>
          <p className="border-r border-r-slate-950 last:border-r-0 pl-2 first:pl-0"></p>
          <p className="border-r border-r-slate-950 last:border-r-0 pl-2 first:pl-0">
            {recetteTotal.toLocaleString()} Ar
          </p>
          <p className="border-r border-r-slate-950 last:border-r-0 pl-2 first:pl-0">
            {depenseTotal.toLocaleString()} Ar
          </p>
          <p className="border-r border-r-slate-950 last:border-r-0 pl-2 first:pl-0">
            {rapprochementCaisse.toLocaleString()} Ar
          </p>
        </div>
      </div>
    </div>
  );
};

export default ListeRecettePdf;
