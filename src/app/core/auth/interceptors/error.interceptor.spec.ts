import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptors, HttpClient } from '@angular/common/http';
import { errorInterceptor } from './error.interceptor';
import { NotificationService } from '../../services/notification.service';

describe('errorInterceptor', () => {
  let httpMock: HttpTestingController;
  let http: HttpClient;
  let notifications: NotificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([errorInterceptor])),
        provideHttpClientTesting(),
      ],
    });

    httpMock = TestBed.inject(HttpTestingController);
    http = TestBed.inject(HttpClient);
    notifications = TestBed.inject(NotificationService);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should show error toast on 403', () => {
    const spy = vi.spyOn(notifications, 'error');

    http.get('/api/test').subscribe({ error: () => {} });

    httpMock.expectOne('/api/test').flush(null, { status: 403, statusText: 'Forbidden' });

    expect(spy).toHaveBeenCalledWith('Access denied');
  });

  it('should show error toast on 500', () => {
    const spy = vi.spyOn(notifications, 'error');

    http.get('/api/test').subscribe({ error: () => {} });

    httpMock
      .expectOne('/api/test')
      .flush(null, { status: 500, statusText: 'Internal Server Error' });

    expect(spy).toHaveBeenCalledWith('Server error. Please try again later.');
  });

  it('should show error toast on 503', () => {
    const spy = vi.spyOn(notifications, 'error');

    http.get('/api/test').subscribe({ error: () => {} });

    httpMock.expectOne('/api/test').flush(null, { status: 503, statusText: 'Service Unavailable' });

    expect(spy).toHaveBeenCalledWith('Service temporarily unavailable');
  });

  it('should not show toast on 404 (not handled)', () => {
    const spy = vi.spyOn(notifications, 'error');

    http.get('/api/test').subscribe({ error: () => {} });

    httpMock.expectOne('/api/test').flush(null, { status: 404, statusText: 'Not Found' });

    expect(spy).not.toHaveBeenCalled();
  });

  it('should still propagate the error to subscriber', () => {
    let errorReceived = false;

    http.get('/api/test').subscribe({
      error: () => {
        errorReceived = true;
      },
    });

    httpMock.expectOne('/api/test').flush(null, { status: 500, statusText: 'Server Error' });

    expect(errorReceived).toBe(true);
  });

  it('should not show toast on successful requests', () => {
    const spy = vi.spyOn(notifications, 'error');

    http.get('/api/test').subscribe();

    httpMock.expectOne('/api/test').flush({ data: 'ok' });

    expect(spy).not.toHaveBeenCalled();
  });
});
