import { Component, OnInit } from '@angular/core';
import { Signup } from 'src/Models/singup.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-remove',
  templateUrl: './remove.component.html',
  styleUrls: ['./remove.component.css']
})
export class RemoveComponent implements OnInit {

  filtername: string | undefined;
  constructor(
    private userService: UserService
  ) { }

  remove(email: string) {
    this.userService.deleteUsers(email);
    window.location.reload();
  }


  filter(name: string | undefined) {
    if (!(name == undefined)) {
      this.usersList = [];
    this.clone.forEach(element => {
      if (element.fname.toLowerCase().includes(name.toLowerCase())) {
        this.usersList.push(element);
      }
    });
    }
  }

  usersList: Signup[] = [];
  clone: Signup[] = []
  ngOnInit(): void {
    this.userService.getUsers().subscribe({
      next: (resp: Signup[]) => {
        resp.forEach(element => {
          if(element.email != localStorage.getItem("email")) {
            this.clone.push(element);
            this.usersList.push(element);
          }
        });
      }
    });
  }

}
