import React from 'react'
import {BiError} from 'react-icons/bi'

const ErrorPage = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '200px' }}>
        <h2 className='text-red-600 font-bold'>404 page introuvable</h2>
      <h1 className='font-bold'>Oops! Quelque chose s'est mal passé.</h1>
      <p className='font-bold'>Désolés, mais une erreur s'est produite parceque votre page n'existe pas.</p>
      <div className='flex justify-center items-center'>
        <BiError className='w-[150px] h-[150px] text-red-600'/>
      </div>
    </div>
  )
}

export default ErrorPage