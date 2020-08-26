import axios from 'axios';


export default axios.create({ 
	baseURL: 'https://test-fe-e5dfa.firebaseio.com/'
})