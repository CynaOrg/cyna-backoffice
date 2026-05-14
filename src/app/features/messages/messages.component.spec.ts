import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { of, throwError } from 'rxjs';
import { MessagesComponent } from './messages.component';
import { ContentService } from '../../core/services/content.service';
import { NotificationService } from '../../core/services/notification.service';
import { ContactMessage } from '../../core/models/content.model';

describe('MessagesComponent', () => {
  let fixture: ComponentFixture<MessagesComponent>;
  let component: MessagesComponent;
  let content: {
    getContactMessages: ReturnType<typeof vi.fn>;
    updateContactMessage: ReturnType<typeof vi.fn>;
    deleteContactMessage: ReturnType<typeof vi.fn>;
  };
  let notifications: {
    success: ReturnType<typeof vi.fn>;
    error: ReturnType<typeof vi.fn>;
  };

  function makeMessage(over: Partial<ContactMessage> = {}): ContactMessage {
    return {
      id: 'm1',
      name: 'Alice',
      email: 'alice@example.com',
      subject: 'Hello',
      message: 'A message body',
      isRead: false,
      isProcessed: false,
      createdAt: '2026-05-01T00:00:00Z',
      updatedAt: '2026-05-01T00:00:00Z',
      ...over,
    };
  }

  beforeEach(async () => {
    content = {
      getContactMessages: vi.fn().mockReturnValue(of([])),
      updateContactMessage: vi.fn().mockReturnValue(of(makeMessage())),
      deleteContactMessage: vi.fn().mockReturnValue(of(void 0)),
    };
    notifications = { success: vi.fn(), error: vi.fn() };

    await TestBed.configureTestingModule({
      imports: [MessagesComponent, TranslateModule.forRoot()],
      providers: [
        { provide: ContentService, useValue: content },
        { provide: NotificationService, useValue: notifications },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MessagesComponent);
    component = fixture.componentInstance;
  });

  describe('load', () => {
    it('loads messages on init and stores them', () => {
      const messages = [makeMessage(), makeMessage({ id: 'm2', isProcessed: true })];
      content.getContactMessages.mockReturnValue(of(messages));
      fixture.detectChanges();
      expect(component.all().length).toBe(2);
      expect(component.loading()).toBe(false);
    });

    it('shows an error toast on failure', () => {
      content.getContactMessages.mockReturnValue(throwError(() => new Error('500')));
      fixture.detectChanges();
      expect(notifications.error).toHaveBeenCalled();
      expect(component.loading()).toBe(false);
    });
  });

  describe('computed signals', () => {
    beforeEach(() => {
      content.getContactMessages.mockReturnValue(
        of([
          makeMessage({ id: 'a', isProcessed: false, createdAt: '2026-05-01' }),
          makeMessage({ id: 'b', isProcessed: true, createdAt: '2026-05-02' }),
          makeMessage({ id: 'c', isProcessed: false, createdAt: '2026-05-03' }),
        ]),
      );
      fixture.detectChanges();
    });

    it('splits inbox and archived messages', () => {
      expect(component.inboxMessages().length).toBe(2);
      expect(component.archivedMessages().length).toBe(1);
    });

    it('returns inbox by default in visibleMessages', () => {
      expect(component.visibleMessages().length).toBe(2);
    });

    it('switches to archived view', () => {
      component.switchTab('archived');
      expect(component.activeTab()).toBe('archived');
      expect(component.visibleMessages().length).toBe(1);
      expect(component.expandedId()).toBeNull();
    });
  });

  describe('toggleExpand', () => {
    beforeEach(() => fixture.detectChanges());

    it('expands a message id', () => {
      component.toggleExpand('m1');
      expect(component.expandedId()).toBe('m1');
    });

    it('collapses when toggled twice', () => {
      component.toggleExpand('m1');
      component.toggleExpand('m1');
      expect(component.expandedId()).toBeNull();
    });
  });

  describe('isBusy', () => {
    beforeEach(() => fixture.detectChanges());

    it('returns false when no operations are in flight', () => {
      expect(component.isBusy('read:m1')).toBe(false);
    });
  });

  describe('update flows', () => {
    const msg = makeMessage();

    beforeEach(() => {
      content.getContactMessages.mockReturnValue(of([msg]));
      fixture.detectChanges();
    });

    it('markRead patches message and replaces it in the list', () => {
      const updated = { ...msg, isRead: true };
      content.updateContactMessage.mockReturnValue(of(updated));
      component.markRead(msg);
      expect(content.updateContactMessage).toHaveBeenCalledWith('m1', { isRead: true });
      expect(notifications.success).toHaveBeenCalled();
      expect(component.all()[0].isRead).toBe(true);
    });

    it('markUnread sends isRead:false', () => {
      content.updateContactMessage.mockReturnValue(of(msg));
      component.markUnread(msg);
      expect(content.updateContactMessage).toHaveBeenCalledWith('m1', { isRead: false });
    });

    it('toggleProcessed flips the flag', () => {
      content.updateContactMessage.mockReturnValue(of(msg));
      component.toggleProcessed(msg);
      expect(content.updateContactMessage).toHaveBeenCalledWith('m1', { isProcessed: true });
    });

    it('archive sends isProcessed:true', () => {
      content.updateContactMessage.mockReturnValue(of(msg));
      component.archive(msg);
      expect(content.updateContactMessage).toHaveBeenCalledWith('m1', { isProcessed: true });
    });

    it('restore sends isProcessed:false', () => {
      content.updateContactMessage.mockReturnValue(of(msg));
      component.restore(msg);
      expect(content.updateContactMessage).toHaveBeenCalledWith('m1', { isProcessed: false });
    });

    it('rolls back optimistic update on error', () => {
      content.updateContactMessage.mockReturnValue(throwError(() => ({ error: {} })));
      component.markRead(msg);
      expect(component.all()[0].isRead).toBe(false);
      expect(notifications.error).toHaveBeenCalled();
    });

    it('uses server-provided error message when available', () => {
      content.updateContactMessage.mockReturnValue(
        throwError(() => ({ error: { message: 'boom' } })),
      );
      component.markRead(msg);
      expect(notifications.error).toHaveBeenCalledWith('boom');
    });
  });

  describe('delete', () => {
    const msg = makeMessage();

    beforeEach(() => {
      content.getContactMessages.mockReturnValue(of([msg]));
      fixture.detectChanges();
    });

    it('confirmDelete opens the modal with the target message', () => {
      component.confirmDelete(msg);
      expect(component.messageToDelete()).toBe(msg);
      expect(component.showDeleteModal()).toBe(true);
    });

    it('deleteMessage is a no-op when no target is set', () => {
      component.deleteMessage();
      expect(content.deleteContactMessage).not.toHaveBeenCalled();
    });

    it('deletes the message and removes it from the list', () => {
      content.deleteContactMessage.mockReturnValue(of(void 0));
      component.confirmDelete(msg);
      component.deleteMessage();
      expect(component.all()).toEqual([]);
      expect(notifications.success).toHaveBeenCalled();
      expect(component.showDeleteModal()).toBe(false);
    });

    it('shows error toast and closes modal on failure', () => {
      content.deleteContactMessage.mockReturnValue(throwError(() => ({ error: {} })));
      component.confirmDelete(msg);
      component.deleteMessage();
      expect(notifications.error).toHaveBeenCalled();
      expect(component.showDeleteModal()).toBe(false);
    });

    it('uses server message when delete fails', () => {
      content.deleteContactMessage.mockReturnValue(
        throwError(() => ({ error: { message: 'nope' } })),
      );
      component.confirmDelete(msg);
      component.deleteMessage();
      expect(notifications.error).toHaveBeenCalledWith('nope');
    });
  });

  describe('formatDate', () => {
    beforeEach(() => fixture.detectChanges());
    it('returns a French formatted date', () => {
      expect(component.formatDate('2026-01-15T00:00:00Z')).toMatch(/2026/);
    });
  });
});
