import   React   		  from 'react';
import { Link, Redirect } from 'react-router-dom';
import '../css/paymentDetails.css';


class PaymentDetails extends React.Component {
	constructor(props) {
		super(props);

		this.state = { data: props.data };
 
	}


	render() {
	  	// If props data is undefined, redirect to main page
		if(this.props.location.data === undefined) {
			return (
			<Redirect to={'/'}/>
			)
		} 

		const paymentInfo = this.props.location.data;
		
		return (
			<div>
				<div className='wrap_container'>
						<div className='container'>
							<div className='wrap_payment_details'>

								{/* Payment details */}

								<div className='paysc_succ_img'></div>
								<span className='paysc_succ_txt'>Payment successful!</span>

								<div className='paysc_row'>
									<span className='paysc_title'>Transaction id:</span>
									<span className='paysc_value'>{paymentInfo.transNumber}</span> 
								</div>

								<div className='paysc_row'>
									<span className='paysc_title'>Card number:</span>
									<span className='paysc_value'>{paymentInfo.creditCardNumber}</span> 
								</div>

								<div className='paysc_row'>
									<span className='paysc_title'>Card holder:</span>
									<span className='paysc_value'>{paymentInfo.cardholder}</span> 
								</div>

								<div className='paysc_row'>
									<span className='paysc_title'>Expiration date:</span>
									<span className='paysc_value'>{paymentInfo.expirationDate}</span> 
								</div>

								<div className='paysc_row paysc_row_amo'>
									<span className='paysc_title'>Amount:</span>
									<span className='paysc_value'>${paymentInfo.amount}</span> 
								</div>

								{/* Back to main page button */}
								<Link to={'/'} className='paysc_back_btn'>Go back</Link>

							</div>
						</div>
				</div>
			</div>
		);
	}
}

export default PaymentDetails;
