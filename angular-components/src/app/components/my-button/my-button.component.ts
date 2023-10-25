import { Component, Input } from "@angular/core";

@Component({
    selector: 'my-button',
    templateUrl: './my-button.component.html',
    styleUrls: ['./my-button.component.less']
})
export class MyButton{
    @Input() color:string = '';
}