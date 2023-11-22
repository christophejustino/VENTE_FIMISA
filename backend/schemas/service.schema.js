import * as yup from 'yup';

const serviceSchema = yup.object({
    body:yup.object({
        nom_ser: yup.string().required('Nom de service obligatoire')
    })
});

export default serviceSchema;