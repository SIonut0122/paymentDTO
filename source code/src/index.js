import   React    	        from 'react';
import   ReactDOM 	        from 'react-dom';
import   Main     	        from './components/Main';
import   PaymentDetails     from './components/PaymentDetails';
import { BrowserRouter as 
		 Router, 
		 Route, 
		 Switch } 			from 'react-router-dom'; 
 

 const routing = (
		<Router basename='/'>
			<Switch>
				 <Route exact path  = {'/'} component = {Main}/>
				 <Route exact path  = {'/paymentapproved'}         component = {PaymentDetails}/>
				 <Route  path 		= ''                           component = {Main}/>
			</Switch>
		</Router>
 )



ReactDOM.render(routing, document.getElementById('root'));