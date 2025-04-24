import { CommonModule } from '@angular/common';
import {
  Component,
  ContentChild,
  inject,
  input,
  output,
  TemplateRef,
} from '@angular/core';
import { StudentStore } from '../../data-access/student.store';
import { CardType } from '../../model/card.model';

@Component({
  selector: 'app-card',
  template: `
    <div
      class="flex w-fit flex-col gap-3 rounded-md border-2 border-black p-4"
      [class]="customClass()">
      <ng-content />
      <section>
        @for (item of list(); track item.id) {
          <ng-template
            [ngTemplateOutlet]="itemTemplate"
            [ngTemplateOutletContext]="{ $implicit: item }"></ng-template>
        }
      </section>
      <button
        class="rounded-sm border border-blue-500 bg-blue-300 p-2"
        (click)="add.emit()">
        Add
      </button>
    </div>
  `,
  imports: [CommonModule],
  host: {
    class: 'border-2 border-black rounded-md p-4 w-fit flex flex-col gap-3',
  },
})
export class CardComponent {
  @ContentChild(TemplateRef) itemTemplate!: TemplateRef<unknown>;

  private studentStore = inject(StudentStore);

  readonly list = input<any[] | null>(null);
  add = output();
  readonly customClass = input('');

  CardType = CardType;
}
