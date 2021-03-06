import { Component, OnInit } from '@angular/core';
import { TableServiceService } from 'src/app/service/table-service.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  student: any;

  constructor(public tablerservice: TableServiceService) { }

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
