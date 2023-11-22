import React from 'react'
import Button from '../components/Button'
import { TabTitle } from '../utils/GeneralFunctions'


const SettingLayout = () => {
  TabTitle('Paramètre du compte')
  return (
    <div className='w-full h-screen px-12'>
      <h1 className='text-center text-3xl py-8 font-mono dark:shadow-md mt-3 rounded-lg dark:bg-slate-900'>LISTES DES COMPTES</h1>
      <div className='w-full flex justify-end rounded-full'>
          <Button styles="my-4 font-mono" width="w-[230px]" color="bg-gradient-to-r from-blue-800 to-blue-400 dark:to-purple-400">
             <strong>+</strong> Ajout un compte
          </Button>
      </div>
      <div className='w-full mt-0 text-center dark:bg-purple-950 bg-slate-900 font-mono text-white py-2 px-1 grid grid-cols-4 rounded-tr-xl rounded-tl-xl'>
          <p>Pseudo</p>
          <p>Email</p>
          <p>Service</p>
          <p>Actions</p>
      </div>
    </div>
  )
}

export default SettingLayout