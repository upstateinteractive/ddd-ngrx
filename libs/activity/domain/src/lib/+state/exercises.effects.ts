import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';
import { ExerciseDataService } from '../infrastructure/exercise.data.service';
import { map } from 'rxjs/operators';

import * as ExercisesActions from './exercises.actions';

@Injectable()
export class ExercisesEffects {
  loadExercises$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ExercisesActions.loadExercises),
      fetch({
        run: (action) => {
          return this.backend
            .load()
            .pipe(
              map((exercises) =>
                ExercisesActions.loadExercisesSuccess({ exercises })
              )
            );
        },

        onError: (action, error) => {
          console.error('Error', error);
          return ExercisesActions.loadExercisesFailure({ error });
        },
      })
    )
  );

  constructor(
    private actions$: Actions,
    private backend: ExerciseDataService
  ) {}
}
