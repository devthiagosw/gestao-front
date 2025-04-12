import { Routes } from '@angular/router';
import { LoginComponent } from './components/layout/login/login.component';
import { PrincipalComponent } from './components/layout/principal/principal.component';
import { MetasListComponent } from './components/metas/metas-list/metas-list.component';
import { ContasListComponent } from './components/contas/conta-list/conta-list.component';
import { CategoriasListComponent } from './components/categorias/categorias-list/categorias-list.component';
import { OrcamentosComponent } from './components/orcamentos/orcamentos.component';
import { TagsComponent } from './components/tags/tags.component';
import { TransacaoComponent } from './components/transacao/transacao.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

export const routes: Routes = [
    { path: "login", component: LoginComponent },
    { path: "", redirectTo: "login", pathMatch: "full" },
    {
      path: "admin",
      component: PrincipalComponent,
      children: [
        { path: "dashboard", component: DashboardComponent  },
        { path: "app-metas", component: MetasListComponent },
        {path:"conta", component: ContasListComponent},
        { path: 'categorias', component: CategoriasListComponent },
        { path: "orcamentos", component: OrcamentosComponent },
        { path: "tags", component: TagsComponent },
        { path: "transacao", component: TransacaoComponent },
        
      ]
    },
    // wildcard DEPOIS das demais rotas
    // { path: "**", redirectTo: "login", pathMatch: "full" }
  ];