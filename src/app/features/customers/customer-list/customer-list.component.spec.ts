import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { of, throwError } from 'rxjs';
import { CustomerListComponent } from './customer-list.component';
import { ApiService } from '../../../core/services/api.service';
import { NotificationService } from '../../../core/services/notification.service';
import { User } from '../../../core/models/user.model';

describe('CustomerListComponent', () => {
  let fixture: ComponentFixture<CustomerListComponent>;
  let component: CustomerListComponent;
  let api: { getRaw: ReturnType<typeof vi.fn> };
  let notifications: { error: ReturnType<typeof vi.fn> };

  function makeUser(over: Partial<User> = {}): User {
    return {
      id: 'u1',
      email: 'a@b.com',
      firstName: 'A',
      lastName: 'B',
      isActive: true,
      isVerified: true,
      preferredLanguage: 'fr',
      createdAt: '2026-01-01',
      ...over,
    };
  }

  beforeEach(async () => {
    vi.useFakeTimers();
    api = { getRaw: vi.fn().mockReturnValue(of({ data: [], pagination: { total: 0 } })) };
    notifications = { error: vi.fn() };

    await TestBed.configureTestingModule({
      imports: [CustomerListComponent, TranslateModule.forRoot()],
      providers: [
        provideRouter([]),
        { provide: ApiService, useValue: api },
        { provide: NotificationService, useValue: notifications },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CustomerListComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => vi.useRealTimers());

  it('loads users on init and stores totals', () => {
    api.getRaw.mockReturnValue(
      of({ data: [makeUser(), makeUser({ id: 'u2', isActive: false })], pagination: { total: 2 } }),
    );
    fixture.detectChanges();
    expect(component.users().length).toBe(2);
    expect(component.total()).toBe(2);
    expect(component.activeCount()).toBe(1);
    expect(component.inactiveCount()).toBe(1);
    expect(component.verifiedCount()).toBe(2);
  });

  it('handles a bare array response', () => {
    api.getRaw.mockReturnValue(of([makeUser()]));
    fixture.detectChanges();
    expect(component.total()).toBe(1);
  });

  it('reads items fallback when data is missing', () => {
    api.getRaw.mockReturnValue(of({ items: [makeUser()], total: 1 }));
    fixture.detectChanges();
    expect(component.users().length).toBe(1);
  });

  it('shows error toast on load failure', () => {
    api.getRaw.mockReturnValue(throwError(() => new Error('500')));
    fixture.detectChanges();
    expect(notifications.error).toHaveBeenCalled();
    expect(component.loading()).toBe(false);
  });

  it('forwards search and status in params', () => {
    fixture.detectChanges();
    api.getRaw.mockClear();
    component.search = 'foo';
    component.statusFilter.set('active');
    component.loadUsers();
    const params = api.getRaw.mock.calls[0][1] as Record<string, unknown>;
    expect(params).toMatchObject({ search: 'foo', status: 'active' });
  });

  describe('onSearch', () => {
    it('debounces and resets to page 1 before reloading', () => {
      fixture.detectChanges();
      api.getRaw.mockClear();
      component.page.set(3);
      component.onSearch();
      vi.advanceTimersByTime(410);
      expect(component.page()).toBe(1);
      expect(api.getRaw).toHaveBeenCalled();
    });

    it('cancels a pending timer when called twice in a row', () => {
      fixture.detectChanges();
      api.getRaw.mockClear();
      component.onSearch();
      component.onSearch(); // resets timer
      vi.advanceTimersByTime(410);
      expect(api.getRaw).toHaveBeenCalledTimes(1);
    });
  });

  it('onPageChange updates page and reloads', () => {
    fixture.detectChanges();
    api.getRaw.mockClear();
    component.onPageChange(2);
    expect(component.page()).toBe(2);
    expect(api.getRaw).toHaveBeenCalled();
  });

  it('toggleFilter flips the showFilter signal', () => {
    fixture.detectChanges();
    expect(component.showFilter()).toBe(false);
    component.toggleFilter();
    expect(component.showFilter()).toBe(true);
    component.toggleFilter();
    expect(component.showFilter()).toBe(false);
  });

  it('filterByStatus resets page and reloads', () => {
    fixture.detectChanges();
    api.getRaw.mockClear();
    component.page.set(5);
    component.filterByStatus('inactive');
    expect(component.page()).toBe(1);
    expect(component.statusFilter()).toBe('inactive');
    expect(api.getRaw).toHaveBeenCalled();
  });

  it('refresh reloads', () => {
    fixture.detectChanges();
    api.getRaw.mockClear();
    component.refresh();
    expect(api.getRaw).toHaveBeenCalled();
  });

  describe('helpers', () => {
    beforeEach(() => fixture.detectChanges());

    it('getInitials uses first letters of first/last name', () => {
      expect(component.getInitials('Alice', 'Bond')).toBe('AB');
    });

    it('getInitials tolerates empty inputs', () => {
      expect(component.getInitials('', '')).toBe('');
    });

    it('getShortId returns first 8 chars', () => {
      expect(component.getShortId('abcdefghij')).toBe('abcdefgh');
    });

    it('getShortId tolerates empty input', () => {
      expect(component.getShortId('')).toBe('');
    });

    it('getAvatarColor returns a deterministic color', () => {
      const c1 = component.getAvatarColor('Alice');
      const c2 = component.getAvatarColor('Alice');
      expect(c1).toBe(c2);
      expect(c1.startsWith('#')).toBe(true);
    });

    it('formatDate produces a French date string', () => {
      expect(component.formatDate('2026-01-15T00:00:00Z')).toMatch(/2026/);
    });
  });
});
