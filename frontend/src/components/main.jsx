import React from "react";

const Home = () => {
  return (
    <>
      <div className="hero border-1 pb-3">
        <div className="card bg-dark text-white border-0 mx-3">
          <img
            className="card-img img-fluid"
            src="./images/thucpham.jpg"
            alt="Card"
            height={300}
          />
          <div className="card-img-overlay d-flex align-items-center">
            <div className="container">
              <h5 className="card-title fs-1 text fw-lighter">Welcom to NgonFresh</h5>
              <p className="card-text fs-5 d-none d-sm-block ">
              Your destination for fresh and high-quality food products. At NgonFresh, we are committed to providing you with the most convenient online shopping experience, 
              offering a wide range of products from fresh fruits and vegetables to prepared foods. Explore now to enjoy fresh flavors every day!
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
