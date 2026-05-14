import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TableSkeletonComponent } from './table-skeleton.component';

describe('TableSkeletonComponent', () => {
  let fixture: ComponentFixture<TableSkeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [TableSkeletonComponent] }).compileComponents();
    fixture = TestBed.createComponent(TableSkeletonComponent);
  });

  it('renders default 6 rows and 5 columns', () => {
    fixture.detectChanges();
    const rows = fixture.nativeElement.querySelectorAll('tbody tr');
    expect(rows.length).toBe(6);
    const firstRowCells = rows[0].querySelectorAll('td');
    expect(firstRowCells.length).toBe(5);
  });

  it('renders header by default', () => {
    fixture.detectChanges();
    const thead = fixture.nativeElement.querySelector('thead');
    expect(thead).not.toBeNull();
  });

  it('hides header when showHeader is false', () => {
    fixture.componentRef.setInput('showHeader', false);
    fixture.detectChanges();
    const thead = fixture.nativeElement.querySelector('thead');
    expect(thead).toBeNull();
  });

  it('respects custom rows and columns count', () => {
    fixture.componentRef.setInput('rows', 3);
    fixture.componentRef.setInput('columns', 2);
    fixture.detectChanges();
    const rows = fixture.nativeElement.querySelectorAll('tbody tr');
    expect(rows.length).toBe(3);
    const firstRowCells = rows[0].querySelectorAll('td');
    expect(firstRowCells.length).toBe(2);
  });

  it('first column cell is wider than subsequent ones', () => {
    fixture.detectChanges();
    const firstRow = fixture.nativeElement.querySelector('tbody tr');
    const cells = firstRow.querySelectorAll('td > div');
    expect((cells[0] as HTMLElement).style.width).toBe('70%');
    expect((cells[1] as HTMLElement).style.width).toBe('50%');
  });
});
