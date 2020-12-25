import React,{Component} from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button,Card,CardHeader,CardBody,Table,ListGroup,ListGroupItem,Input,Row,Col,Container} from 'reactstrap';
import '../css/MainComponent.css';
import axios from 'axios';
import UserDetailsComponent from './UserDetailsComponent.js';
import logo from '../githubIcon.png';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure();

class MainComponent extends Component {

	constructor(props) {
		super(props);

		this.state = {
			searchQuery: '',
			searchResults: [],
			userList : [],
			userModal: false,
			selectedUserIndex: -1
		}

	}

	handleOnChange = (event) => {

		this.setState({
			searchQuery: event.target.value,
			searchResults: []
		})


		axios.get('https://api.github.com/search/users',{
				params: {
					q: event.target.value
				}	
		}).then(res => {
			console.log(res);

			if(res.status == 200) {

				this.setState({
					searchResults: res.data.items
				});
			}

		});
	}

	addUser = (event,index) => {
		let searchResults = this.state.searchResults;
		let userList = this.state.userList;

		userList.push(searchResults[index]);
		toast.success(searchResults[index].login + ' added successfully !',{autoClose:2000});
		searchResults.splice(index, 1);

		this.setState({
			userList: userList,
			searchResults: searchResults
		});
	}

	deleteUser = (event,index) => {
		let userList = this.state.userList;
		toast.error(userList[index].login + ' deleted successfully !',{autoClose:2000});

		userList.splice(index, 1);				
		
		this.setState({
			userList: userList,
		});

	}

	viewUser = (event,index) => {
		this.toggleUserModal();

		let userList = this.state.userList;
		userList[index].repositories = []; 	
		
		this.setState({
			selectedUserIndex: index,
			userList: userList
		})

		axios.get(userList[index].repos_url)
		.then((res) => {

			if(res.status == 200) {
				userList[index].repositories = res.data;

				this.setState({
					userList: userList
				});
			}
		});
	}

	toggleUserModal = () => {
		this.setState({
			userModal: !this.state.userModal
		});
	}

	render() {

		let count = 1;

		return (
			<div>
				<Container>
					
				

					<div className="row SearchBox">
						<div className="col-3">
							<div style={{height:'100px',width:'100px'}}>
								<img src={logo} className = "img-responsive" width = "100%" />
							</div>
						</div>

						<div className="col col-6" style={{'margin-top':'30px','padding-right':'0px'}}>
							<div>
								<Input style={{'border-right':'none','border-radius':'2em 0em 0em 2em'}} name="searchBox" placeholder="Search" type="text" value={this.state.searchQuery} onChange={this.handleOnChange} autocomplete="off"/>				
							</div>
							<div style={{visibility:this.state.searchResults.length != 0 ?'visible':'hidden'}} className="SearchResults">
								<ListGroup>
									{	
										this.state.searchResults.map((val,index) => (
											<ListGroupItem className="ListGroupItem" onClick={(event) => this.addUser(event,index)}>{val.login}</ListGroupItem>
										))
									}
								</ListGroup>	
							</div>
						</div>	
						<div className="SearchIcon" style={{'margin-top':'30px','margin-bottom':'32px'}}>
							<i className="fa fa-search" ></i>
						</div>
					</div>

					<div className="row">
						<div className="col-12">
							<Card style={{marginTop: '50px'}}>
				              	<CardHeader style={{'text-align':'left'}}>
				                	<i className="fa fa-align-justify">&emsp;GUTHUB PROFILES</i>  
				              	</CardHeader>
								<CardBody>
					                <Table responsive >
					                	<thead>
					                    	<tr>
					                    		<th scope="col">No</th>
					                      		<th scope="col">Id</th>
					                      		<th scope="col">Username</th>
					                      		<th scope="col">Actions</th>
					        			  		 
					                    	</tr>
					                  	</thead>
					                  	<tbody>
								            { this.state.userList.map((user,index) => 
															 
								               	<tr key={index}>
								               		<td>{index+1}</td>
								                    <td>{user.id}</td>
							                        <td>{user.login}</td>
							                        
							                        <td>
							                        	<button id="viewBtn" 
							                        			className="btn-pill btn Btn " 
							                        			style={{border: '1px solid #007BFF'}}
							                        			onClick = {(event) => this.viewUser(event,index)}
							                        	><i className="fa fa-eye"></i> </button>
							                        	<button id="delBtn" 
							                        			className="btn-pill btn Btn" 
							                        			style={{border: '1px solid #DC3545',marginLeft: '5px'}}
							                        			onClick = {(event) => this.deleteUser(event,index)}
							                        	><i className="fa fa-trash"></i> </button>
							                      	</td>
							                        
							                    </tr>			
											)}
								                    
								        </tbody>
								    </Table>
								</CardBody>
							</Card>
						</div>				            
					</div>
					

				</Container>

				<Modal isOpen={this.state.userModal} className="modal-lg">
          			<ModalHeader toggle={this.toggleUserModal}>User Profile</ModalHeader>
			         
			        <ModalBody>
			            <UserDetailsComponent user = {this.state.userList[this.state.selectedUserIndex]}/>

			        </ModalBody>
			          
			        <ModalFooter>
		              	<div className="text-center">
		                	<Button className="btn btn-secondary" onClick={this.toggleUserModal}>Close</Button>
		              	</div>
		            </ModalFooter> 
			    </Modal>
			</div>

		);
	}

}

export default MainComponent;