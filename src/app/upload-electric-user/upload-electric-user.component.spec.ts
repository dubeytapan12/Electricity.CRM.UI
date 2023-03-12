import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadElectricUserComponent } from './upload-electric-user.component';

describe('UploadElectricUserComponent', () => {
  let component: UploadElectricUserComponent;
  let fixture: ComponentFixture<UploadElectricUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadElectricUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadElectricUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
