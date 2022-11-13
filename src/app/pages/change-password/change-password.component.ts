import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ResponseAPI } from 'src/app/shared/response.model';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
  providers: [MessageService]
})
export class ChangePasswordComponent implements OnInit {

  guid: any;

  form = this.fb.group({
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [Validators.required])
  });

  constructor(private route: ActivatedRoute, private fb: FormBuilder, private loginService: LoginService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.guid = this.route.snapshot.queryParamMap.get("guid");
  }

  save() {
    this.loginService.updatePass({ ...this.form.value, guid: this.guid }).subscribe(response => {
      this.getMessage((response as ResponseAPI).code);
    }, () => this.getMessage(404));
  }

  getMessage(code: number) {
    if (code == 200) {
      this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Operação realizada!', life: 3000 });
    } else
      this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Operação não realizada!', life: 3000 });
  }
}
