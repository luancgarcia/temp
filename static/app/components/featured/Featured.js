import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
import Router from '../../Router.js';
import Slider from 'react-slick';

import StoreHome from '../../stores/StoreHome';


class Featured extends Component {

	constructor(props) {
		super(props);


		this.state = {
			configSlideShow : {
				dots: true,
				infinite: true,
				speed: 500,
				slidesToShow: 1,
				slidesToScroll: 1,
				accessibility: false,
				arrows: true,
				draggable: false
			}
		}
	}

	render() {
		let slideshow = this.props.featured;
		let urlSlide;
		let settings = this.state.configSlideShow;

		if(slideshow.length <= 1) {
			settings = {
				dots: false,
				arrows: false,
				infinite: false,
				speed: 500,
				slidesToShow: 1,
				slidesToScroll: 1,
				accessibility: false,
			}
		}

		return slideshow.length >= 1 ? (

			<section className="slideShow">
				<Slider {...settings}>
					{
						slideshow.map(function (slide, index) {

							if(slide.kind == "program") {
								urlSlide = url + "programas/" + slide.object_id
							}
							else{
								urlSlide = url + "video/" + slide.object_id
							}

							return (
								<div key={index}>
									<Link to={urlSlide}>
										<div className="containerBlock">
											<img src={slide.image} alt={slide.title} />
											<div className="details">
												<div className="container">
													<div className={`insideBlock l-${slide.position}`}>
														<div className="title">{slide.title}</div>
														<div className="description">{slide.description}</div>
													</div>
												</div>
											</div>
										</div>
									</Link>
								</div>
							)
						})
					}
				</Slider>
			</section>
		) : null
	}
}

export default Featured;
