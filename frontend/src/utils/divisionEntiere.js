function DivisionEntiere(nombre) {
    let division = Math.floor(nombre / 10);
    let reste = nombre % 10;

    if(reste > 0) {
        division++;
    }

    return division;
}

export default DivisionEntiere;