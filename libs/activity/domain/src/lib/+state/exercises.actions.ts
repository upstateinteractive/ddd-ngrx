import { createAction, props } from '@ngrx/store';
import { ExercisesEntity } from './exercises.models';

export const loadExercises = createAction('[Exercises] Load Exercises');

export const loadExercisesSuccess = createAction(
  '[Exercises] Load Exercises Success',
  props<{ exercises: ExercisesEntity[] }>()
);

export const loadExercisesFailure = createAction(
  '[Exercises] Load Exercises Failure',
  props<{ error: any }>()
);
