import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExpressionEditorComponent } from './expression-editor.component';

describe('ExpressionValidatorComponent', () => {
    let component: ExpressionEditorComponent;
    let fixture: ComponentFixture<ExpressionEditorComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ExpressionEditorComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ExpressionEditorComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
