import   React          from 'react';
import   API            from '../firebase/api';
import { Redirect }     from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import '../css/Main.css';



class Main extends React.Component {
	
	state = { 
				creditCardNumber      : '',
				creditCardNumberValid : false,
				creditCardNumberErr   : false,

				cardHolder            : '',
				cardHolderValid       : false,
				cardHolderErr         : false,

				expMonthDate          : '',
				expMonthDateValid     : false,

				expYearDate           : '',
				expYearDateValid      : false,

				expireDateValid       : false,
				expireDateValidErr    : false,

				securityCode          : '',
				securityCodeValid     : true,
				securityCodeErr       : false,
				
				amount                : '',
				amountValid           : false,
				amountErr             : false,

				loadingPayment        : false,	
				paymentRefused        : false,		
				paymentApproved       : false,
			}





	handleCardNumber(e) {
		let cardNumber            = e.target.value,
        	// Check cardNumber characters
      		checkCardNumber       = cardNumber.split('').every(x => x.match(/[0-9]+/g)),
        	// Check cardNumber length to be equal with 16
      		checkCardNumberLength = cardNumber.length === 16,
        	// Check for blank spaces
      		checkWhiteSpaces 	  = cardNumber.trim().length === cardNumber.length;


	    if(checkCardNumber && checkCardNumberLength && checkWhiteSpaces) {
	        this.setState({creditCardNumber: cardNumber, creditCardNumberValid: true})
	      } else if(cardNumber.length === 0) {
	      // If input is empty, reset value input
	        this.setState({creditCardNumber: '', creditCardNumberValid: false})
	      } else {
	        this.setState({creditCardNumber: cardNumber, creditCardNumberValid: false})
	    }
	}

	handleCardName(e) {
		 let cardName           = e.target.value,
           	// Check cardName characters
         	checkCardName       =  cardName.split('').every(x => x.match(/[a-zA-Z ]+/g)),
           	// Check for input not to be only blank spaces
         	onlyBlankSpaces     =  cardName.split('').every(x => x.match(/[ ]+/g)),
           	// Check cardName length to be at least 2
         	checkCardNameLength = cardName.length >= 4;


		    if(checkCardName && checkCardNameLength && !onlyBlankSpaces) {
		        this.setState({ cardHolder: cardName, cardHolderValid: true })
		    } else if(cardName.length === 0) {
		      // If input is empty, reset value input
		        this.setState({ cardHolder: '', cardHolderValid: false })
		    } else {
		        this.setState({ cardHolder: cardName, cardHolderValid: false })
		    }
	}
	
	handleExpMonthDate(e) {
			let expMonth        = e.target.value,
        	// Check expMonth characters
      		checkExpMonth       = expMonth.split('').every(x => x.match(/[0-9]+/g)),
        	// Check expMonth length to be equal with 2
      		checkExpMonthLength = expMonth.length === 2,
        	// Check for blank spaces
      		checkWhiteSpaces    = expMonth.trim().length === expMonth.length;


		    if(checkExpMonth && checkExpMonthLength && checkWhiteSpaces) {
		        this.setState({expMonthDate: expMonth, expMonthDateValid: true})
		      } else if(expMonth.length === 0) {
		      // If input is empty, reset value input
		        this.setState({expMonthDate: '', expYearDate: '', expMonthDateValid: false})
		      } else {
		        this.setState({expMonthDate: expMonth, expMonthDateValid: false})
		    }
 
	}

	handleExpYearDate(e) {
		let expYear             = e.target.value,
        	// Check expYear characters
      		checkExpYear        = expYear.split('').every(x => x.match(/[0-9]+/g)),
        	// Check expYear length to be equal with 2
      		checkExpYearLength  = expYear.length === 2,
        	// Check for blank spaces
      		checkWhiteSpaces    = expYear.trim().length === expYear.length;


		    if(checkExpYear && checkExpYearLength && checkWhiteSpaces) {
		        this.setState({expYearDate: expYear, expYearDateValid: true})
		      } else if(expYear.length === 0) {
		      // If input is empty, reset value input
		        this.setState({expYearDate: '', expMonthDate: '', expYearDateValid: false})
		      } else {
		        this.setState({expYearDate: expYear, expYearDateValid: false})
		    }
	}

