import React from 'react';


const trashCanStyle = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
}


const UserBuild = () => {
    return (

        <div className="container">
            <h3 style={{borderLeft: '3px solid', paddingLeft: '20px'}}>
              Your Build
            </h3>

            <br/>

            <div className="card" style={{marginLeft: '30px'}}>
              <div className="card-body d-flex flex-row">
                <img src="https://www.chantracomputer.com/DESKTOP%20SYSTEM/CASE/AEROCOOL/TOR-PRO-RGB.gif" width="6%" height="auto"/>
                <div className="container d-flex justify-content-between">
                    <div>
                      <h4><b>Bitcoin Mining Pc</b></h4>
                      <h6 className="mb-1">Price : <span class="text-danger"> $1200</span></h6>
                      <h6 className="mb-1">Owned By:<span> Tithsambath Dyly</span></h6>
                    </div>
                    <div style={trashCanStyle}>
                      <button className="btn btn-light btn-sm"><i className="fad fa-trash text-danger"></i></button>
                    </div>
                </div>
              </div>
            </div>
            <br/>

        </div>

    );
}

export default UserBuild;