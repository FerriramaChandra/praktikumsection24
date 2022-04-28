import { gql } from "@apollo/client";

export const GET_ANGGOTA = gql`
query MyQuery {
    Stasiun {
        id
        Umur
        Nama
        JenisKelamin
    }
}
`;

export const SEARCH_ANGGOTA_BY_ID = gql`
    query MyQuery($id: Int!) {
        Stasiun_by_pk(id: $id) {
            id
            JenisKelamin
            Nama
            Umur
        }
    }
`;

export const INSERT_DATA = gql `
    mutation MutationInsert($object: Stasiun_insert_input!) {
        insert_Stasiun_one(object: $object) {
            JenisKelamin,
            Nama,
            Umur
        }
    }
`;

export const DELETE_DATA = gql`
    mutation MyMutation($id: Int!) {
        delete_Stasiun_by_pk(id: $id) {
            id,
            Nama,
            Umur,
            JenisKelamin
        }
    }
`;

export const UPDATE_DATA = gql`
    mutation MyMutation($id: Int!, $Nama: String, $Umur: Int, $JenisKelamin: String) {
        update_Stasiun_by_pk(
            pk_columns: {id: $id} _set: {
                Nama: $Nama
                Umur: $Umur
                JenisKelamin: $JenisKelamin
            }) {
            JenisKelamin
            Nama
            Umur
            id
        }
    }
`;

export const SUBSCRIPTION_DATA = gql`
    subscription MySubscription {
        Stasiun {
            JenisKelamin
            Nama
            Umur
            id
        }
    }
`;
