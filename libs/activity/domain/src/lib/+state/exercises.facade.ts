import { Injectable } from '@angular/core';
import { Store, Action } from '@ngrx/store';
import * as fromExercises from '../+state/exercises.reducer';
import * as ExercisesSelectors from '../+state/exercises.selectors';

@Injectable()
export class ExercisesFacade {
  exercisesLoaded$ = this.store.select(ExercisesSelectors.getExercisesLoaded);
  allExercises$ = this.store.select(ExercisesSelectors.getAllExercises);
  selectedExercises$ = this.store.select(ExercisesSelectors.getSelected);

  constructor(private store: Store<fromExercises.ExercisesPartialState>) {}

  dispatch(action: Action) {
    this.store.dispatch(action);
  }
}
