import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { API_CONFIG } from 'src/app/config/api.config';
import { Person } from 'src/app/models/person';
import { PersonService } from 'src/app/services/person.service';
import { UploadService } from 'src/app/services/upload.service';

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
    fatherName: '',
    motherName: '',
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
    face: '',
    leftBack: '',
    rightBack: '',
    leftChest: '',
    rightChest: '',
    leftBelly: '',
    rightBelly: '',
    leftLeg: '',
    rightLeg: '',
    leftFeet: '',
    rightFeet: '',
    leftArm: '',
    rightArm: '',
    leftForearm: '',
    rightForearm: '',
    leftHand: '',
    rightHand: '',
    leftNeck: '',
    rightNeck: '',
    scar: '',
    deformity: ''
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
    private uploadService: UploadService
  ) { }

  ngOnInit(): void {
    this.listAllImages();
  }

  firstName = new FormControl('');
  lastName = new FormControl('');
  alturaDe = new FormControl('');
  alturaAte = new FormControl('');

  testSearch(): void {
    console.log(this.firstName, this.lastName);
  }

  searchPerson(): void {
    this.personService.findByFilter(this.firstName, this.lastName).subscribe(
      (response) => {console.log(response), console.log(this.firstName, this.lastName)}
    )
  }


  images:any = []

  listAllImages(): void {
    this.uploadService.findAllUploadImages().subscribe(
    (response) => {this.images = response, console.log(this.images)}
    )
  }

  personFindById(): void {
    this.personService.findById(this.person.id).subscribe(
      (response) => {this.person = response, this.person.occurrences = this.person.occurrences, this.ocurrencesValue = this.person.occurrences, this.imgURL = `${API_CONFIG.baseUrl}/upload/${this.person.image.id}`},
      (error) => console.log(error),
    )
  }

 
  
}
