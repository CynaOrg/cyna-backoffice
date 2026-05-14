import { ComponentRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { PaginationComponent } from './pagination.component';

describe('PaginationComponent', () => {
  let fixture: ComponentFixture<PaginationComponent>;
  let component: PaginationComponent;
  let ref: ComponentRef<PaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginationComponent, TranslateModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(PaginationComponent);
    component = fixture.componentInstance;
    ref = fixture.componentRef;
    ref.setInput('currentPage', 1);
    ref.setInput('total', 0);
    ref.setInput('limit', 20);
  });

  describe('totalPages', () => {
    it('returns 0 when total is 0', () => {
      ref.setInput('total', 0);
      expect(component.totalPages()).toBe(0);
    });

    it('rounds up partial pages', () => {
      ref.setInput('total', 25);
      expect(component.totalPages()).toBe(2);
    });
  });

  describe('startItem/endItem', () => {
    it('computes the right window on page 1', () => {
      ref.setInput('total', 50);
      ref.setInput('currentPage', 1);
      expect(component.startItem()).toBe(1);
      expect(component.endItem()).toBe(20);
    });

    it('clamps endItem to total on the last page', () => {
      ref.setInput('total', 25);
      ref.setInput('currentPage', 2);
      expect(component.startItem()).toBe(21);
      expect(component.endItem()).toBe(25);
    });
  });

  describe('pages()', () => {
    it('lists all pages when total <= 7', () => {
      ref.setInput('total', 100);
      ref.setInput('limit', 20); // 5 pages
      expect(component.pages()).toEqual([1, 2, 3, 4, 5]);
    });

    it('inserts ellipsis on the left when current is near the end', () => {
      ref.setInput('total', 200);
      ref.setInput('limit', 20); // 10 pages
      ref.setInput('currentPage', 9);
      expect(component.pages()).toEqual([1, -1, 8, 9, 10]);
    });

    it('inserts ellipsis on the right when current is near the start', () => {
      ref.setInput('total', 200);
      ref.setInput('limit', 20);
      ref.setInput('currentPage', 2);
      expect(component.pages()).toEqual([1, 2, 3, -1, 10]);
    });

    it('inserts both ellipses when current is in the middle', () => {
      ref.setInput('total', 200);
      ref.setInput('limit', 20);
      ref.setInput('currentPage', 5);
      expect(component.pages()).toEqual([1, -1, 4, 5, 6, -1, 10]);
    });
  });

  describe('goTo()', () => {
    it('emits pageChange for in-range pages', () => {
      ref.setInput('total', 100);
      const spy = vi.fn();
      component.pageChange.subscribe(spy);
      component.goTo(3);
      expect(spy).toHaveBeenCalledWith(3);
    });

    it('ignores pages below 1', () => {
      ref.setInput('total', 100);
      const spy = vi.fn();
      component.pageChange.subscribe(spy);
      component.goTo(0);
      expect(spy).not.toHaveBeenCalled();
    });

    it('ignores pages beyond totalPages', () => {
      ref.setInput('total', 40);
      ref.setInput('limit', 20); // 2 pages
      const spy = vi.fn();
      component.pageChange.subscribe(spy);
      component.goTo(3);
      expect(spy).not.toHaveBeenCalled();
    });
  });

  describe('template', () => {
    it('renders nothing when there is only one page', () => {
      ref.setInput('total', 10);
      fixture.detectChanges();
      expect(fixture.nativeElement.querySelector('button')).toBeNull();
    });

    it('renders pagination controls when totalPages > 1', () => {
      ref.setInput('total', 100);
      fixture.detectChanges();
      expect(fixture.nativeElement.querySelectorAll('button').length).toBeGreaterThan(0);
    });
  });
});
