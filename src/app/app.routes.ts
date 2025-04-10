import { Routes } from '@angular/router';
import { LoginComponent } from './components/layout/login/login.component';
import { PrincipalComponent } from './components/layout/principal/principal.component';
import { MetasListComponent } from './components/metas/metas-list/metas-list.component';
import { ContasListComponent } from './components/contas/conta-list/conta-list.component';
import { CategoriasComponent } from './components/categorias/categorias.component';
import { OrcamentosListComponent } from './components/orcamentos/orcamentos-list/orcamentos-list.component';
import { TagsComponent } from './components/tags/tags.component';
import { TransacaoComponent } from './components/transacao/transacao.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UsuariosListComponent } from './components/usuarios/usuarios-list/usuarios-list.component';

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
      { path: "categorias", component: CategoriasComponent },
      { path: "orcamentos", component: OrcamentosListComponent },
      { path: "tags", component: TagsComponent },
      { path: "transacao", component: TransacaoComponent },
      { path: "categorias", component: CategoriasComponent },
      { path: "usuarios", component: UsuariosListComponent },
    ]
  },
  // wildcard DEPOIS das demais rotas
  // { path: "**", redirectTo: "login", pathMatch: "full" }
];