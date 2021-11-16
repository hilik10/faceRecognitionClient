import { Component, OnInit } from '@angular/core';
import { MyServiceService } from '../my-service.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {
result=''
img=''
  constructor(private service:MyServiceService) { }

  ngOnInit(): void {
    this.result=this.service.result
    this.img=this.service.img
  }

}
