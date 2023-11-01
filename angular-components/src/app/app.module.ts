import { Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {createCustomElement} from '@angular/elements';
import { AppComponent } from './app.component';
import { MyButton } from './components/my-button/my-button.component';
import { ExpressionEditorComponent } from './components/expression-editor/expression-editor.component';

@NgModule({
  declarations: [
    AppComponent,
    MyButton,
    ExpressionEditorComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [],
  entryComponents: [MyButton, ExpressionEditorComponent]
})
export class AppModule {
  constructor(private injector: Injector){}

  ngDoBootstrap(){
    const customMyButton = createCustomElement(MyButton, {injector: this.injector});
    customElements.define('my-button', customMyButton);
    
    const myEditor = createCustomElement(ExpressionEditorComponent, {injector: this.injector});
    customElements.define('my-editor', myEditor);
    // this.myCreateCustomElement(MyButton, 'my-button');
    // this.myCreateCustomElement(ExpressionEditorComponent, 'my-editor');
  }

  myCreateCustomElement(component: new ()=>any, customComponentName: string){
    const customMyButton = createCustomElement(component, {injector: this.injector});
    customElements.define(customComponentName, customMyButton);
  }
}
