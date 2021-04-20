import React, { useContext } from 'react';
import { buildContext } from "./../../Context/BuildContext";
import cpu from './../../../img/componentImg/cpu.png';
import motherboard from './../../../img/componentImg/motherboard.png';
import ram from './../../../img/componentImg/ram.webp';
import hdd from './../../../img/componentImg/hdd.png';
import gpu from './../../../img/componentImg/gpu.webp';
import casePC from './../../../img/componentImg/case.png';
import power from './../../../img/componentImg/power.webp';
import monitor from './../../../img/componentImg/monitor.jpg'


function ProcessBar() {
    const { contextState } = useContext(buildContext)
    const componentImg = [cpu, motherboard, ram, hdd, gpu, casePC, power, monitor];

    const process = () => {
        let item = []

        for (let i = 0; i < 8; i++) {
            let processStyle = { borderColor: "#ccc" };
            let barStyle = { width: "0" }
            if (i <= contextState.component) {
                processStyle.borderColor = "green";
            }
            item.push(<><img
                src={componentImg[i]}
                style={processStyle}
            /></>)
            if (i < contextState.component) {
                barStyle.width = "100%"
            }
            if (i !== 7) {
                item.push(<><div class="progress">
                    <div
                        class="progress-bar bg-success"
                        role="progressbar"
                        style={barStyle}
                        aria-valuenow="100"
                        aria-valuemin="0"
                        aria-valuemax="100"
                    ></div>
                </div></>)
            }
        }
        return item;
    }
    return (
        <div>
            <div class="progressBar d-flex flex-row justify-content-center mt-3">
                {process()}
            </div>
        </div>
    )
}

export default ProcessBar
