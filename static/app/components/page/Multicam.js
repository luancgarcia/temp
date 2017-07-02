var React = require("react");
var Reflux = require('reflux');

var Video = require("./Video");
var Video2 = require("./Video2");

var Multicam = React.createClass({

	getInitialState: function() {
		return{
			videos: []
		}
	},

	componentDidMount: function(){

		this.api.getMulticamVideos()
		.then(function(response){

			this.setState({ videos: response.data });

		}.bind(this));

    },

    render: function(){

    	var listVideos = this.state;

    	return(

			<section className="player">
				<div className="container">
					<div className="player_container">

						{/*{listVideos.videos.map(function (video, x) {
		                    return (
		                    	
		                        <div key={x} className="col-6 padding-5 player__video">
									<Video info={video} />
								</div>
								
		                    )
		                })}*/}


                        <div className="col-6 padding-5 player__video">
							<Video info={this.state.videos[0]} />
						</div>

						<div className="col-6 padding-5 player__video">
							<Video2 info={this.state.videos[0]} />
						</div>

					</div>
				</div>
			</section>

		);

	},

});

module.exports = Multicam;