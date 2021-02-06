import { Color4, Engine, FreeCamera, HemisphericLight, ILoadingScreen, PointLight, Scene, SceneLoader, Vector2, Vector3 } from "babylonjs";
import { CameraWalker } from "./cameraWalker";
import "babylonjs-loaders";

class GalleryLoadingScreen implements ILoadingScreen {
    loadingUIBackgroundColor: string = "";
    loadingUIText: string = "";

    constructor(private _onLoaded: Function) {}
    
    displayLoadingUI() {}

    hideLoadingUI() {
        this._onLoaded();
    }
}

export class Gallery {
    private _scene: Scene;
    private _walker: CameraWalker;
    private _camera: FreeCamera;

    constructor(
        private _canvas: HTMLElement,
        private _engine: Engine,
        private _rangePos: Vector2,
        private _rangeSize: Vector2,
        private _galleryPath: string,
        private _galleryName: string,
        private _onLoaded: Function) {

        var loadingScreen = new GalleryLoadingScreen(this._onLoaded);
        this._engine.loadingScreen = loadingScreen;

        this._engine.displayLoadingUI();
        this._scene = new Scene(this._engine);
        this._camera = new FreeCamera("gallery.camera", new Vector3(0, 0, 0), this._scene);

        this._walker = new CameraWalker(this._camera, this._rangePos, this._rangeSize, 0.05);

        this._camera.setTarget(new Vector3(0, 0, 1));
        this._camera.attachControl(this._canvas, true);
        this._camera.fov = 1.1;
        const light = new HemisphericLight("gallery.light", new Vector3(0, 0, 0), this._scene);
        light.intensity = 1.9;

        this._scene.clearColor = new Color4(0, 0, 0, 1);
    }

    async initialize() {
        console.log(this._galleryPath);
        console.log(this._galleryName);
        return SceneLoader.ImportMeshAsync(null, this._galleryPath, this._galleryName, this._scene).then((newMeshes) => {
            this._engine.hideLoadingUI();
        });
    }

    get scene(): Scene {
        return this._scene;
    }
}