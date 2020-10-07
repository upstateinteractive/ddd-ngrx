import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { ExerciseDataService } from '../infrastructure/exercise.data.service';
import { catchError, map, switchMap } from 'rxjs/operators';
import * as ExercisesActions from './exercises.actions';
import { of } from 'rxjs';

@Injectable()
export class ExercisesEffects {
  loadExercises$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ExercisesActions.loadExercises),
      switchMap((action) =>
        this.backend.load().pipe(
          map((exercises) =>
            ExercisesActions.loadExercisesSuccess({ exercises })
          ),
          catchError((error) =>
            of(ExercisesActions.loadExercisesFailure({ error }))
          )
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private backend: ExerciseDataService
  ) {}
}