	validateExpirationData() {
		
		// If typed date month and year are valid, proceed
		if(this.state.expMonthDateValid && this.state.expYearDateValid) {

			 let  expMonthDate = parseFloat(this.state.expMonthDate),
			 	  expYearDate  = parseFloat(this.state.expYearDate),
			      date         = new Date(),
			      getMonth     = date.getMonth() + 1,
			      getYear      = date.getFullYear(),
			      getEndOfYear = parseFloat(getYear.toString().substring(2,getYear.length)); // Get last two numbers from year value

			// Add missing zero to day value
		  		function addZero(i) {
				  if (i < 10) {
				    i = "0" + i;
				  }
				  return i;
				}
				// Pass to function to add missing zero from day number
				let thisMonth = addZero(getMonth);

			// If current year is equal with typed year and month is equal or lower than current month, return error
			if(expYearDate === getEndOfYear && thisMonth >= expMonthDate) {
				this.setState({ expireDateValid: false })
			} else {
			 	// If year is equal or higher than 20 and expiration month <= 12, proceed
				if(expYearDate >= 20 && expMonthDate > 0 && expMonthDate <= 12) {
					this.setState({ expireDateValid: true })
				} else {
					this.setState({ expireDateValid: false })
				}
 			}
		}
	}

	handleSecurityCode(e) {
		let secCode            = e.target.value,
        	// Check secCode characters to be only digits
      		checkSecCode       = secCode.split('').every(x => x.match(/[0-9]+/g)),
        	// Check secCode length to be equal with 3
      		checkSecCodeLength = secCode.length === 3,
        	// Check for blank spaces
      		checkWhiteSpaces   = secCode.trim().length === secCode.length;


		    if(checkSecCode && checkSecCodeLength && checkWhiteSpaces) {
		        this.setState({securityCode: secCode, securityCodeValid: true, securityCodeErr: false})
		      } else if(secCode.length === 0) {
		      // If input is empty, reset value input
		        this.setState({securityCode: '', securityCodeValid: true})
		      } else {
		        this.setState({securityCode: secCode, securityCodeValid: false})
		    }
	}

	handleAmount(e) {
		let amount            = e.target.value,
        	// Check amount characters
      		checkAmount       = amount.split('').every(x => x.match(/[0-9]+/g)),
        	// Check amount length to be equal with 16
      		checkAmountLength = amount.length > 0,
        	// Check for blank spaces
      		checkWhiteSpaces  = amount.trim().length === amount.length;

		    if(checkAmount && checkAmountLength && checkWhiteSpaces) {
		        this.setState({amount: amount, amountValid: true})
		      } else if(amount.length === 0) {
		      // If input is empty, reset value input
		        this.setState({amount: '', amountValid: false})
		      } else {
		        this.setState({amount: amount, amountValid: false})
		    }
	}

 	validateInputsBtn() {

 		// Call to check expiration data format
 		this.validateExpirationData();
 		// Display loading effect
 		this.setState({ loadingPayment: true })
 		// Leave time to update, and check inputs for validation
 		setTimeout(() => {
 			// First, clear all error messages
 			this.setState({ loadingPayment: false, creditCardNumberErr: false, cardHolderErr: false, expireDateValidErr: false, securityCodeErr: false, amountErr: false })
 			
 			// Check for validation
 			if(this.state.creditCardNumberValid) {
 				if(this.state.cardHolderValid) {
 					if(this.state.expireDateValid) {
 						if(this.state.securityCodeValid) {
 							if(this.state.amountValid) {
 								// If all inputs are valid, proceed with payment
 								this.processPayment();
 							} else {
 								this.setState({ amountErr: true })
 							}
 						} else {
 							this.setState({ securityCodeErr: true })
 						}
 					} else {
 						this.setState({ expireDateValidErr: true })
 					}
 				} else {
 					this.setState({ cardHolderErr: true })
 				}
 			} else {
 				this.setState({ creditCardNumberErr: true })
 			}
 		},1200);

 	}

