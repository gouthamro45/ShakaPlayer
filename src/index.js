//https://github.com/patricktran/shaka-player-ui-controls

import {
  Player as ShakaPlayer,
  ui as ShakaUI,
  polyfill as ShakaPolyfill
} from "shaka-player/dist/shaka-player.ui";
import "shaka-player/dist/controls.css";
import "./styles.css";

import {
  ForwardFiveButton,
  ForwardTenButton,
  ForwardThirtyButton,
  RewindFiveButton,
  RewindTenButton,
  RewindThirtyButton,
  VerticalVolume
} from "shaka-player-ui-controls";

import "shaka-player-ui-controls/dist/main.css";

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const main = async () => {
  //add artificial delay for codesandbox demo ONLY
  await delay(2000);

  //getting reference to video and video container on DOM
  const video = document.getElementById("video");
  const videoContainer = document.getElementById("video-container");

  const manifestUri =
    "https://dash.akamaized.net/dash264/TestCases/1c/qualcomm/2/MultiRate.mpd";

  //initialize shaka player
  ShakaPolyfill.installAll(); //A polyfill provides the functions and features that the developer expects the browser to offer by default.
  const player = new ShakaPlayer(video);
  video.volume = 0.5;

  //register controls
  ShakaUI.Controls.registerElement(
    "vertical_volume",
    new VerticalVolume.Factory()
  );

  //create ui config
  const uiConfig = {
    addSeekBar: true,
    seekBarColors: {
      base: "rgba(255, 255, 255, 0.3)",
      buffered: "rgba(255, 255, 255, 0.54)",
      played: "rgb(2, 255, 255)"
    },
    enableTooltips: true, //shows info about controls when hovers
    addBigPlayButton: true,
    //   'customContextMenu' : true,
    // 'contextMenuElements' : ['statistics'],
    // 'statisticsList' : ['width', 'height', 'playTime', 'bufferingTime'],
    controlPanelElements: [
      "time_and_duration",
      "spacer",
      "rewind_30",
      "rewind_10",
      "rewind_5",
      "play_pause",
      "forward_5",
      "forward_10",
      "forward_30",
      "spacer",
      "vertical_volume",
      "loop", //adds loop button
      "overflow_menu" //options as quality, playback, resolution
      //  "airplay", //adds air play options like using keyboard
      // "fullscreen"
      //  "quality"

      // "volume"
      // "mute"
    ]
  };

  //rewind controls
  ShakaUI.Controls.registerElement("rewind_5", new RewindFiveButton.Factory());
  ShakaUI.Controls.registerElement("rewind_10", new RewindTenButton.Factory());
  ShakaUI.Controls.registerElement(
    "rewind_30",
    new RewindThirtyButton.Factory()
  );

  //fast forward controls
  ShakaUI.Controls.registerElement(
    "forward_5",
    new ForwardFiveButton.Factory()
  );
  ShakaUI.Controls.registerElement(
    "forward_10",
    new ForwardTenButton.Factory()
  );
  ShakaUI.Controls.registerElement(
    "forward_30",
    new ForwardThirtyButton.Factory()
  );

  const ui = new ShakaUI.Overlay(player, videoContainer, video); // To create UI without the DOM-based setup, use the shaka.ui.Overlay constructor.
  ui.configure(uiConfig);

  player
    .load(manifestUri)
    .then(function () {
      // This runs if the asynchronous load is successful.
      console.log("The video has now been loaded!");
    })
    .catch((err) => console.log(err)); // onError is executed if the asynchronous load fails.
};

if (document.readyState !== "loading") {
  console.log("document is already ready, just execute code here");
  main();
} else {
  document.addEventListener("DOMContentLoaded", function () {
    console.log("document was not ready, place code here");
    main();
  });
}
