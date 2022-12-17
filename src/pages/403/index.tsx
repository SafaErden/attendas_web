import { useNavigate } from 'react-router-dom'

export const PageNotFound = () => {
	const navigate = useNavigate()

	const goBackHome = () => {
		navigate('/')
	}
	return (
		<div
			style={{ height: 'calc(100vh - 64px)' }}
			className='bg-white min-h-full px-4 py-16 sm:px-6 sm:py-24 grid place-items-center lg:px-8'
		>
			<div className='max-w-max mx-auto'>
				<main className='sm:flex'>
					<p className='text-4xl tracking-tight font-bold text-indigo-600 sm:text-5xl sm:tracking-tight'>403</p>
					<div className='sm:ml-6'>
						<div className='sm:border-l sm:border-gray-200 sm:pl-6'>
							<h1 className='text-4xl font-bold text-gray-900 tracking-tight sm:text-5xl sm:tracking-tight'>
								Uppps, you can&apos;t see this page
							</h1>
							<p className='mt-1 text-base text-gray-500'>Please check the URL in the address bar and try again.</p>
						</div>
						<div className='mt-10 flex space-x-3 sm:border-l sm:border-transparent sm:pl-6'>
							<span
								onClick={goBackHome}
								className='inline-flex items-center cursor-pointer px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
							>
								Go back home
							</span>
						</div>
					</div>
				</main>
			</div>
		</div>
	)
}
