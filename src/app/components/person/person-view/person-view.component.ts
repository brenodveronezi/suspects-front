import { Component, OnInit } from '@angular/core';
import { API_CONFIG } from 'src/app/config/api.config';
import { Person } from 'src/app/models/person';
import { PersonService } from 'src/app/services/person.service';

@Component({
  selector: 'app-person-view',
  templateUrl: './person-view.component.html',
  styleUrls: ['./person-view.component.css']
})
export class PersonViewComponent implements OnInit {

  readonly API_CONFIG = API_CONFIG.baseUrl;

  ocurrencesValue: any =  [];
  imgURL: any;

  person: Person = {
    id: '',
    firstname: '',
    lastname: '',
    surname: '',
    birthDate: '',
    age: '',
    nationality: '',
    cpf: '',
    rg: '',
    fathername: '',
    mothername: '',
    address: {
      street: '',
      city: '',
      state: '',
      number: '',
      zipCode: '',
      complement: '',
    },
    occurrences: [],
    particulars: {
      maritalStatus: '',
      skinColor: '',
      skinEyes: '',
      hairType: '',
      hairColor: '',
      weight: '',
      height: ''
    },
    tattoos:  {   
    face: false,
    leftBack: false,
    rightBack: false,
    leftChest: false,
    rightChest: false,
    leftBelly: false,
    rightBelly: false,
    leftLeg: false,
    rightLeg: false,
    leftFeet: false,
    rightFeet: false,
    leftArm: false,
    rightArm: false,
    leftForearm: false,
    rightForearm: false,
    leftHand: false,
    rightHand: false,
    leftNeck: false,
    rightNeck: false,
    scar: false,
    deformity: false
    },
    image: {
      id: '',
      name: '',
      type: '',
      data: ''
    }
  }

  constructor(
    private personService: PersonService,
  ) { }

  ngOnInit(): void {
  }


  personFindById(): void {
    this.personService.findById(this.person.id).subscribe(
      (response) => {this.person = response, this.person.occurrences = this.person.occurrences, this.ocurrencesValue = this.person.occurrences, this.imgURL = `${API_CONFIG.baseUrl}/upload/${this.person.image.id}`},
      (error) => console.log(error),
    )
  }

}
