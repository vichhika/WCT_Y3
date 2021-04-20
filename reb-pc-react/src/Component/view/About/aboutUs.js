import React from "react";
import '../../../Css/aboutUs.scss'
import mengImg from '../../../img/lymeng.jpg'
import leangImg from '../../../img/mengleang.jpg'
import bathImg from '../../../img/sambath.jpg'
import kaImg from '../../../img/Vichhika.jpg'

function AboutUs() {
    return(
        <div class="bannerInfo">
            <h3 class="mt-5">
                <b>
                    About US
                </b>
            </h3>
            <div class="container row text-dark">
                <div class="col detailInfo">
                    <img src={bathImg} />
                    <h6><b>Tithsambath Dyly</b></h6>
                    <h6 class="career">Web Developer</h6>
                    <h6 class="graduated">Faculty of Engineering, Rupp</h6>
                </div>
                <div class="col detailInfo">
                    <img src={leangImg} />
                    <h6><b>Mengleang Ngoun</b></h6>
                    <h6 class="career">Web Developer</h6>
                    <h6 class="graduated">Faculty of Engineering, Rupp</h6>
                </div>
                <div class="col detailInfo">
                    <img src={mengImg} />
                    <h6><b>Lymeng Chhun</b></h6>
                    <h6 class="career">Web Developer</h6>
                    <h6 class="graduated">Faculty of Engineering, Rupp</h6>
                </div>
                <div class="col detailInfo">
                    <img src={kaImg}/>
                    <h6><b>Vichhika Pann</b></h6>
                    <h6 class="career">Web Developer</h6>
                    <h6 class="graduated">Faculty of Engineering, Rupp</h6>
                </div>
            </div>
        </div>
    );
}
export default AboutUs;
