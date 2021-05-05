import React from "react";
import '../../../Css/Home-panel/home-panel.css'
import TransparentLayer from './../Transparent-Layer/transparent-layer.js'
import AboutUs from './../About/aboutUs.js';


function Home(){
    document.body.style.backgroundImage = 'url("https://www.turn-on.de/media/cache/article_images/media/cms/2019/09/intel-amd-motherboard-mainboard-prozessor-chip.jpg?763189")';
    return (
        <div>
            <TransparentLayer/>
            <AboutUs/>
        </div>
    );

}

export default Home;