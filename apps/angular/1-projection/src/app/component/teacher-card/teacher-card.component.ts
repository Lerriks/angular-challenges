import { Component, inject, OnInit } from '@angular/core';
import {
  FakeHttpService,
  randTeacher,
} from '../../data-access/fake-http.service';
import { TeacherStore } from '../../data-access/teacher.store';
import { CardType } from '../../model/card.model';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-teacher-card',
  template: `
    <app-card [list]="teachers()" (add)="add()" customClass="bg-light-red">
      <img src="assets/img/teacher.png" width="200px" />
      <ng-template #myTemplate let-teacher>
        <app-list-item
          (delete)="delete(teacher.id)"
          [name]="teacher.firstName"
          [id]="teacher.id">
          {{ teacher.firstName }}
        </app-list-item>
      </ng-template>
    </app-card>
  `,
  styles: [
    `
      :ng-deep .bg-light-red {
        background-color: rgba(231, 10, 10, 0.1);
      }
    `,
  ],
  imports: [CardComponent, ListItemComponent],
})
export class TeacherCardComponent implements OnInit {
  private http = inject(FakeHttpService);
  private store = inject(TeacherStore);
  private teacherStore = inject(TeacherStore);

  teachers = this.store.teachers;
  cardType = CardType.TEACHER;

  ngOnInit(): void {
    this.http.fetchTeachers$.subscribe((t) => this.store.addAll(t));
  }
  add(): void {
    this.teacherStore.addOne(randTeacher());
  }
  delete(id: number) {
    this.teacherStore.deleteOne(id);
  }
}
