import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { PrimeIcons } from 'primeng/api';
import { MenuItem } from 'primeng/api/menuitem';
import { PanelMenu } from 'primeng/panelmenu';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  @Input() display = true;
  items: MenuItem[] = [];

  @ViewChild("menu") menu!: PanelMenu;

  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
    this.items = [
      {
        label: 'Cadastros', icon: PrimeIcons.CLONE, expanded: true,
        items: [
          { label: 'Usuários', icon: PrimeIcons.USERS, routerLink: ['/users-list'] },
          { label: 'Organizações', icon: PrimeIcons.BRIEFCASE, routerLink: ['/companies-list'] },
          { label: 'Pets', icon: PrimeIcons.GITHUB, routerLink: ['/pets-list'] },
        ]
      },
      {
        label: 'Sair', icon: PrimeIcons.SIGN_OUT, command: () => {
          this.loginService.logout();
        }
      },
    ];
  }

  ngAfterViewInit(): void {
   // this.menu.collapseAll();
  }
}
