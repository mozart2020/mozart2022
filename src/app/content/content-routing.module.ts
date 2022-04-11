import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContentPage } from './content.page';

const routes: Routes = [
  {
    path: '',
    component: ContentPage
  },
  {
    path: 'example-detail',
    loadChildren: () => import('./example-detail/example-detail.module').then( m => m.ExampleDetailPageModule)
  },
  {
    path: 'video-detail/:videoId',
    loadChildren: () => import('./video-detail/video-detail.module').then( m => m.VideoDetailPageModule)
  },
  {
    path: 'add-video',
    loadChildren: () => import('./add-video/add-video.module').then( m => m.AddVideoPageModule)
  },
  {
    path: 'choose-teacher-modal',
    loadChildren: () => import('./choose-teacher-modal/choose-teacher-modal.module').then( m => m.ChooseTeacherModalPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContentPageRoutingModule {}
