import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [
      {
        path: 'content',
        loadChildren: () => import('../content/content.module').then(m => m.ContentPageModule)
      },
      {
        path: 'community',
        loadChildren: () => import('../community/community.module').then(m => m.CommunityPageModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
