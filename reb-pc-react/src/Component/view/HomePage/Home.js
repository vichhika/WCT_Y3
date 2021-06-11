import React from "react";
import '../../../Css/Home-panel/home-panel.css'
import TransparentLayer from './../Transparent-Layer/transparent-layer.js'
import AboutUs from './../About/aboutUs.js';
import background from '../../../img/3873446.jpg'


function Home() {
    document.body.style.backgroundImage = 'url("https://www.turn-on.de/media/cache/article_images/media/cms/2019/09/intel-amd-motherboard-mainboard-prozessor-chip.jpg?763189")';
    return (
        <div>
            <TransparentLayer/>
            <div className="d-flex justify-content-between align-items-center m-0 py-5 px-5"
                 style={{height: "100vh", backgroundColor: "#eef9fb", fontFamily: "Noto Sans JP, sans-seri"}}>
                <div className="mb-5">
                    <h1>Every shop can join our website</h1>
                    <h3>Reab PC is not only a platform for costumer</h3>
                    <h3>Shop owner can share your PC component on Reab PC </h3>
                    <a href="http://shop.reabpc.digital/" target="_blank" type="button"
                       className="btn btn-sm my-2 mr-3 px-4 py-2 text-light"
                       style={{borderRadius: '25px', backgroundColor: '#0088A9'}}>
                        Click here to join
                    </a>
                </div>
                <img className="my-5 " src={background} style={{
                    width: "50vh",
                    height: "50vh"
                }}/>
            </div>
            <AboutUs/>
        </div>
    );

}

export default Home;