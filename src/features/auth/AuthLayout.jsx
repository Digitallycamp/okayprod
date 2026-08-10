import React from 'react';
import { Outlet } from 'react-router';

function AuthLayout() {
	return (
		<div className='flex h-screen'>
			<div className=' hidden lg:flex-1 lg:flex flex-col lg:justify-between px-40 py-8 bg-linear-to-b from-[#4f39f6] to-[#2f258a] h-screen'>
				<div>
					<h1 className='text-3xl text-white font-bold mt-40'>Hello</h1>
					<p className='text-3xl text-white font-bold'>Salesaza</p>
					<p className='text-white mt-6'>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod
						delectus maiores beatae alias quos doloremque libero expedita rem
						veritatis perferendis? Sint inventore ducimus ut pariatur, ab alias?
						Alias, iusto cupiditate!
					</p>
				</div>
				<div>
					<p className='text-white'>
						&copy; 2026 Salesaza, All rights reserved
					</p>
				</div>
			</div>
			<div className='  lg:flex-1 w-screen '>
				<Outlet />
			</div>
		</div>
	);
}

export default AuthLayout;
