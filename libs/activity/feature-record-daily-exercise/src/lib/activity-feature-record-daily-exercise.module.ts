import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivityDomainModule } from '@ddd-ngrx/activity/domain';
import { RecordDailyExerciseComponent } from './record-daily-exercise.component';

@NgModule({
  imports: [CommonModule, ActivityDomainModule],
  declarations: [RecordDailyExerciseComponent],
  exports: [RecordDailyExerciseComponent],
})
export class ActivityFeatureRecordDailyExerciseModule {}
