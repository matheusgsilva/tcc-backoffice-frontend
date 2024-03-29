import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { UsersService } from '../users-list/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  displayDialog: boolean = false;
  messageDialogTitle: string = "";
  messageDialog: string = "";

  passwordDialog: boolean = false;
  passwordDialogTitle: string = "Recuperação de Senha";

  form = this.fb.group({
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [Validators.required])
  });

  formPassword = this.fb.group({
    email: new FormControl("", [Validators.required, Validators.email]),
  });

  constructor(private fb: FormBuilder, private loginService: LoginService, private router: Router, private usersService: UsersService) { }

  ngOnInit(): void {
  }

  login() {
    this.loginService.login(this.form.getRawValue())
      .subscribe((response) => {
        if (response.data.permission == 1) {
          localStorage["token"] = response.data.token;
          localStorage["email"] = response.data.email;
          localStorage["userGuid"] = response.data.guid;
          localStorage["userName"] = response.data.userName;
          this.router.navigate([""]);
        } else {
          this.unauthorized();
        }
      },
        error => {
          if (error.status == 401) {
            this.unauthorized();
          } else this.showDialog("Ocorreu um erro!", "Um erro ocorreu ao realizar a transação. Por favor, tente novamente.");
        });
  }

  unauthorized() {
    this.showDialog("Credenciais Inválidas!", "Usuários e/ou senhas inválidos! Verifique os dados inseridos.");
  }

  showDialog(title: string, msg: string) {
    this.messageDialogTitle = title;
    this.messageDialog = msg;
    this.displayDialog = true;
  }

  showPasswordDialog() {
    this.passwordDialog = true;
  }

  updatePassword() {
    this.usersService.changePassword(this.formPassword.getRawValue())
      .subscribe((response: any) => {
        if (response.code == 200) {
          this.passwordDialog = false;
          this.showDialog("Sucesso", "Foi enviado um e-mail, contendo um link para a recuperação de senha.");
          this.formPassword.reset();
        } else {
          this.showDialog("Ocorreu um erro!", "Um erro ocorreu ao realizar a transação. Por favor, verifique os dados inseridos e tente novamente.");
        }
      },
        error => {
          if (error.status == 401) {
            this.unauthorized();
          } else this.showDialog("Ocorreu um erro!", "Um erro ocorreu ao realizar a transação. Por favor, tente novamente.");
        });
  }
}
