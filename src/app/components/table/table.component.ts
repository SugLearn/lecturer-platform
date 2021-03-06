import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/authentication/auth.service';
import { TableServiceService } from 'src/app/service/table/table-service.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  student: any;

  constructor(public tablerservice: TableServiceService, public authservice: AuthService, private router: Router) { }

  ngOnInit() {
    this.tablerservice.get_AllValues().subscribe(data => {
      this.student = data.map(e => {
        return {
          id: e.payload.doc.id,
          isedit: false,
          name: e.payload.doc.data()['name'],
          age: e.payload.doc.data()['age'],
          keyMessage: e.payload.doc.data()['KeyMessage'],
          dob: e.payload.doc.data()['DOB'],
          university: e.payload.doc.data()['university'],
          qualification: e.payload.doc.data()['Qualification'],
          image: e.payload.doc.data()['image'],
        };
      })
      // console.log(this.student);
  });
  }

}
