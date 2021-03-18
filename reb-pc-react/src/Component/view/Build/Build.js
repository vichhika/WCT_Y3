import React from "react";
import './../../../Css/build.scss'
function Build() {
  return (
    <div class="container d-flex justify-content-center text-center">
      <h2 class="card-title">Build Custom PC</h2>
      <p class="card-text mt-3">
        Complete all the step below to successful build your own PC.
      </p>

      <div class="progressBar d-flex flex-row justify-content-center mt-3">
        <img
          src="https://www.freeiconspng.com/thumbs/microprocessor-icon/microprocessor-icon-6.png"
          alt="CPU"
          // style=border-color: "green"
        />

        <div class="progress">
          <div
            class="progress-bar bg-success"
            role="progressbar"
            style={{width: "100%"}}
            aria-valuenow="100"
            aria-valuemin="0"
            aria-valuemax="100"
          ></div>
        </div>

        <img
          src="https://img.icons8.com/carbon-copy/2x/motherboard.png"
          alt="Motherboard"
        />

        <div class="progress">
          <div
            class="progress-bar bg-success"
            role="progressbar"
            style={{width: "50%"}}
            aria-valuenow="50"
            aria-valuemin="0"
            aria-valuemax="100"
          ></div>
        </div>

        <img
          src="https://cdn0.iconfinder.com/data/icons/mobile-phone-componets-1/144/mobile-icon_05-512.png"
          alt="RAM"
        />

        <div class="progress">
          <div
            class="progress-bar bg-success"
            role="progressbar"
            style={{width: "0%"}}
            aria-valuenow="0"
            aria-valuemin="0"
            aria-valuemax="100"
          ></div>
        </div>

        <img
          src="https://findicons.com/files/icons/1580/devine_icons_part_2/512/hdd_2.png"
          alt="Storage"
        />

        <div class="progress">
          <div
            class="progress-bar bg-success"
            role="progressbar"
            style={{width: "0%"}}
            aria-valuenow="0"
            aria-valuemin="0"
            aria-valuemax="100"
          ></div>
        </div>

        <img
          src="https://cdn0.iconfinder.com/data/icons/computer-interface-glyph/128/1-10-512.png"
          alt="VGA"
        />

        <div class="progress">
          <div
            class="progress-bar bg-success"
            role="progressbar"
            style={{width: "0%"}}
            aria-valuenow="0"
            aria-valuemin="0"
            aria-valuemax="100"
          ></div>
        </div>

        <img
          src="https://cdn0.iconfinder.com/data/icons/pc-hardware-2/128/PC_Hardware_Set_Artboard_15-512.png"
          alt="PowerSupply"
        />

        <div class="progress">
          <div
            class="progress-bar bg-success"
            role="progressbar"
            style={{width: "0%"}}
            aria-valuenow="0"
            aria-valuemin="0"
            aria-valuemax="100"
          ></div>
        </div>

        <img
          src="https://static.thenounproject.com/png/1875372-200.png"
          alt="Case"
        />

        <div class="progress">
          <div
            class="progress-bar bg-success"
            role="progressbar"
            style={{width: "0%"}}
            aria-valuenow="0"
            aria-valuemin="0"
            aria-valuemax="100"
          ></div>
        </div>

        <img
          src="https://img.pngio.com/computer-screen-icon-png-239841-free-icons-library-computer-monitor-icon-png-1600_1600.jpg"
          alt="CPU"
        />
      </div>
    </div>
  );
}
export default Build;
