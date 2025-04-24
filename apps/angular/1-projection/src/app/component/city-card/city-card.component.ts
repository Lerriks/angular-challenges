import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { CityStore } from '../../data-access/city.store';
import {
  FakeHttpService,
  randomCity,
} from '../../data-access/fake-http.service';
import { CardType } from '../../model/card.model';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-city-card',
  template: `
    <app-card customClass="bg-light-aa" [list]="cities()" (add)="add()">
      <img src="assets/img/city.png" width="200px" />

      <ng-template #myTemplate let-city>
        <app-list-item
          (delete)="delete(city.id)"
          [name]="city.name"
          [id]="city.id">
          {{ city.name }}
        </app-list-item>
      </ng-template>
    </app-card>
  `,
  styles: [
    `
      ::ng-deep .bg-light-aa {
        background-color: rgba(57, 38, 134, 0.1);
      }
    `,
  ],
  imports: [CardComponent, ListItemComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CityCardComponent implements OnInit {
  private http = inject(FakeHttpService);
  private store = inject(CityStore);
  private citiesStore = inject(CityStore);

  cities = this.store.cities;
  cardType = CardType.CITY;

  ngOnInit(): void {
    this.http.fetchCities$.subscribe((s) => this.store.addAll(s));
  }
  add(): void {
    this.citiesStore.addOne(randomCity());
  }
  delete(id: number) {
    this.citiesStore.deleteOne(id);
  }
}
