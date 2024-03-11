import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  hide = true;
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);

  getErrorMessageEmail() {
    if (this.email.hasError('required')) {
      return 'Debes ingresar un email del usuario';
    }

    return this.email.hasError('email') ? 'No es un email válido' : '';
  }

  getErrorMessagePassword() {
      return 'Debes ingresar la contraseña del usuario';
  }
}
