import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NovaTransacaoComponent } from './nova-transacao.component';

describe('NovaTransacaoComponent', () => {
  let component: NovaTransacaoComponent;
  let fixture: ComponentFixture<NovaTransacaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NovaTransacaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NovaTransacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
