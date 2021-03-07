import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/authentication/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  authError: any;

  constructor(private authservice: AuthService, private router:Router) { }

  ngOnInit() {
    this.authservice.eventAuthError$.subscribe( data => {
      this.authError = data;
    })
  }


  register(frm){
    this.authservice.createUser(frm.value)
  }

}
