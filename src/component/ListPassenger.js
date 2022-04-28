//ApolloClient
import { useMutation, useSubscription } from '@apollo/client';

import { useState } from 'react';

//Query
import { INSERT_DATA, UPDATE_DATA, DELETE_DATA, SUBSCRIPTION_DATA, } from './queries/query';

const ListPassenger = () => {

    // const {data, loading} = useQuery(GET_ANGGOTA);

    const [insertAnggota] = useMutation(INSERT_DATA);

    const [deleteAnggota] = useMutation(DELETE_DATA);
    
    const [updateAnggota] = useMutation(UPDATE_DATA);

    const {data, loading} = useSubscription(SUBSCRIPTION_DATA);
    console.log(data);

    const [inputs, setInputs] = useState([
        {
            label: 'Nama',
            type: 'text',
            value: ''
        },
        {
            label: 'Umur',
            type: 'number',
            value: ''
        },
        {
            label: 'Jenis Kelamin',
            type: 'text',
            value: ''
        },
    ])

    const [updateId, setUpdateId] = useState(0)
    
    const HandleSubmit = (e) => {
        e.preventDefault();
        if (updateId === 0) {
        insertAnggota({
            variables: {
                object: {
                    Nama: inputs[0].value,
                    Umur: inputs[1].value,
                    JenisKelamin: inputs[2].value
                }
            }
        })        
        setInputs ([
            {
                label: 'Nama',
                type: 'text',
                value: ''
            },
            {
                label: 'Umur',
                type: 'number',
                value: ''
            },
            {
                label: 'Jenis Kelamin',
                type: 'text',
                value: ''
            },
        ])
        } else {
            updateAnggota({
                variables: {
                    id: updateId,
                    Nama: inputs[0].value,
                    Umur: inputs[1].value,
                    JenisKelamin: inputs[2].value
                }
            })
            setInputs ([
                {
                    label: 'Nama',
                    type: 'text',
                    value: ''
                },
                {
                    label: 'Umur',
                    type: 'number',
                    value: ''
                },
                {
                    label: 'Jenis Kelamin',
                    type: 'text',
                    value: ''
                }]
            )
            setUpdateId(0)
        }
    }

    const HandleDelete = (id) => {
        deleteAnggota({
            variables: {id: id}
        })
    }
    
    const HandleUpdate = (anggota) => {
        setInputs([
            {
                label: 'Nama',
                type: 'text',
                value: anggota.Nama
            },
            {
                label: 'Umur',
                type: 'number',
                value: anggota.Umur
            },
            {
                label: 'Jenis Kelamin',
                type: 'text',
                value: anggota.JenisKelamin
            },
        ])
        setUpdateId(anggota.id)
    }

    const HandleCancel = () => {
        setInputs([
            {
                label: 'Nama',
                type: 'text',
                value: ''
            },
            {
                label: 'Umur',
                type: 'number',
                value: ''
            },
            {
                label: 'Jenis Kelamin',
                type: 'text',
                value: ''
            }
        ])
        setUpdateId(0)
    }

    const handleChange = (value, index) => {
        const newInput = {...inputs[index], value};
        const newInputs = [...inputs];
        newInputs[index] = newInput;
        setInputs(newInputs);
    };

    
    return (
        <div>
            {
                loading ?
                (
                    <h1>Loading</h1>
                )
                :
                <table cellPadding="5px" cellSpacing="0" style={{margin: "auto"}}>
                    <thead bgcolor="red">
                        <tr>
                            <td>Nama</td>
                            <td>Umur</td>
                            <td>Jenis Kelamin</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.Stasiun.map((anggota, anggotaIdx) => (
                                <tr key={anggotaIdx}>
                                    <td>{anggota.Nama}</td>
                                    <td>{anggota.Umur}</td>
                                    <td>{anggota.JenisKelamin}</td>
                                    <button onClick={() => HandleDelete(anggota.id)}>Delete</button>
                                    <button onClick={() => HandleUpdate(anggota)}>Update</button>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
                
            }
            <form onSubmit={HandleSubmit}>
                {
                    inputs.map((input, inputIdx) => (
                        <div key={inputIdx}>
                            <input type={input.text} value={input.value} placeholder={input.label} onChange={(e) => handleChange(e.target.value, inputIdx)} />
                            
                        </div>
                    ))
                }
                <button>Submit</button>
                {
                    updateId !== 0
                    ?
                    <button onClick={HandleCancel}>Cancel</button>
                    :
                    <div></div>
                }
            </form>
        </div>
    )
}

export default ListPassenger;