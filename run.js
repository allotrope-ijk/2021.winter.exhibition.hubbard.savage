
// BABYLON library populated through html (studio.js)
// STUDIO library populated through html (studio.js)

async function run() {
    try {
        const canvas = document.getElementById("renderCanvas");
        const engine = new BABYLON.Engine(canvas, true);

        const galleryPath = "resources/copyrighted/20210126.cmbarth/";
        const galleryName = "gallery.glb";
        const rangePos = new BABYLON.Vector2(-3.5, 0);
        const rangeSize = new BABYLON.Vector2(6.0, 7.0);

        const hideLoadingScreen = function() {
            document.getElementById("loadingScreen").style.display = "none";
        }
        const gallery = new STUDIO.Gallery(
            canvas,
            engine,
            rangePos,
            rangeSize,
            galleryPath,
            galleryName,
            hideLoadingScreen);
        
        await gallery.initialize();

        // TODO: enable audio
        // const numTracks = 4;
        // const trackName = "resources/cc1/20210130.cmbarth/quad."
        // const trackExt = ".mp3";
        // const tracks = new Array(numTracks);
        // for (let i = 0; i < numTracks; i++)
        // {
        //     tracks[i] = trackName + i + trackExt;
        // }
        // const quadAudio = new STUDIO.QuadAudio(
        //     tracks,
        //     gallery.scene,
        //     rangePos,
        //     rangeSize);

        engine.runRenderLoop(function () {
            gallery.scene.render();
        });
        window.addEventListener("resize", function () {
            engine.resize();
        });        

    } catch (error) {
        alert(error.stack);
    }
}

run();
