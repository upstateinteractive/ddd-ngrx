import { Component, OnInit} from '@angular/core';
import { RecordDailyExerciseFacade } from '@ddd-ngrx/activity/domain';

@Component({
  selector: 'activity-record-daily-exercise',
  templateUrl: './record-daily-exercise.component.html',
  styleUrls: ['./record-daily-exercise.component.scss']
})
export class RecordDailyExerciseComponent implements OnInit {
    
    
    exerciseList$ = this.recordDailyExerciseFacade.exerciseList$;


    constructor(private recordDailyExerciseFacade: RecordDailyExerciseFacade) {
    }

    
    ngOnInit() {
        this.load();
    }

    load(): void {
        this.recordDailyExerciseFacade.load();
    }

}

