import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { finalize } from 'rxjs/operators';
import { ContactMessage } from '../../core/models/content.model';
import { ContentService } from '../../core/services/content.service';
import { NotificationService } from '../../core/services/notification.service';
import { ConfirmModalComponent } from '../../shared/components/confirm-modal/confirm-modal.component';
import { LoadingSpinnerComponent } from '../../shared/components/loading-spinner/loading-spinner.component';
import { StatusBadgeComponent } from '../../shared/components/status-badge/status-badge.component';

type MessagesTab = 'inbox' | 'archived';
type MessageActionKey =
  | `read:${string}`
  | `unread:${string}`
  | `processed:${string}`
  | `unprocessed:${string}`
  | `archive:${string}`
  | `restore:${string}`
  | `delete:${string}`;

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [TranslateModule, LoadingSpinnerComponent, StatusBadgeComponent, ConfirmModalComponent],
  template: `
    <div>
      <!-- Sub tabs -->
      <div class="flex border-b border-border-light mb-6">
        <button
          type="button"
          (click)="switchTab('inbox')"
          class="px-4 py-2 text-sm font-medium border-b-2 transition-colors"
          [class]="
            activeTab() === 'inbox'
              ? 'border-primary text-primary'
              : 'border-transparent text-text-secondary hover:text-text-primary'
          "
        >
          {{ 'MESSAGES.INBOX' | translate }} ({{ inboxMessages().length }})
        </button>
        <button
          type="button"
          (click)="switchTab('archived')"
          class="px-4 py-2 text-sm font-medium border-b-2 transition-colors"
          [class]="
            activeTab() === 'archived'
              ? 'border-primary text-primary'
              : 'border-transparent text-text-secondary hover:text-text-primary'
          "
        >
          {{ 'MESSAGES.ARCHIVED' | translate }} ({{ archivedMessages().length }})
        </button>
      </div>

      @if (loading()) {
        <app-loading-spinner />
      } @else {
        <div class="bg-surface rounded-xl border border-border-light shadow-sm overflow-hidden">
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead>
                <tr class="border-b border-border-light">
                  <th
                    class="px-6 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider"
                  >
                    {{ 'CONTENT.NAME' | translate }}
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider"
                  >
                    {{ 'CONTENT.EMAIL' | translate }}
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider"
                  >
                    {{ 'CONTENT.SUBJECT' | translate }}
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider"
                  >
                    {{ 'CONTENT.DATE' | translate }}
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider"
                  >
                    {{ 'CONTENT.STATUS' | translate }}
                  </th>
                  <th
                    class="px-6 py-3 text-right text-xs font-semibold text-text-secondary uppercase tracking-wider"
                  >
                    {{ 'CONTENT.ACTIONS' | translate }}
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-border-light">
                @for (msg of visibleMessages(); track msg.id) {
                  <tr class="hover:bg-gray-50/50 cursor-pointer" (click)="toggleExpand(msg.id)">
                    <td class="px-6 py-4 text-sm text-text-primary font-medium">
                      {{ msg.name }}
                    </td>
                    <td class="px-6 py-4 text-sm text-text-secondary">{{ msg.email }}</td>
                    <td class="px-6 py-4 text-sm text-text-secondary truncate max-w-[200px]">
                      {{ msg.subject }}
                    </td>
                    <td class="px-6 py-4 text-sm text-text-secondary whitespace-nowrap">
                      {{ formatDate(msg.createdAt) }}
                    </td>
                    <td class="px-6 py-4">
                      <div class="flex items-center gap-1.5">
                        <app-status-badge
                          [status]="msg.isRead ? 'active' : 'pending'"
                          [label]="
                            msg.isRead
                              ? ('CONTENT.READ' | translate)
                              : ('CONTENT.UNREAD' | translate)
                          "
                        />
                        @if (msg.isProcessed) {
                          <app-status-badge
                            status="completed"
                            [label]="'MESSAGES.ARCHIVED' | translate"
                          />
                        }
                      </div>
                    </td>
                    <td class="px-6 py-4 text-right" (click)="$event.stopPropagation()">
                      <div class="flex items-center justify-end gap-1">
                        <!-- MSG-2: processed toggle -->
                        <label
                          class="flex items-center gap-1.5 px-2 py-1 text-xs text-text-secondary cursor-pointer select-none"
                          [title]="'MESSAGES.MARK_PROCESSED' | translate"
                        >
                          <input
                            type="checkbox"
                            class="rounded"
                            [checked]="msg.isProcessed"
                            [disabled]="
                              isBusy('processed:' + msg.id) || isBusy('unprocessed:' + msg.id)
                            "
                            (change)="toggleProcessed(msg)"
                          />
                          @if (
                            isBusy('processed:' + msg.id) || isBusy('unprocessed:' + msg.id)
                          ) {
                            <span
                              class="inline-block w-3 h-3 border-2 border-primary border-t-transparent rounded-full animate-spin"
                            ></span>
                          } @else {
                            <span>{{ 'MESSAGES.PROCESSED' | translate }}</span>
                          }
                        </label>
                        @if (!msg.isRead) {
                          <button
                            type="button"
                            (click)="markRead(msg)"
                            [disabled]="isBusy('read:' + msg.id)"
                            [title]="'MESSAGES.MARK_READ' | translate"
                            [attr.aria-label]="'MESSAGES.MARK_READ' | translate"
                            class="p-2 rounded-lg text-text-secondary hover:text-primary hover:bg-primary-light transition-colors disabled:opacity-50"
                          >
                            @if (isBusy('read:' + msg.id)) {
                              <span
                                class="inline-block w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"
                              ></span>
                            } @else {
                              <svg
                                class="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                  d="M4.5 12.75l6 6 9-13.5"
                                />
                              </svg>
                            }
                          </button>
                        } @else {
                          <button
                            type="button"
                            (click)="markUnread(msg)"
                            [disabled]="isBusy('unread:' + msg.id)"
                            [title]="'MESSAGES.MARK_UNREAD' | translate"
                            [attr.aria-label]="'MESSAGES.MARK_UNREAD' | translate"
                            class="p-2 rounded-lg text-text-secondary hover:text-primary hover:bg-primary-light transition-colors disabled:opacity-50"
                          >
                            @if (isBusy('unread:' + msg.id)) {
                              <span
                                class="inline-block w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"
                              ></span>
                            } @else {
                              <svg
                                class="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                  d="M3 8l9 6 9-6M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                />
                              </svg>
                            }
                          </button>
                        }
                        @if (activeTab() === 'inbox') {
                          <button
                            type="button"
                            (click)="archive(msg)"
                            [disabled]="isBusy('archive:' + msg.id)"
                            [title]="'MESSAGES.ARCHIVE' | translate"
                            [attr.aria-label]="'MESSAGES.ARCHIVE' | translate"
                            class="p-2 rounded-lg text-text-secondary hover:text-primary hover:bg-primary-light transition-colors disabled:opacity-50"
                          >
                            @if (isBusy('archive:' + msg.id)) {
                              <span
                                class="inline-block w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"
                              ></span>
                            } @else {
                              <svg
                                class="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                  d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
                                />
                              </svg>
                            }
                          </button>
                        } @else {
                          <button
                            type="button"
                            (click)="restore(msg)"
                            [disabled]="isBusy('restore:' + msg.id)"
                            [title]="'MESSAGES.RESTORE' | translate"
                            [attr.aria-label]="'MESSAGES.RESTORE' | translate"
                            class="p-2 rounded-lg text-text-secondary hover:text-primary hover:bg-primary-light transition-colors disabled:opacity-50"
                          >
                            @if (isBusy('restore:' + msg.id)) {
                              <span
                                class="inline-block w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"
                              ></span>
                            } @else {
                              <svg
                                class="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                  d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
                                />
                              </svg>
                            }
                          </button>
                        }
                        <button
                          type="button"
                          (click)="confirmDelete(msg)"
                          [disabled]="isBusy('delete:' + msg.id)"
                          [title]="'MESSAGES.DELETE' | translate"
                          [attr.aria-label]="'MESSAGES.DELETE' | translate"
                          class="p-2 rounded-lg text-text-secondary hover:text-error hover:bg-error-light transition-colors disabled:opacity-50"
                        >
                          @if (isBusy('delete:' + msg.id)) {
                            <span
                              class="inline-block w-4 h-4 border-2 border-error border-t-transparent rounded-full animate-spin"
                            ></span>
                          } @else {
                            <svg
                              class="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                              />
                            </svg>
                          }
                        </button>
                      </div>
                    </td>
                  </tr>
                  @if (expandedId() === msg.id) {
                    <tr>
                      <td colspan="6" class="px-6 py-4 bg-gray-50/50">
                        <div class="text-sm text-text-primary whitespace-pre-wrap">
                          {{ msg.message }}
                        </div>
                      </td>
                    </tr>
                  }
                } @empty {
                  <tr>
                    <td colspan="6" class="px-6 py-12 text-center text-text-muted text-sm">
                      {{
                        activeTab() === 'inbox'
                          ? ('MESSAGES.NO_MESSAGES' | translate)
                          : ('MESSAGES.NO_ARCHIVED' | translate)
                      }}
                    </td>
                  </tr>
                }
              </tbody>
            </table>
          </div>
        </div>
      }

      <app-confirm-modal
        [open]="showDeleteModal()"
        [title]="'MESSAGES.DELETE' | translate"
        [message]="'MESSAGES.CONFIRM_DELETE' | translate"
        [confirmLabel]="'MESSAGES.DELETE' | translate"
        [cancelLabel]="'COMMON.CANCEL' | translate"
        variant="danger"
        (confirm)="deleteMessage()"
        (cancel)="showDeleteModal.set(false)"
      />
    </div>
  `,
})
export class MessagesComponent implements OnInit {
  private readonly contentService = inject(ContentService);
  private readonly notifications = inject(NotificationService);
  private readonly translate = inject(TranslateService);

