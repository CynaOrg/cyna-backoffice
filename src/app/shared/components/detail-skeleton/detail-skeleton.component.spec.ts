import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetailSkeletonComponent } from './detail-skeleton.component';

describe('DetailSkeletonComponent', () => {
  let fixture: ComponentFixture<DetailSkeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailSkeletonComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(DetailSkeletonComponent);
  });

  it('renders default cards count (2)', () => {
    fixture.detectChanges();
    const cards = fixture.nativeElement.querySelectorAll('.rounded-xl.border');
    expect(cards.length).toBe(2);
  });

  it('renders specified number of cards', () => {
    fixture.componentRef.setInput('cards', 4);
    fixture.detectChanges();
    const cards = fixture.nativeElement.querySelectorAll('.rounded-xl.border');
    expect(cards.length).toBe(4);
  });

  it('hides cover when showCover is false', () => {
    fixture.componentRef.setInput('showCover', false);
    fixture.detectChanges();
    const hero = fixture.nativeElement.querySelector('.h-40');
    expect(hero).toBeNull();
  });

  it('shows cover when showCover is true', () => {
    fixture.componentRef.setInput('showCover', true);
    fixture.detectChanges();
    const hero = fixture.nativeElement.querySelector('.h-40');
    expect(hero).not.toBeNull();
  });

  it('uses 2 columns layout by default', () => {
    fixture.detectChanges();
    const grid = fixture.nativeElement.querySelector('.grid');
    expect(grid.className).toContain('lg:grid-cols-2');
  });

  it('uses 1 column layout when columns=1', () => {
    fixture.componentRef.setInput('columns', 1);
    fixture.detectChanges();
    const grid = fixture.nativeElement.querySelector('.grid');
    expect(grid.className).toContain('grid-cols-1');
  });
});
