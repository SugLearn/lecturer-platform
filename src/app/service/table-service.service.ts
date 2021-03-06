import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class TableServiceService {

  constructor(public fireservices:AngularFirestore) { }

  get_AllValues()
  {
    return this.fireservices.collection('Student').snapshotChanges();
  }

  create_Newestudent(data){
    return this.fireservices.collection('Student').add(data);
  }
}
