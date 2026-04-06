import { Injectable } from '@nestjs/common';
import { AnyARecord } from 'dns';

export interface User {
  id: string;
  email: string;
  name: string;
  password: string;
  address: string;
  phone: string;
  country?: string | undefined;
  city?: string | undefined;
}
const users: User[] = [
  {
    id: 'usr_001',
    name: 'Valentina Gómez',
    email: 'valentina.gomez@email.com',
    password: 'V@l3nt1n@2024',
    address: 'Av. Corrientes 1234, Piso 3',
    phone: '+54 11 4523-7890',
    country: 'Argentina',
    city: 'Buenos Aires',
  },
  {
    id: 'usr_002',
    name: 'Mateo Rodríguez',
    email: 'mateo.rodriguez@mail.com',
    password: 'M@te0Rd#2024',
    address: 'Calle Falsa 567, Dpto 2B',
    phone: '+54 351 489-2341',
    country: 'Argentina',
    city: 'Córdoba',
  },
  {
    id: 'usr_003',
    name: 'Lucía Fernández',
    email: 'lucia.fernandez@webmail.com',
    password: 'Lu_F3rn@2024!',
    address: 'San Martín 890',
    phone: '+54 261 374-6512',
    country: 'Argentina',
    city: 'Mendoza',
  },
  {
    id: 'usr_004',
    name: 'Sebastián Torres',
    email: 'sebas.torres@correo.com',
    password: 'S3b@sTorr#1!',
    address: 'Urquiza 321, Casa 5',
    phone: '+54 341 298-4430',
    country: 'Argentina',
    city: 'Rosario',
  },
  {
    id: 'usr_005',
    name: 'Camila Martínez',
    email: 'camila.mtz@inbox.com',
    password: 'C@m1l@Mtz2024',
    address: 'Belgrano 742, Piso 1',
    phone: '+54 221 567-8823',
    country: 'Argentina',
    city: 'La Plata',
  },
  {
    id: 'usr_006',
    name: 'Diego Herrera',
    email: 'diego.herrera@post.com',
    password: 'Di3goH3rr@!',
    address: 'Rivadavia 1102',
    phone: '+54 381 443-1190',
    country: 'Argentina',
    city: 'San Miguel de Tucumán',
  },
  {
    id: 'usr_007',
    name: 'Florencia López',
    email: 'flor.lopez@domain.com',
    password: 'Fl0r3nc1@#24',
    address: 'Mitre 88, Dpto 4A',
    phone: '+54 299 312-5567',
    country: 'Argentina',
    city: 'Neuquén',
  },
  {
    id: 'usr_008',
    name: 'Nicolás Pérez',
    email: 'nico.perez@netmail.com',
    password: 'N1c0P3r3z@!',
    address: 'Salta 2200, Piso 7',
    phone: '+54 11 3841-9920',
    country: 'Argentina',
    city: 'Buenos Aires',
  },
  {
    id: 'usr_009',
    name: 'Agustina Ruiz',
    email: 'agustina.ruiz@correoweb.com',
    password: 'Agu$t1n@Ru1z',
    address: 'Av. Libertad 430',
    phone: '+54 264 481-7743',
    country: 'Argentina',
    city: 'San Juan',
  },
  {
    id: 'usr_010',
    name: 'Tomás Vargas',
    email: 'tomas.vargas@mailbox.com',
    password: 'T0m@sV@rg4s!',
    address: "O'Higgins 15, Piso 2",
    phone: '+54 223 394-6618',
    country: 'Argentina',
    city: 'Mar del Plata',
  },
];

@Injectable()
export class usersRepository {
  getAllUsers(): Omit<User, `password`>[]{
    return users.map(({password, ...userNoPassword})=>userNoPassword);
  }


getUserById(id:string){
  const foundUser=users.find((user)=>user.id===id)
  if(!foundUser) return  `Usuario ${id} no encontrado`;
  const{ password, ...userNoPassword} = foundUser;
  return userNoPassword
}

addUser(newUser: any){
  users.push({...newUser, id: newUser.email})
return newUser.email;}

updateUser(id: string, userNewData: any){
  const foundUser=users.find((user)=>user.id===id) 
  if(!foundUser) return  `Usuario ${id} no encontrado`;
  const{ password, ...userNoPassword} = foundUser;
  Object.assign(foundUser, userNewData)
  return foundUser.id;
}
}