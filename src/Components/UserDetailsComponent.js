import React from 'react';
import { Card,CardHeader,CardBody,Table,ListGroup,ListGroupItem,Input,Row,Col,Container} from 'reactstrap';

function UserDetailsComponent(props){

			console.log(props)

	let top5repos = [];

	for(let counter = 0;counter < 5;counter++) {
		if(counter < props.user.repositories.length) {
			top5repos.push(props.user.repositories[counter]);
		}else {
			break;		    						
		}
	}			

	return (

		<div className="row">
			<div className="col-4">
				<img src={props.user.avatar_url} className = "img-responsive" width = "100%"/>
			</div>
		
			<div className="col-8">
				<Card>
					<CardHeader style={{'color':'white','background-color':'#339CBD','text-align':'left'}}>
				       <i className="fa fa-github fa-lg">&emsp;<b>Name : {props.user.login}</b></i>  
				    </CardHeader>
				    <CardBody>
				    	<div className="row">
				    		<div className="col-12">
				    				<i className="fa fa-star">&nbsp;&nbsp;<b>Top Repositories</b></i><br/>
				    				<br/>
				    					<ListGroup style={{'overflow-y':'auto','max-height':'200px'}}>
				    					{
				    						top5repos.map((repo,index) => (

				    							<ListGroupItem>{repo.name}<br/>
				    							<i style={{'color':'grey'}}>Description : {repo.description}</i></ListGroupItem>
				    						))
				    					}	
				    					</ListGroup>
				    		</div>

				    	</div>
				    </CardBody>
				</Card>


			</div>
		</div>
	);
}

export default UserDetailsComponent;