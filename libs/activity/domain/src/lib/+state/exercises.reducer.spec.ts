import { ExercisesEntity } from './exercises.models';
import * as ExercisesActions from './exercises.actions';
import { State, initialState, reducer } from './exercises.reducer';

describe('Exercises Reducer', () => {
  const createExercisesEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as ExercisesEntity);

  beforeEach(() => {});

  describe('valid Exercises actions', () => {
    it('loadExercisesSuccess should return set the list of known Exercises', () => {
      const exercises = [
        createExercisesEntity('PRODUCT-AAA'),
        createExercisesEntity('PRODUCT-zzz'),
      ];
      const action = ExercisesActions.loadExercisesSuccess({ exercises });

      const result: State = reducer(initialState, action);

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
