import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {BreakpointObserver} from '@angular/cdk/layout';
import {StepperOrientation} from '@angular/material/stepper';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import { PersonService } from 'src/app/services/person.service';
import { UploadService } from 'src/app/services/upload.service';
import { Person } from 'src/app/models/person';

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
  selector: 'app-person-create',
  templateUrl: './person-create.component.html',
  styleUrls: ['./person-create.component.css']
})
export class PersonCreateComponent implements OnInit {
  formData: any = new FormData();
  
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
  
  imgID = '';
  imgURL = '';


  ngOnInit(): void {
    //this.addOccurrences();
  }

  private initForm(){
    var myPostObject = {
      occurrences: this.personFormGroup.controls['occurrences'].value
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

    face: [''],
    leftBack: [''],
    rightBack: [''],
    leftChest: [''],
    rightChest: [''],
    leftBelly: [''],
    rightBelly: [''],
    leftLeg: [''],
    rightLeg: [''],
    leftFeet: [''],
    rightFeet: [''],
    leftArm: [''],
    rightArm: [''],
    leftForearm: [''],
    rightForearm: [''],
    leftHand: [''],
    rightHand: [''],
    leftNeck: [''],
    rightNeck: [''],
    scar: [''],
    deformity: ['']
  });
  stepperOrientation: Observable<StepperOrientation>;

  constructor(
    private _formBuilder: FormBuilder,
    breakpointObserver: BreakpointObserver,
    private service: PersonService,
    private uploadService: UploadService
    ) {
    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({matches}) => (matches ? 'horizontal' : 'vertical')));
  }

  get occurrences() {
    return this.personFormGroup.controls['occurrences'] as FormArray;
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

  onFileChange(event: any) {
    const reader = new FileReader();
    
    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      //this.person.image = file;
    
      this.formData.append('image', file);

      reader.onload = () => {
        this.imgURL = reader.result as string
        //this.person.image = btoa(this.imgURL);
        this.personFormGroup.patchValue({
          fileSource: reader.result
        });
   
      };
   
    }
  }


  getData(): void {
  
    console.log(this.person);

  }

  getOccurrences(): void {
    console.log(this.personFormGroup.get('occurrences')?.value);
    this.formData.append('occurrences', this.personFormGroup.get('occurrences')?.value);
  }

  uploadImage(): void {
    this.uploadService.create(this.formData).subscribe(
      response => {(this.person.image.id = response.id)},
      (error) => console.log(error)
    )
  }

  create(): void {  
  
    
    for(let i = 0; i < this.occurrences.length; i ++){
      this.person.occurrences.push(this.personFormGroup.controls['occurrences'].value[i]);
    }
    

    this.service.create(this.person).subscribe(
      (response) => console.log(response),
      (error) => console.log(error)
    )

    /*
    this.service.create(this.person).subscribe(() => {
      response => console.log(response)
    }, ex => {
      console.log(ex);
    })

  /*
   this.service.create(this.formData)
   .subscribe(
    {
      next: image => {
        this.uploadService.create(this.formData).subscribe({
          error: (erro) => {
            console.log(erro);
          }
        })
      }
    })
    */

        /*
    this.cardService.create(this.cardForm.value).subscribe(-
      next: image => this.uploadService.create(formData).subscribe({
        next: response => { this.router.navigateByUrl('', {skipLocationChange: true}).then(() => {
          this.toastr.info('Cartão cadastrado', 'Cadastro');
          this.router.navigate(['auth/cards'])}
        )}
      }),
      error: error => {
       this.toastr.error('Nome já cadastrado no sistema!', 'Erro');
     }
   })

   */



    /*
    this.uploadService.create(this.formData).subscribe(() => {
      console.log(this.formData);
    }, ex => {
      console.log(ex);
    })
    */

  }
}
