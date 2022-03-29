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
    path: 'video-detail',
    loadChildren: () => import('./video-detail/video-detail.module').then( m => m.VideoDetailPageModule)
  },
  {
    path: 'add-video-modal',
    loadChildren: () => import('./add-video-modal/add-video-modal.module').then( m => m.AddVideoModalPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContentPageRoutingModule {}