  readonly activeTab = signal<MessagesTab>('inbox');
  readonly all = signal<ContactMessage[]>([]);
  readonly loading = signal<boolean>(false);
  readonly expandedId = signal<string | null>(null);
  readonly showDeleteModal = signal<boolean>(false);
  readonly messageToDelete = signal<ContactMessage | null>(null);
  /** MSG-4: per-action in-flight set, e.g. "read:<id>", "delete:<id>". */
  readonly busy = signal<ReadonlySet<string>>(new Set());

  readonly inboxMessages = computed(() =>
    this.all()
      .filter((m) => !m.isProcessed)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()),
  );

  readonly archivedMessages = computed(() =>
    this.all()
      .filter((m) => m.isProcessed)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()),
  );

  readonly visibleMessages = computed(() =>
    this.activeTab() === 'inbox' ? this.inboxMessages() : this.archivedMessages(),
  );

  ngOnInit(): void {
    this.load();
  }

  switchTab(tab: MessagesTab): void {
    this.activeTab.set(tab);
    this.expandedId.set(null);
  }

  load(): void {
    this.loading.set(true);
    this.contentService.getContactMessages().subscribe({
      next: (messages) => {
        this.all.set(messages);
        this.loading.set(false);
      },
      error: () => {
        this.notifications.error(this.translate.instant('CONTENT.LOAD_MESSAGES_FAILED'));
        this.loading.set(false);
      },
    });
  }

  toggleExpand(messageId: string): void {
    this.expandedId.update((current) => (current === messageId ? null : messageId));
  }

  isBusy(key: string): boolean {
    return this.busy().has(key);
  }

  markRead(msg: ContactMessage): void {
    this.update(msg, { isRead: true }, `read:${msg.id}`);
  }

  markUnread(msg: ContactMessage): void {
    this.update(msg, { isRead: false }, `unread:${msg.id}`);
  }

  toggleProcessed(msg: ContactMessage): void {
    const next = !msg.isProcessed;
    const key: MessageActionKey = next ? `processed:${msg.id}` : `unprocessed:${msg.id}`;
    this.update(msg, { isProcessed: next }, key);
  }

  archive(msg: ContactMessage): void {
    this.update(msg, { isProcessed: true }, `archive:${msg.id}`);
  }

  restore(msg: ContactMessage): void {
    this.update(msg, { isProcessed: false }, `restore:${msg.id}`);
  }

  confirmDelete(msg: ContactMessage): void {
    this.messageToDelete.set(msg);
    this.showDeleteModal.set(true);
  }

  deleteMessage(): void {
    const msg = this.messageToDelete();
    if (!msg) return;
    const key: MessageActionKey = `delete:${msg.id}`;
    this.startBusy(key);
    this.contentService
      .deleteContactMessage(msg.id)
      .pipe(finalize(() => this.endBusy(key)))
      .subscribe({
        next: () => {
          this.notifications.success(this.translate.instant('MESSAGES.DELETED'));
          this.all.update((msgs) => msgs.filter((m) => m.id !== msg.id));
          this.showDeleteModal.set(false);
          this.messageToDelete.set(null);
        },
        error: (err: { error?: { message?: string } }) => {
          this.notifications.error(
            err.error?.message ?? this.translate.instant('MESSAGES.DELETE_FAILED'),
          );
          this.showDeleteModal.set(false);
        },
      });
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  }

  private update(
    msg: ContactMessage,
    patch: { isRead?: boolean; isProcessed?: boolean },
    key: MessageActionKey,
  ): void {
    // MSG-4: optimistic local update so the UI reflects the change immediately.
    const previous = this.all();
    this.all.update((msgs) => msgs.map((m) => (m.id === msg.id ? { ...m, ...patch } : m)));
    this.startBusy(key);

    this.contentService
      .updateContactMessage(msg.id, patch)
      .pipe(finalize(() => this.endBusy(key)))
      .subscribe({
        next: (updated) => {
          this.all.update((msgs) => msgs.map((m) => (m.id === msg.id ? updated : m)));
          this.notifications.success(this.translate.instant('MESSAGES.UPDATED'));
        },
        error: (err: { error?: { message?: string } }) => {
          // Rollback optimistic update.
          this.all.set(previous);
          this.notifications.error(
            err.error?.message ?? this.translate.instant('MESSAGES.UPDATE_FAILED'),
          );
        },
      });
  }

  private startBusy(key: MessageActionKey): void {
    this.busy.update((set) => {
      const next = new Set(set);
      next.add(key);
      return next;
    });
  }

  private endBusy(key: MessageActionKey): void {
    this.busy.update((set) => {
      const next = new Set(set);
      next.delete(key);
      return next;
    });
  }
}
