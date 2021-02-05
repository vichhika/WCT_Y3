import React from "react";
import './../../Css/aboutUs.scss'
import mengImg from './../../img/lymeng.jpg'
import leangImg from './../../img/mengleang.jpg'
import bathImg from './../../img/sambath.jpg'
import kaImg from './../../img/Vichhika.jpg'

function AboutUs() {
    return(
        <div className="bannerInfo">
            <h3 className="mt-5">
                <b>
                    About US
                </b>
            </h3>
            <div class="container text-dark">
                <div className="detailInfo">
                    <img src={mengImg} />
                    <h6><b>Lymeng Chhun</b></h6>
                    <h6 className="career">Web Developer</h6>
                    <h6 className="graduated">Faculty of Engineering, Rupp</h6>
                </div>
                <div className="detailInfo">
                    <img src={leangImg} />
                    <h6><b>Mengleang Ngoun</b></h6>
                    <h6 className="career">Web Developer</h6>
                    <h6 className="graduated">Faculty of Engineering, Rupp</h6>
                </div>
                <div className="detailInfo">
                    <img src={bathImg} />
                    <h6><b>Tithsambath Dyly</b></h6>
                    <h6 className="career">Web Developer</h6>
                    <h6 className="graduated">Faculty of Engineering, Rupp</h6>
                </div>
                <div className="detailInfo">
                    <img src={kaImg} />
                    <h6><b>Vichhika Pann</b></h6>
                    <h6 className="career">Web Developer</h6>
                    <h6 className="graduated">Faculty of Engineering, Rupp</h6>
                </div>
            </div>
        </div>
    );
}
export default AboutUs;
