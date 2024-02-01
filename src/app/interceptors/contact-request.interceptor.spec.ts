import { TestBed } from '@angular/core/testing';

import { ContactRequestInterceptor } from './contact-request.interceptor';

describe('ContactRequestInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      ContactRequestInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: ContactRequestInterceptor = TestBed.inject(ContactRequestInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
