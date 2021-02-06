import { Camera, Vector3, Vector2 } from "babylonjs";
import { AdvancedDynamicTexture, Button, StackPanel } from "babylonjs-gui";

export class CameraWalker {
    private _walking: boolean = false;
    private _advancedTexture: AdvancedDynamicTexture;
    private _walkButton: Button;

    get walking(): boolean {
        return this._walking;
    }
    set walking(value: boolean) {
        this._walking = value;
    }

    constructor (private readonly _camera: Camera, private readonly _rangePos: Vector2, private readonly _rangeSize: Vector2, private readonly _speed: number) {
        this._camera.getScene().onBeforeRenderObservable.add(() => { this.updatePosition(); });

        // TODO fix for vr
        this._advancedTexture = AdvancedDynamicTexture.CreateFullscreenUI("camerawalker.ui");
        this._advancedTexture.isForeground = true;
        this._advancedTexture.scale(1.5);

        this._walkButton = Button.CreateSimpleButton("walkButton", "");
        this._walkButton.width = "100px"
        this._walkButton.height = "150px";
        this._walkButton.color = "white";
        this._walkButton.cornerRadius = 10;
        this._walkButton.thickness = 0;
        this._walkButton.background = "white";
        this._walkButton.horizontalAlignment = 2;
        this._walkButton.verticalAlignment = 1;
        this._walkButton.paddingBottomInPixels = 50;
        this._walkButton.onPointerDownObservable.add(() => { this.buttonPressed(); });
        this._walkButton.onPointerUpObservable.add(() => { this.buttonReleased(); });
        this._advancedTexture.addControl(this._walkButton);    
    }

    buttonPressed(): void {
        this._walking = true;
    }

    buttonReleased(): void {
        this._walking = false;
    }

    private updatePosition(): void {
        if (this._walking)
        {
            // const cameraRight = this._camera.getDirection(new Vector3(1, 0, 0));
            // const cameraUp = this._camera.getDirection(new Vector3(0, 1, 0));
            const cameraDirection = this._camera.getDirection(new Vector3(0, 0, 1));

            const newX = this._camera.position.x + this._speed * cameraDirection.x;
            if (newX > this._rangePos.x && newX < this._rangePos.x + this._rangeSize.x) {
                this._camera.position.x = newX;
            }

            const newZ = this._camera.position.z + this._speed * cameraDirection.z;
            if (newZ > this._rangePos.y && newZ < this._rangePos.y + this._rangeSize.y) {
                this._camera.position.z = newZ;
            }
        }
    }
}