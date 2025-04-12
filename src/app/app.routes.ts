import { Routes } from '@angular/router';
import { LoginComponent } from './components/layout/login/login.component';
import { PrincipalComponent } from './components/layout/principal/principal.component';
import { MetasListComponent } from './components/metas/metas-list/metas-list.component';
import { ContasListComponent } from './components/contas/conta-list/conta-list.component';
import { CategoriasListComponent } from './components/categorias/categorias-list/categorias-list.component';
import { OrcamentosListComponent } from './components/orcamentos/orcamentos-list/orcamentos-list.component';
import { TransacaoListComponent } from './components/transacao/transacao-list/transacao-list.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UsuariosListComponent } from './components/usuarios/usuarios-list/usuarios-list.component';
import { TagsListComponent } from './components/tags/tags-list/tags-list.component';

export const routes: Routes = [

  { path: "login", component: LoginComponent },
  { path: "", redirectTo: "login", pathMatch: "full" },
  {
    path: "admin",
    component: PrincipalComponent,
    children: [
      { path: "dashboard", component: DashboardComponent },
      { path: "app-metas", component: MetasListComponent },
      { path: "conta", component: ContasListComponent },
      { path: "orcamentos", component: OrcamentosListComponent },
      { path: "tags", component: TagsListComponent },
      { path: "transacao", component: TransacaoListComponent },
      { path: 'categorias', component: CategoriasListComponent },
      { path: "usuarios", component: UsuariosListComponent },
    ]
  },
  // wildcard DEPOIS das demais rotas
  // { path: "**", redirectTo: "login", pathMatch: "full" }
];

