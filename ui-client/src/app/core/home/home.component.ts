import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/shared/services/users.service';


@Component({
   selector: 'app-home',
   templateUrl: './home.component.html',
   styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
   usersService: UsersService;

   constructor(usersService: UsersService) {
      this.usersService = usersService;
   }

   ngOnInit() {
   }

}
