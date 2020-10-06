import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { readFirst } from '@nrwl/angular/testing';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';

import { NxModule } from '@nrwl/angular';

import { ExercisesEntity } from './exercises.models';
import { ExercisesEffects } from './exercises.effects';
import { ExercisesFacade } from './exercises.facade';

import * as ExercisesSelectors from './exercises.selectors';
import * as ExercisesActions from './exercises.actions';
import {
  EXERCISES_FEATURE_KEY,
  State,
  initialState,
  reducer,
} from './exercises.reducer';

interface TestSchema {
  exercises: State;
}

describe('ExercisesFacade', () => {
  let facade: ExercisesFacade;
  let store: Store<TestSchema>;
  const createExercisesEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as ExercisesEntity);

  beforeEach(() => {});

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(EXERCISES_FEATURE_KEY, reducer),
          EffectsModule.forFeature([ExercisesEffects]),
        ],
        providers: [ExercisesFacade],
      })
      class CustomFeatureModule {}

      @NgModule({
        imports: [
          NxModule.forRoot(),
          StoreModule.forRoot({}),
          EffectsModule.forRoot([]),
          CustomFeatureModule,
        ],
      })
      class RootModule {}
      TestBed.configureTestingModule({ imports: [RootModule] });

      store = TestBed.get(Store);
      facade = TestBed.get(ExercisesFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async (done) => {
      try {
        let list = await readFirst(facade.allExercises$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        facade.dispatch(ExercisesActions.loadExercises());

        list = await readFirst(facade.allExercises$);
        isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(true);

        done();
      } catch (err) {
        done.fail(err);
      }
    });

    /**
     * Use `loadExercisesSuccess` to manually update list
     */
    it('allExercises$ should return the loaded list; and loaded flag == true', async (done) => {
      try {
        let list = await readFirst(facade.allExercises$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        facade.dispatch(
          ExercisesActions.loadExercisesSuccess({
            exercises: [
              createExercisesEntity('AAA'),
              createExercisesEntity('BBB'),
            ],
          })
        );

        list = await readFirst(facade.allExercises$);
        isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(2);
        expect(isLoaded).toBe(true);

        done();
      } catch (err) {
        done.fail(err);
      }
    });
  });
});
