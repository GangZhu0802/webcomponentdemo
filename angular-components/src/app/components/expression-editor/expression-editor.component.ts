import { Component, EventEmitter, Input, OnChanges, OnDestroy, Output, SimpleChanges, ViewChild, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'expression-editor',
  templateUrl: './expression-editor.component.html',
  styleUrls: ['./expression-editor.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class ExpressionEditorComponent implements OnChanges, OnDestroy {
  @Input() invalidfields: string[] = [];
  @Input() haserror: boolean = false;
  @Input() expression: string = '';
  @Output() onBlurHandler = new EventEmitter<any>();

  @ViewChild('editor') templateRef: { nativeElement: HTMLElement; };
  public timeoutId: any;

  ngOnChanges(changes: SimpleChanges): void {
    this.timeoutId = setTimeout(() => {
      this.updateValidStatus();
    }, 0);
  }

  ngOnDestroy(): void {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
  }

  public updateValidStatus() {
    if (this.haserror) {
      let expression = this.expression;
      expression = expression.replace(/</g, '&lt;');
      expression = expression.replace(/>/g, '&gt;');

      this.invalidfields.forEach((field, idx) => {
        const fieldWithQuote = `"${field}"`;
        const newSpan = document.createElement('span');

        newSpan.setAttribute('class', 'text-error');
        newSpan.innerText = fieldWithQuote;
        expression = expression.replaceAll(fieldWithQuote, newSpan.outerHTML);
      });

      this.templateRef.nativeElement.innerHTML = expression;

      const spans = this.templateRef.nativeElement.getElementsByTagName('span');
      Array.from(spans).forEach((item, idx) => {
        item['tabIndex'] = 99 + idx; //if no tabindex, onfocus won't take effect
        item['onfocus'] = this.onSpanFocus;
      });
    } else {
      this.expression = this.expression ? this.expression.replace(/</g, '&lt;') : '';
      this.expression = this.expression.replace(/>/g, '&gt;');
      this.templateRef.nativeElement.innerHTML = this.expression;
    }
  }

  public getText(): string {
    return this.templateRef.nativeElement.innerText;
  }

  public onSpanFocus = (event: Event) => {
    const target: any = event.target;
    if (this.haserror) {
      target['setAttribute']('class', '');
      target['setAttribute']('style', 'outline: none');
    }
  };

  public onBlur() {
    this.onBlurHandler.emit();
  }
}
