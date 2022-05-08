import { Component } from '@angular/core';
import { ArticulosService } from './articulos.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'consulta_mysql';
  articulos:any;
  
  art={
    codigo:0,
    descripcion:"",
    precio:0
  }

  constructor(private articulosService:ArticulosService){}

  ngOnInit() {
    this.recuperarTodos();
  }
  recuperarTodos() {
    this.articulosService.recuperarTodos().subscribe((result:any) => this.articulos = result);
  }

  hayRegistros() {
    return true;
  } 

  //alta(){
   // this.articulosService.alta(this.art)
   // .subscribe((result:any)=>this.articulos = result);
 // }

  alta() {
    this.articulosService.alta(this.art).subscribe((datos:any) => {
      if (datos['resultado']=='OK') {
        alert(datos['mensaje']);
        this.recuperarTodos();
      }
    });
  }


  baja(codigo:number){
    this.articulosService.baja(codigo)
    .subscribe((datos:any) => {
      if (datos['resultado']=='OK') {
        alert(datos['mensaje']);
        this.recuperarTodos();
      }
    });
    
  }



  seleccionar(codigo:number){
    this.articulosService.seleccionar(codigo)
    .subscribe((datos:any) => {
      this.art=datos[0];
      if (datos['resultado']=='OK') {
        alert(datos['mensaje']);
        this.recuperarTodos();
      }
    });
    
  }

    modificacion(){
      console.log("Ejemplo",this.art)
      this.articulosService.modificacion(this.art)
      .subscribe((datos:any)=>{
          if (datos['resultado']=='OK') {
            alert(datos['mensaje']);
            this.recuperarTodos();
          }
        });
    }

}
