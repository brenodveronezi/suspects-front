import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { API_CONFIG } from 'src/app/config/api.config';
import { Person } from 'src/app/models/person';
import { PersonService } from 'src/app/services/person.service';
import { UploadService } from 'src/app/services/upload.service';


interface MaritalStatus {
  value: string;
  viewValue: string;
}

interface SkinColor {
  value: string;
  viewValue: string;
}

interface EyeColor {
  value: string;
  viewValue: string;
}

interface HairType {
  value: string;
  viewValue: string;
}

interface HairColor {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-person-update',
  templateUrl: './person-update.component.html',
  styleUrls: ['./person-update.component.css']
})
export class PersonUpdateComponent implements OnInit {

  readonly API_CONFIG = API_CONFIG.baseUrl;

  formData: any = new FormData();
  ocurrencesValue: any =  [];
  imgURL: any;
  imgId: any;
  
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

  personFormGroup = this._formBuilder.group({
    firstname: ['', Validators.required],
    lastname: ['', Validators.required],
    surname: ['', Validators.required],
    birthDate: ['', Validators.required],
    age: ['', Validators.required],
    nationality: ['', Validators.required],
    cpf: ['', Validators.required],
    rg: ['', Validators.required],
    fatherName: ['', Validators.required],
    motherName: ['', Validators.required],

    maritalStatus: ['', Validators.required],
    skinColor: ['', Validators.required],
    skinEyes: ['', Validators.required],
    hairType: ['', Validators.required],
    hairColor: ['', Validators.required],
    weight: ['', Validators.required],
    height: ['', Validators.required],

    street: ['', Validators.required],
    city: ['', Validators.required],
    state: ['', Validators.required],
    number: ['', Validators.required],
    zipCode: ['', Validators.required],
    complement: ['', Validators.required],

    occurrences: this._formBuilder.array([]),

    face: ['', Validators.required],
    leftBack: ['', Validators.required],
    rightBack: ['', Validators.required],
    leftChest: ['', Validators.required],
    rightChest: ['', Validators.required],
    leftBelly: ['', Validators.required],
    rightBelly: ['', Validators.required],
    leftLeg: ['', Validators.required],
    rightLeg: ['', Validators.required],
    leftFeet: ['', Validators.required],
    rightFeet: ['', Validators.required],
    leftArm: ['', Validators.required],
    rightArm: ['', Validators.required],
    leftForearm: ['', Validators.required],
    rightForearm: ['', Validators.required],
    leftHand: ['', Validators.required],
    rightHand: ['', Validators.required],
    leftNeck: ['', Validators.required],
    rightNeck: ['', Validators.required],
    scar: ['', Validators.required],
    deformity: ['', Validators.required]
  });

  constructor(
    private personService: PersonService,
    private uploadService: UploadService,
    private activatedRoute: ActivatedRoute,
    private _formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.person.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.personFindById();
    //this.uploadFindById(this.imgId);
    //this.imgURL = `${API_CONFIG.baseUrl}/upload/${this.imgId}`;
    console.log(this.person.occurrences);
  }

  maritalStatus: MaritalStatus[] = [
    {value: 'Solteiro(a)', viewValue: 'Solteiro(a)'},
    {value: 'Casado(a)', viewValue: 'Casado(a)'},
    {value: 'Divorciado(a)', viewValue: 'Divorciado(a)'},
    {value: 'Separado(a)', viewValue: 'Separado(a)'},
    {value: 'Viuvo(a)', viewValue: 'Viúvo(a)'}
];

skinColor: SkinColor[] = [
  {value: 'Amarelo', viewValue: 'Amarelo'},
  {value: 'Branco', viewValue: 'Branco'},
  {value: 'Pardo', viewValue: 'Pardo'},
  {value: 'Negro', viewValue: 'Negro'},
  {value: 'Vermelho', viewValue: 'Vermelho'},
];

eyeColor: EyeColor[] = [
  {value: 'Azul', viewValue: 'Azul'},
  {value: 'Castanho', viewValue: 'Castanho'},
  {value: 'Preto', viewValue: 'Preto'},
  {value: 'Verde', viewValue: 'Verde'},
];

hairType: HairType[] = [
  {value: 'Calvo', viewValue: 'Calvo'},
  {value: 'Encaracolado', viewValue: 'Encaracolado'},
  {value: 'Carapinha', viewValue: 'Carapinha'},
  {value: 'Liso', viewValue: 'Liso'},
  {value: 'Ondulado', viewValue: 'Ondulado'}
];

hairColor: HairColor[] = [
  {value: 'Castanho', viewValue: 'Castanho'},
  {value: 'Ruivo', viewValue: 'Ruivo'},
  {value: 'Preto', viewValue: 'Preto'},
  {value: 'Loiro', viewValue: 'Loiro'},
  {value: 'Grisalho', viewValue: 'Grisalho'}
];

get occurrences() {
  return this.personFormGroup.controls['occurrences'] as FormArray;
}

onFileChange(event: any) {
  const reader = new FileReader();
  
  if(event.target.files && event.target.files.length) {
    const [file] = event.target.files;
    reader.readAsDataURL(file);
    //this.person.image = file;
  
    this.formData.append('image', file);
    this.formData.append('id', this.person.image.id);

    reader.onload = () => {
      this.imgURL = reader.result as string
      //this.person.image = btoa(this.imgURL);
      this.personFormGroup.patchValue({
        fileSource: reader.result
      });
 
    };
 
  }
}

addOccurrences() {
  const occurrencesForm = this._formBuilder.group({
    'date': '',
    'procedure': '',
    'article': '',
    'law': '',
    'historic': '',
  })
  this.occurrences.push(occurrencesForm);
}

deleteOccurrence(occurrenceIndex: number){
  this.occurrences.removeAt(occurrenceIndex);
  this.person.occurrences.splice(occurrenceIndex, 1);
}

updateImage(): void {
  this.uploadService.update(this.formData, this.person.image.id).subscribe(
    response => {(this.person.image.id = response.id)},
    (error) => console.log(error)
  )
}

updatePerson(): void {

  for(let i = 0; i < this.occurrences.length; i ++){
    this.person.occurrences.push(this.personFormGroup.controls['occurrences'].value[i]);
  }

  this.personService.update(this.person).subscribe(
    (response) => {},
    (error) => console.log(error),
  )
}

  getPersonData(): void {
    //for(let i = 0; i < this.person.occurrences.length; i ++){
      //this.personFormGroup.controls['occurrences'].value.push(this.person.occurrences[i]);
   // }

   this.occurrences.push(this.personFormGroup.controls['occurrences']);
    
    console.log(this.person.occurrences)
    console.log(this.personFormGroup.controls['occurrences'].value);
  }

  updateOccurrences(): void {
    for(let i = 0; i < this.person.occurrences.length; i ++){
      this.personFormGroup.controls['occurrences'].value.push(this.person.occurrences[i]);
    }
  }
  
  personFindById(): void {
    this.personService.findById(this.person.id).subscribe(
      (response) => {this.person = response, this.person.occurrences = this.person.occurrences, this.ocurrencesValue = this.person.occurrences, this.updateOccurrences(), this.imgURL = `${API_CONFIG.baseUrl}/upload/${this.person.image.id}`},
      (error) => console.log(error),
    )
  }

  uploadFindById(id: string): void {
    this.uploadService.findById(id).subscribe(
      (response) => {this.imgURL = `${API_CONFIG.baseUrl}/upload/${response}`, console.log("Resposta Upload" + response)},
      (error) => console.log(error)
    )
  }

}