 	processPayment() {

 		// Prepare DTO
 		let paymentInfo = {
 			creditCardNumber : this.state.creditCardNumber,
			cardholder       : this.state.cardHolder,
			expirationDate   : this.state.expMonthDate+'/'+this.state.expYearDate,
			securityCode     : this.state.securityCode,
			amount           : this.state.amount
 		}


 		// Send POST request to database
		API.post('/paymentInfo.json', paymentInfo)
		.then(() => {

 			// Get random number to be used as 'transaction number'
			let transactionNumber = uuidv4();

			// Get only first 13 numbers
			paymentInfo.transNumber = transactionNumber.substring(0,13);

			// Set state payment info data and proceed with the DTO to database
			this.setState({ paymentInfo: paymentInfo })

			// Set paymentApproved to true to display info payment
			setTimeout(() => {
				this.setState({ paymentApproved: true })					
			},1500);
		})
		.catch(err => { 
				console.log('Payment refused: '+err);
				// Display error message
				this.setState({ paymentRefused: true })
			})
 	}


	render() {

		// If paymentApproved is true and paymentInfo !== null, proceed to payment details page
		if(this.state.paymentApproved && this.state.paymentInfo) {
			return (
				<Redirect to={{
			    pathname: '/paymentapproved',
			    data: this.state.paymentInfo
				}} />
			)
		} 

		return (
			<div>
				<div className='wrap_container'>
					<div className='container'>
						<div className='inputs_form'>

							{/* Loading payment effect */}
							{this.state.loadingPayment && (
							<div className='inputs_form_loadingeff'>
								<div className='lds-roller'><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
							</div>
							)}

							<ul>	
								<li className='wr_top_txt'>Payment details</li>
								<li className='wr_top_acc_cardsimg'></li>

								{/* Card number */}
								<li className='wrap_input_title'>Card number *
									<span className='wit_subtit'>(16 digits)</span>
								</li>
								<li className='wrap_input_form'>
									<input type='text'
										   maxLength='16'
										   onChange={(e) => this.handleCardNumber(e)}>
								    </input>
								</li>
								{this.state.creditCardNumberErr && (
								<li className='input_err_msg'>Invalid card number</li>
								)}

								{/* Card holder */}
								<li className='wrap_input_title'>Card holder *
									<span className='wit_subtit'>(John Smith)</span>
								</li>
								<li className='wrap_input_form'>
									<input type='text'
										   onChange={(e) => this.handleCardName(e)}>
									</input>
								</li>
								{this.state.cardHolderErr && (
								<li className='input_err_msg'>Invalid card name</li>
								)}

								{/* Expiration date - MM/YY */}
								<li className='wrap_input_title'>Expiration date *
									<span className='wit_subtit'>(MM/YY)</span>
								</li>
								<li className='wrap_input_form_expdate'>
									<span className='winpt_expdyear_txt'>Month:</span>
									<input type='text'
										   maxLength='2'
										   value={this.state.expMonthDate}
										   className='winp_expdate_month'
										   onBlur={() => this.validateExpirationData()}
										   onChange={(e) => this.handleExpMonthDate(e)}>
									</input>

									<span className='wrap_expdate_inp'>
										<span className='winpt_expdyear_txt'>Year:</span>
										<input type='text'
											   maxLength='2'
											   className='winpt_expdate_year'
											   value={this.state.expYearDate}
											   onBlur={() => this.validateExpirationData()}
											   onChange={(e) => this.handleExpYearDate(e)}>
										</input>
									</span>

								</li>

								{this.state.expireDateValidErr && (
								<li className='input_err_msg'>Invalid date format</li>
								)}

								{/* Security code */}
								<li className='wrap_input_title'>Security code
									<span className='wit_subtit'>(CVV)</span>
								</li>
								<li className='wrap_input_form'>
									<input type='text'
										   maxLength='3'
										   onChange={(e) => this.handleSecurityCode(e)}>
									</input>
								</li>
								{this.state.securityCodeErr && (
								<li className='input_err_msg'>Invalid security code</li>
								)}

								{/* Amount value */}
								<li className='wrap_input_title'>Amount *</li>
								<li className='wrap_input_form'>
									<input type='text'
										   maxLength='50'
										   onChange={(e) => this.handleAmount(e)}>
									</input>
								</li>
								{this.state.amountErr && (
								<li className='input_err_msg'>Invalid amount value</li>
								)}

								{/* Proceed button */}
								<li className='validate_inputs_btn'
									onClick={()=>this.validateInputsBtn()}>
									Proceed
								</li>

								{/* If payment was denied, display error message */}
								{this.state.paymentRefused && (
								<li className='input_err_msg'>Something went wrong. Try again.</li>
								)}
							</ul>	
						</div>
						 
					</div>
				</div>
			</div>
		);
	}
}

export default Main;
