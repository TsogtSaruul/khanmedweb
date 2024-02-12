import React from 'react'
import IMG from '../assets/fun-bg.jpg'


const Breadcrumbs = ({ title }) => {

  return (
		<div className="breadcrumbs overlay" style={{ backgroundImage: `url(${IMG})` }}>
			<div className="container">
				<div className="bread-inner">
					<div className="row">
						<div className="col-12">
							<h2>{title}</h2>
							<ul className="bread-list">
								<li><a href="/">Нүүр&nbsp;хуудас</a></li>
								<li><i className="icofont-simple-right"></i></li>
								<li className="active">{title}</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
  )
}

export default Breadcrumbs