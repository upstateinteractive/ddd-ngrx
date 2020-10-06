import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { Exercise } from '../entities/exercise';
import { ExerciseDataService } from '../infrastructure/exercise.data.service';


@Injectable({ providedIn: 'root' })
export class RecordDailyExerciseFacade {

    private exerciseListSubject = new BehaviorSubject<Exercise[]>([]); 
    exerciseList$ = this.exerciseListSubject.asObservable();

    constructor(private exerciseDataService: ExerciseDataService) {
    }

    load(): void {
        this.exerciseDataService.load().subscribe(
            exerciseList => {
                this.exerciseListSubject.next(exerciseList)
            },
            err => {
                console.error('err', err);
            }
        );
    }

}
