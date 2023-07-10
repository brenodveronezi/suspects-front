import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavComponent } from './components/nav/nav.component';
import { PersonCreateComponent } from './components/person/person-create/person-create.component';
import { PersonListComponent } from './components/person/person-list/person-list.component';
import { PersonUpdateComponent } from './components/person/person-update/person-update.component';
import { PersonViewComponent } from './components/person/person-view/person-view.component';

const routes: Routes = [
  {path: '', component: NavComponent, children: [
    {path: 'cadastrar-suspeito', component: PersonCreateComponent},
    {path: 'listar-suspeitos', component: PersonListComponent},
    {path: 'listar-suspeitos/update/:id', component: PersonUpdateComponent},
    {path: 'identificar-suspeitos', component: PersonViewComponent}
  ],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
