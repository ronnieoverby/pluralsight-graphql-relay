import React from "react";
import API from "../api";
import LinkStore from "../stores/LinkStore";

let _getAppState = () =>{
	return {links: LinkStore.getAll()};
}

export default class Main extends React.Component{

	constructor(props){
		super(props);

		this.state = _getAppState();
		this.onChange = this.onChange.bind(this);
	}

	onChange(){
		console.log("4. in the view");
		this.setState(_getAppState());
	}

	componentDidMount(){
		API.fetchLinks();
		LinkStore.on("change", this.onChange);
	}

	componentWillUnmount(){
		LinkStore.removeListener("change", this.onChange);
	}
	render(){

		let content = this.state.links.map(link => (
			<li key={link._id}>
				<a href={link.url}>{link.title}</a>
			</li>
			));

		return (
			<div>
				<h3>Links</h3>
				<ul>
					{content}
				</ul>
			</div>
			);
	}
}