import { Address } from "./address";
import { Occurrences } from "./occurrences";
import { Particulars } from "./particulars";
import { Tattoos } from "./tattoos";
import { Upload } from "./upload";

export interface Person {
    id?: any;
    firstname: string;
    lastname: string;
    surname: string;
    birthDate: any;
    age: string;
    nationality: string;
    cpf: string;
    rg: string;
    fatherName: string;
    motherName: string;
    address: Address;
    occurrences: Array<Occurrences>;
    particulars: Particulars;
    tattoos: Tattoos;
    image: Upload;
}


