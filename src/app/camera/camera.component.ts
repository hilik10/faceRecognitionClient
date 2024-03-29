import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Subject, Observable } from 'rxjs';

import {WebcamImage, WebcamInitError, WebcamUtil} from 'ngx-webcam';
import { MyServiceService } from '../my-service.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.scss']
})
export class CameraComponent implements OnInit {

  // @Output()
  public pictureTaken = new EventEmitter<WebcamImage>();
  public showWebcam = true;
  public allowCameraSwitch = true;
  public multipleWebcamsAvailable = false;
  public deviceId: string;
  public videoOptions: MediaTrackConstraints = {
  
  };
  public errors: WebcamInitError[] = [];
  private trigger: Subject<void> = new Subject<void>();
  private nextWebcam: Subject<boolean|string> = new Subject<boolean|string>();
  constructor(private service:MyServiceService,private router: Router){}

  public ngOnInit(): void {
  WebcamUtil.getAvailableVideoInputs()
  .then((mediaDevices: MediaDeviceInfo[]) => {
  this.multipleWebcamsAvailable = mediaDevices && mediaDevices.length > 1;
  });
  }
  public triggerSnapshot(): void {
  this.trigger.next();
  }
  public toggleWebcam(): void {
  this.showWebcam = !this.showWebcam;
  }
  public handleInitError(error: WebcamInitError): void {
  this.errors.push(error);
  }
  public showNextWebcam(directionOrDeviceId: boolean|string): void {
  
  this.nextWebcam.next(directionOrDeviceId);
  }
  public handleImage(webcamImage: WebcamImage): void {
  console.info('received webcam image', webcamImage);
  this.service.faceRecognition<any>(webcamImage).subscribe(result=>{
    console.log(result);
    this.service.result=result
    this.service.img=webcamImage.imageAsDataUrl
    this.router.navigate(['/result']);

    
  })
  this.pictureTaken.emit(webcamImage);
  }
  public cameraWasSwitched(deviceId: string): void {
  console.log('active device: ' + deviceId);
  this.deviceId = deviceId;
  }
  public get triggerObservable(): Observable<void> {
  return this.trigger.asObservable();
  }
  public get nextWebcamObservable(): Observable<boolean|string> {
  return this.nextWebcam.asObservable();
  }

}
