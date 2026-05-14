import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { of, throwError } from 'rxjs';
import { SubscriptionListComponent } from './subscription-list.component';
import { ApiService } from '../../../core/services/api.service';
import { AdminAuthService } from '../../../core/auth/services/admin-auth.service';
import { NotificationService } from '../../../core/services/notification.service';
import { Subscription } from '../../../core/models/subscription.model';

describe('SubscriptionListComponent', () => {
  let fixture: ComponentFixture<SubscriptionListComponent>;
  let component: SubscriptionListComponent;
  let api: { getList: ReturnType<typeof vi.fn>; patch: ReturnType<typeof vi.fn> };
  let notifications: {
    success: ReturnType<typeof vi.fn>;
    error: ReturnType<typeof vi.fn>;
  };

  function makeSub(over: Partial<Subscription> = {}): Subscription {
    return {
      id: 's1',
      userId: 'u1',
      productId: 'p1',
      status: 'active',
      billingPeriod: 'MONTHLY',
      price: 10,
      currency: 'EUR',
      stripeSubscriptionId: 'sub_1',
      stripeCustomerId: 'cus_1',
      currentPeriodStart: '2026-01-01',
      currentPeriodEnd: '2026-02-01',
      cancelAtPeriodEnd: false,
      createdAt: '2026-01-01',
      updatedAt: '2026-01-01',
      ...over,
    };
  }

  beforeEach(async () => {
    api = { getList: vi.fn().mockReturnValue(of([])), patch: vi.fn() };
    notifications = { success: vi.fn(), error: vi.fn() };
    await TestBed.configureTestingModule({
      imports: [SubscriptionListComponent, TranslateModule.forRoot()],
      providers: [
        { provide: ApiService, useValue: api },
        { provide: NotificationService, useValue: notifications },
        { provide: AdminAuthService, useValue: { isSuperAdmin: () => true } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SubscriptionListComponent);
    component = fixture.componentInstance;
  });

  it('loads subscriptions on init', () => {
    api.getList.mockReturnValue(of([makeSub()]));
    fixture.detectChanges();
    expect(component.subscriptions().length).toBe(1);
    expect(component.loading()).toBe(false);
  });

  it('treats nullish payload as empty list', () => {
    api.getList.mockReturnValue(of(null));
    fixture.detectChanges();
    expect(component.subscriptions()).toEqual([]);
  });

  it('shows error toast on load failure', () => {
    api.getList.mockReturnValue(throwError(() => new Error('500')));
    fixture.detectChanges();
    expect(notifications.error).toHaveBeenCalled();
    expect(component.loading()).toBe(false);
  });

  it('forwards status filter param', () => {
    fixture.detectChanges();
    api.getList.mockClear();
    component.statusFilter = 'active';
    component.loadSubscriptions();
    expect(api.getList).toHaveBeenLastCalledWith('admin/payments/subscriptions', {
      status: 'active',
    });
  });

  describe('confirmAction + modal labels', () => {
    beforeEach(() => fixture.detectChanges());

    it('opens the modal and stores the subscription', () => {
      const sub = makeSub();
      component.confirmAction(sub, 'cancel');
      expect(component.showModal()).toBe(true);
      expect(component.selectedSub()).toEqual(sub);
      expect(component.modalAction()).toBe('cancel');
    });

    it('modalVariant is danger for cancel, primary otherwise', () => {
      component.modalAction.set('cancel');
      expect(component.modalVariant()).toBe('danger');
      component.modalAction.set('reactivate');
      expect(component.modalVariant()).toBe('primary');
    });

    it.each([
      ['cancel' as const, 'CANCEL'],
      ['reactivate' as const, 'REACTIVATE'],
      ['cancel_at_end' as const, 'CANCEL_AT_END'],
      ['resume_period' as const, 'RESUME_PERIOD'],
    ])('modalTitle for %s uses the right i18n key', (action, key) => {
      component.modalAction.set(action);
      expect(component.modalTitle()).toBe(`SUBSCRIPTIONS.${key}_TITLE`);
      expect(component.modalMessage()).toBe(`SUBSCRIPTIONS.${key}_CONFIRM`);
      expect(component.modalConfirmLabel()).toBe(`SUBSCRIPTIONS.${key}_BTN`);
    });
  });

  describe('executeAction', () => {
    beforeEach(() => fixture.detectChanges());

    it('no-ops when no sub is selected', () => {
      component.selectedSub.set(null);
      component.executeAction();
      expect(api.patch).not.toHaveBeenCalled();
    });

    it('uses /terms endpoint with cancelAtPeriodEnd=true for cancel_at_end', () => {
      api.patch.mockReturnValue(of(makeSub()));
      component.selectedSub.set(makeSub());
      component.modalAction.set('cancel_at_end');
      component.executeAction();
      expect(api.patch).toHaveBeenCalledWith('admin/payments/subscriptions/s1/terms', {
        cancelAtPeriodEnd: true,
      });
      expect(component.showModal()).toBe(false);
      expect(notifications.success).toHaveBeenCalled();
    });

    it('uses /terms endpoint with cancelAtPeriodEnd=false for resume_period', () => {
      api.patch.mockReturnValue(of(makeSub()));
      component.selectedSub.set(makeSub());
      component.modalAction.set('resume_period');
      component.executeAction();
      expect(api.patch).toHaveBeenCalledWith('admin/payments/subscriptions/s1/terms', {
        cancelAtPeriodEnd: false,
      });
    });

    it('shows error toast when /terms patch fails', () => {
      api.patch.mockReturnValue(throwError(() => new Error('500')));
      component.selectedSub.set(makeSub());
      component.modalAction.set('cancel_at_end');
      component.executeAction();
      expect(notifications.error).toHaveBeenCalled();
      expect(component.showModal()).toBe(false);
    });

    it('uses /status endpoint for cancel and shows cancelled success', () => {
      api.patch.mockReturnValue(of(makeSub()));
      component.selectedSub.set(makeSub());
      component.modalAction.set('cancel');
      component.executeAction();
      expect(api.patch).toHaveBeenCalledWith('admin/payments/subscriptions/s1/status', {
        action: 'cancel',
      });
      expect(notifications.success).toHaveBeenCalledWith('SUBSCRIPTIONS.CANCELLED_SUCCESS');
    });

    it('uses /status endpoint for reactivate', () => {
      api.patch.mockReturnValue(of(makeSub()));
      component.selectedSub.set(makeSub());
      component.modalAction.set('reactivate');
      component.executeAction();
      expect(notifications.success).toHaveBeenCalledWith('SUBSCRIPTIONS.REACTIVATED_SUCCESS');
    });

    it('shows error toast when /status patch fails', () => {
      api.patch.mockReturnValue(throwError(() => new Error('500')));
      component.selectedSub.set(makeSub());
      component.modalAction.set('cancel');
      component.executeAction();
      expect(notifications.error).toHaveBeenCalled();
    });
  });

  describe('helpers', () => {
    beforeEach(() => fixture.detectChanges());

    it('formatCurrency renders EUR', () => {
      expect(component.formatCurrency(20)).toContain('€');
    });

    it('customerLabel prefers customerEmail', () => {
      expect(component.customerLabel(makeSub({ customerEmail: 'x@y.com' }))).toBe('x@y.com');
    });

    it('customerLabel falls back to truncated userId', () => {
      expect(component.customerLabel(makeSub({ userId: '12345678abcd' }))).toBe('12345678');
    });

    it('customerLabel returns empty string when no identifiers', () => {
      expect(component.customerLabel(makeSub({ userId: '' }))).toBe('');
    });

    it('formatDate returns N/A for empty strings', () => {
      expect(component.formatDate('')).toBe('N/A');
    });

    it('formatDate produces a French date string', () => {
      expect(component.formatDate('2026-01-15')).toMatch(/2026/);
    });
  });
});
