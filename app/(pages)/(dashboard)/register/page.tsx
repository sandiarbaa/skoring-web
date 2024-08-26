"use client";

import React, { useState } from 'react'
import ProtectedRoute from '../../(auth)/login/protectedRoute/ProtectedRoute'
import DashboardLayout from '@/app/components/Layouts/DashboardLayout'
import { usePathname } from 'next/navigation';
import ModalRegister from '../../(auth)/register/ModalRegister';


const RegisterPage = () => {
    const pathname = usePathname();
    const [akun, setAkun] = useState(false);

    const handleAkun = () => {
      setAkun(true);
    }
    const handleClose = () => {
      setAkun(false);
    }

  return (
    <div>
    <ProtectedRoute>
    <DashboardLayout hover={pathname}>
    <div>
      <div className='flex justify-between p-4 text-ijoToska'>
        <p className='text-xl font-semibold'>Data Account M-Knows</p>
         <button onClick={handleAkun} className='border-2 border-ijoToska p-1 rounded-md'>Tambah Akun</button>
      </div>
      <div className='px-4'>
        <table className="w-full text-xs bg-white table-auto text-start">
        <thead className="bg-[#F5F8FF] text-tulisan">
          <tr>
            <th colSpan={2} className="py-2 border-b-[1.8px]">
              No
            </th>
            <th className="min-w-[20px] border-b-[1.8px]">Username</th>
            <th className="min-w-[20px] border-b-[1.8px]">Email</th>
            <th className="min-w-[20px] border-b-[1.8px]">Role</th>
            <th className="min-w-[20px] border-b-[1.8px]">Password</th>
            <th className="min-w-[20px] border-b-[1.8px]">Action</th>
          </tr>
        </thead>
      </table>
    </div>
      {akun ? <ModalRegister close={handleClose} /> : ""}
    </div>
    </DashboardLayout>
    </ProtectedRoute>
    </div>
  )
}
 
export default RegisterPage
