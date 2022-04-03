import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CommunityPage } from './community.page';

const routes: Routes = [
  {
    path: '',
    component: CommunityPage
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'add-connection-modal',
    loadChildren: () => import('./add-connection-modal/add-connection-modal.module').then( m => m.AddConnectionModalPageModule)
  },
  {
    path: 'friend-detail/:friendId',
    loadChildren: () => import('./friend-detail/friend-detail.module').then( m => m.FriendDetailPageModule)
  },
  {
    path: 'group-detail/:groupId',
    loadChildren: () => import('./group-detail/group-detail.module').then( m => m.GroupDetailPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CommunityPageRoutingModule {}
