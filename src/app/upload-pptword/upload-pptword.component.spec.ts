import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadPPTWordComponent } from './upload-pptword.component';

describe('UploadPPTWordComponent', () => {
  let component: UploadPPTWordComponent;
  let fixture: ComponentFixture<UploadPPTWordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadPPTWordComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadPPTWordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
