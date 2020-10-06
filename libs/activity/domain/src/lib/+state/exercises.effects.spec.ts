import { TestBed, async } from '@angular/core/testing';

import { Observable } from 'rxjs';

import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { NxModule, DataPersistence } from '@nrwl/angular';
import { hot } from '@nrwl/angular/testing';

import { ExercisesEffects } from './exercises.effects';
import * as ExercisesActions from './exercises.actions';

describe('ExercisesEffects', () => {
  let actions: Observable<any>;
  let effects: ExercisesEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        ExercisesEffects,
        DataPersistence,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.get(ExercisesEffects);
  });

  describe('loadExercises$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: ExercisesActions.loadExercises() });

      const expected = hot('-a-|', {
        a: ExercisesActions.loadExercisesSuccess({ exercises: [] }),
      });

      expect(effects.loadExercises$).toBeObservable(expected);
    });
  });
});
