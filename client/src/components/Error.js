import React from 'react'


const Error = () => {
    return (
		<section className="error-page section">
			<div className="container">
				<div className="row">
					<div className="col-lg-6 offset-lg-3 col-12">
						<div className="error-inner">
							<h1>404<span> Уучлаарай! Хуудас олдсонгүй.</span></h1>
							<p>Хэрвээ таны үзэхийг хүссэн хуудас олдохгүй байвал та интернет холболтоо шалгаж үзнэ үү.</p>
							<form className="search-form">
								<input placeholder="Search from Here" type="text" />
								<button className="btn" type="submit"><i className="fa fa-search"></i></button>
							</form>
						</div>
					</div>
				</div>
			</div>
		</section>	
    )
}

export default Error