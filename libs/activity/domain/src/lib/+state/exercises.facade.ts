import { Injectable } from '@angular/core';

import { select, Store, Action } from '@ngrx/store';

import * as fromExercises from './exercises.reducer';
import * as ExercisesSelectors from './exercises.selectors';

@Injectable()
export class ExercisesFacade {
  loaded$ = this.store.pipe(select(ExercisesSelectors.getExercisesLoaded));
  allExercises$ = this.store.pipe(select(ExercisesSelectors.getAllExercises));
  selectedExercises$ = this.store.pipe(select(ExercisesSelectors.getSelected));

  constructor(private store: Store<fromExercises.ExercisesPartialState>) {}

  dispatch(action: Action) {
    this.store.dispatch(action);
  }
}
