import { TestBed } from '@angular/core/testing';

import { HttpAuthInterceptorInterceptor } from './http-auth-interceptor.interceptor';

describe('HttpAuthInterceptorInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      HttpAuthInterceptorInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: HttpAuthInterceptorInterceptor = TestBed.inject(HttpAuthInterceptorInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
