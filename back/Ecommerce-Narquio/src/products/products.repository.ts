import { Injectable } from '@nestjs/common';


const products= [
  {
    "id": 1,
    "name": "Auriculares Bluetooth Pro",
    "description": "Auriculares inalámbricos con cancelación de ruido activa y 30hs de batería.",
    "price": 89.99,
    "stock": true,
    "imgUrl": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200"
  },
  {
    "id": 2,
    "name": "Teclado Mecánico RGB",
    "description": "Teclado mecánico compacto 75% con switches Cherry MX Red y retroiluminación RGB.",
    "price": 124.5,
    "stock": true,
    "imgUrl": "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=200"
  },
  {
    "id": 3,
    "name": "Monitor UltraWide 34\"",
    "description": "Monitor curvo 34 pulgadas, resolución 3440x1440, 144Hz, panel IPS.",
    "price": 549,
    "stock": false,
    "imgUrl": "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=200"
  },
  {
    "id": 4,
    "name": "Mouse Ergonómico Inalámbrico",
    "description": "Mouse vertical ergonómico con sensor óptico 4000 DPI y autonomía de 60 días.",
    "price": 45.99,
    "stock": true,
    "imgUrl": "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=200"
  },
  {
    "id": 5,
    "name": "Webcam Full HD 1080p",
    "description": "Cámara web con autofoco, micrófono integrado y campo visual de 90 grados.",
    "price": 67,
    "stock": true,
    "imgUrl": "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=200"
  },
  {
    "id": 6,
    "name": "Hub USB-C 7 en 1",
    "description": "Concentrador USB-C con HDMI 4K, 3x USB-A, SD, MicroSD y carga PD 100W.",
    "price": 38.75,
    "stock": true,
    "imgUrl": "https://images.unsplash.com/photo-1625948515291-69613efd103f?w=200"
  },
  {
    "id": 7,
    "name": "SSD Externo 1TB",
    "description": "Unidad de estado sólido portátil, velocidad de lectura 1050 MB/s, conector USB-C.",
    "price": 99.99,
    "stock": false,
    "imgUrl": "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=200"
  },
  {
    "id": 8,
    "name": "Soporte Laptop Aluminio",
    "description": "Soporte ajustable de aluminio para laptops de 11 a 17 pulgadas, plegable.",
    "price": 29.95,
    "stock": true,
    "imgUrl": "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=200"
  },
  {
    "id": 9,
    "name": "Lámpara LED Escritorio",
    "description": "Lámpara de escritorio con 10 niveles de brillo, temperatura de color ajustable y puerto USB.",
    "price": 34.5,
    "stock": true,
    "imgUrl": "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=200"
  },
  {
    "id": 10,
    "name": "Pad Mouse XL Gaming",
    "description": "Alfombrilla de escritorio extra grande 90x40cm, base antideslizante y superficie optimizada.",
    "price": 22,
    "stock": false,
    "imgUrl": "https://images.unsplash.com/photo-1563298723-dcfebaa392e3?w=200"
  }
]
export interface Products{
  id:number

name: string

description: string

price: number

stock: boolean

imgUrl: string
}

  @Injectable ()
  export class ProductsRepository {
private readonly products: Products[]= products;
getAllProducts(){
  return this.products

}
  }
