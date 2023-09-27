import React from 'react';
import Footer from '../../../layout/Footer/Footer';
import moment from 'moment';

const DefaultFooter = () => {
	return (
		<Footer>
			<div className='container-fluid'>
				<div className='row'>
					<div className='col'>
						<span className='fw-light'>© 2022-{ moment().format('YY') } - Version 1.0</span>
					</div>
					<div className='col-auto'>
						<a
							href='https://www.linksystem.com.br/'
							target='_blank'
							className='text-decoration-none link-dark'>
							<small className='fw-bold text-light'>Desenvolvido por Link System</small>
						</a>
					</div>
				</div>
			</div>
		</Footer>
	);
};

export default DefaultFooter;
