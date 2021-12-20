import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../User';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  Input_Id = "";
  Input_name = "";
  table_data: User[] = []
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getUsers()
  }

  //Search By ID
  Search_By_Id() {
    this.Input_name = "";
    if (this.Input_Id == "") {
      this.getUsers()
    }
    else {

      this.userService.Get_by_id(Number(this.Input_Id)).subscribe(
        (data) => { this.table_data = data },
        (error) => { }

      )
    }
  }

  //Search By Name
  Search_By_Name() {
    this.Input_Id = "";
    if (this.Input_name == "") {
      this.getUsers()
    }
    else {
      this.userService.Get_by_name(this.Input_name).subscribe(
        (data) => { this.table_data = data },
        (error) => { console.log(error) }
      )
    }
  }

  //GET all User
  getUsers() {
    this.userService.getuser().subscribe((
      data) => { this.table_data = data; },
      (error) => { console.log(error) }
    )

  }

}
