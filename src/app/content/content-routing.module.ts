import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContentPage } from './content.page';

const routes: Routes = [
  {
    path: '',
    component: ContentPage
  },
  {
    path: 'add-video',
    loadChildren: () => import('./add-video/add-video.module').then( m => m.AddVideoPageModule)
  },
  {
    path: 'example-detail',
    loadChildren: () => import('./example-detail/example-detail.module').then( m => m.ExampleDetailPageModule)
  },
  {
    path: 'video-detail',
    loadChildren: () => import('./video-detail/video-detail.module').then( m => m.VideoDetailPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContentPageRoutingModule {}
